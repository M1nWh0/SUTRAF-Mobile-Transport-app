<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { mode } from 'mode-watcher';
	import {
		Loader2,
		AlertTriangle,
		RotateCcw,
		Maximize2,
		Layers,
		Check,
		BusFront
	} from '@lucide/svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { t, locale } from '$lib/i18n/index.js';
	import {
		createMapLibreStyle,
		CITY_MAP_PRESETS,
		DEFAULT_CITY_PRESET,
		routesToGeoJSON,
		stopsToGeoJSON,
		calculateCoordinatesBounds
	} from '$lib/map/index.js';
	import {
		getUrbanRoutes,
		getAllStops,
		getCityBuses,
		getUrbanRouteById,
		getStopById,
		getBusById
	} from '$lib/services/index.js';

	let {
		cityId = 'city-alger',
		selectedRouteId = null,
		selectedStopId = null,
		selectedBusId = null,
		onSelectRoute = () => {},
		onSelectStop = () => {},
		onSelectBus = () => {},
		onDeselect = () => {}
	} = $props();

	let mapContainer = $state(null);
	let mapInstance = $state(null);
	let maplibregl = $state(null);
	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	// Active bus markers array
	let busMarkers = [];

	let cityPreset = $derived(CITY_MAP_PRESETS[cityId] || DEFAULT_CITY_PRESET);

	// Load & initialize MapLibre GL JS
	onMount(async () => {
		if (!browser || !mapContainer) return;

		try {
			const maplibreModule = await import('maplibre-gl');
			maplibregl = maplibreModule.default || maplibreModule;

			if (!maplibregl.supported()) {
				hasError = true;
				errorMessage = 'WebGL is not supported or disabled in your browser.';
				isLoading = false;
				return;
			}

			initializeMap();
		} catch (err) {
			console.error('Failed to load MapLibre GL JS:', err);
			hasError = true;
			errorMessage = err.message || 'Error loading mapping engine.';
			isLoading = false;
		}
	});

	onDestroy(() => {
		cleanupMarkers();
		if (mapInstance) {
			mapInstance.remove();
			mapInstance = null;
		}
	});

	function cleanupMarkers() {
		for (const marker of busMarkers) {
			try {
				marker.remove();
			} catch (e) {}
		}
		busMarkers = [];
	}

	function initializeMap() {
		if (!mapContainer || !maplibregl) return;

		// Clean up existing instance if any
		cleanupMarkers();
		if (mapInstance) {
			mapInstance.remove();
			mapInstance = null;
		}

		isLoading = true;
		hasError = false;
		errorMessage = '';

		const isDarkMode = mode.current === 'dark';
		const style = createMapLibreStyle({ isDark: isDarkMode });

		try {
			const map = new maplibregl.Map({
				container: mapContainer,
				style: style,
				center: cityPreset.center,
				zoom: cityPreset.zoom,
				minZoom: cityPreset.minZoom || 9,
				maxZoom: cityPreset.maxZoom || 18,
				attributionControl: false
			});

			// Standard MapLibre Attribution control
			map.addControl(
				new maplibregl.AttributionControl({
					compact: true,
					customAttribution: 'SUTRAF Transit Network'
				}),
				'bottom-right'
			);

			// Standard Navigation Controls (Zoom in/out, Compass reset)
			map.addControl(
				new maplibregl.NavigationControl({
					showCompass: true,
					showZoom: true,
					visualizePitch: true
				}),
				'top-right'
			);

			map.on('load', () => {
				isLoading = false;
				hasError = false;
				setupTransitLayers(map);
				updateBusMarkers(map);
			});

			map.on('error', (e) => {
				// Non-fatal tile loading warning vs fatal error
				if (e && e.error && e.error.message && !map.isStyleLoaded()) {
					console.warn('MapLibre tile load warning:', e);
					hasError = true;
					errorMessage = $t('urbanPage.mapErrorDesc');
					isLoading = false;
				}
			});

			// Background click clears selection
			map.on('click', (e) => {
				const features = map.queryRenderedFeatures(e.point, {
					layers: ['routes-line', 'stops-halo']
				});
				if (!features || features.length === 0) {
					onDeselect();
				}
			});

			mapInstance = map;
		} catch (err) {
			console.error('Map initialization exception:', err);
			hasError = true;
			errorMessage = err.message || 'Map initialization failed.';
			isLoading = false;
		}
	}

	function setupTransitLayers(map) {
		if (!map || !map.isStyleLoaded()) return;

		const routesData = routesToGeoJSON(getUrbanRoutes(cityId));
		const stopsData = stopsToGeoJSON(getAllStops(cityId));

		// 1. Add GeoJSON Sources
		if (!map.getSource('sutraf-routes')) {
			map.addSource('sutraf-routes', {
				type: 'geojson',
				data: routesData
			});
		} else {
			map.getSource('sutraf-routes').setData(routesData);
		}

		if (!map.getSource('sutraf-stops')) {
			map.addSource('sutraf-stops', {
				type: 'geojson',
				data: stopsData
			});
		} else {
			map.getSource('sutraf-stops').setData(stopsData);
		}

		// 2. Route Casing Layer (for highlight & contrast)
		if (!map.getLayer('routes-casing')) {
			map.addLayer({
				id: 'routes-casing',
				type: 'line',
				source: 'sutraf-routes',
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					'line-color': '#ffffff',
					'line-width': [
						'case',
						['==', ['get', 'id'], selectedRouteId || ''],
						9,
						0
					],
					'line-opacity': [
						'case',
						['==', ['get', 'id'], selectedRouteId || ''],
						0.9,
						0
					]
				}
			});
		}

		// 3. Route Main Line Layer
		if (!map.getLayer('routes-line')) {
			map.addLayer({
				id: 'routes-line',
				type: 'line',
				source: 'sutraf-routes',
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					'line-color': ['get', 'color'],
					'line-width': [
						'case',
						['==', ['get', 'id'], selectedRouteId || ''],
						6,
						4
					],
					'line-opacity': [
						'case',
						['==', selectedRouteId || '', ''],
						0.9,
						['==', ['get', 'id'], selectedRouteId || ''],
						1.0,
						0.3
					]
				}
			});
		}

		// 4. Stops Halo (Outer ring)
		if (!map.getLayer('stops-halo')) {
			map.addLayer({
				id: 'stops-halo',
				type: 'circle',
				source: 'sutraf-stops',
				paint: {
					'circle-radius': [
						'case',
						['==', ['get', 'id'], selectedStopId || ''],
						10,
						['==', ['get', 'type'], 'station'],
						7,
						5
					],
					'circle-color': [
						'case',
						['==', ['get', 'id'], selectedStopId || ''],
						'#10b981',
						'#ffffff'
					],
					'circle-stroke-width': 2,
					'circle-stroke-color': '#0f172a'
				}
			});
		}

		// 5. Stops Inner Dot
		if (!map.getLayer('stops-inner')) {
			map.addLayer({
				id: 'stops-inner',
				type: 'circle',
				source: 'sutraf-stops',
				paint: {
					'circle-radius': [
						'case',
						['==', ['get', 'id'], selectedStopId || ''],
						6,
						['==', ['get', 'type'], 'station'],
						4,
						3
					],
					'circle-color': [
						'case',
						['==', ['get', 'id'], selectedStopId || ''],
						'#ffffff',
						['==', ['get', 'type'], 'station'],
						'#059669',
						'#0284c7'
					]
				}
			});
		}

		// 6. Interactive Events on Routes & Stops
		map.on('click', 'routes-line', (e) => {
			if (e.features && e.features[0]) {
				const feat = e.features[0];
				onSelectRoute(feat.properties.id);
			}
		});

		map.on('click', 'stops-halo', (e) => {
			if (e.features && e.features[0]) {
				const feat = e.features[0];
				onSelectStop(feat.properties.id);
			}
		});

		// Cursor hover styling
		map.on('mouseenter', 'routes-line', () => {
			map.getCanvas().style.cursor = 'pointer';
		});
		map.on('mouseleave', 'routes-line', () => {
			map.getCanvas().style.cursor = '';
		});
		map.on('mouseenter', 'stops-halo', () => {
			map.getCanvas().style.cursor = 'pointer';
		});
		map.on('mouseleave', 'stops-halo', () => {
			map.getCanvas().style.cursor = '';
		});
	}

	function updateBusMarkers(map) {
		if (!map || !maplibregl) return;
		cleanupMarkers();

		const cityBuses = getCityBuses(cityId);

		for (const bus of cityBuses) {
			if (!bus.currentPosition || bus.currentPosition.length !== 2) continue;

			const route = bus.routeId ? getUrbanRouteById(bus.routeId) : null;
			const isDelayed = bus.status === 'delayed';
			const isEnRoute = bus.status === 'en_route';
			const isSelected = bus.id === selectedBusId;
			const routeColor = route?.color || '#059669';

			const el = document.createElement('div');
			el.className = 'sutraf-bus-marker cursor-pointer transition-transform';
			el.style.transform = isSelected ? 'scale(1.15)' : 'scale(1)';
			el.setAttribute('role', 'button');
			el.setAttribute('tabindex', '0');
			el.setAttribute('title', `${bus.label} (${route?.code || 'Bus'})`);

			el.innerHTML = `
				<div style="
					display: flex;
					align-items: center;
					gap: 4px;
					padding: 3px 6px;
					border-radius: 9999px;
					background: ${isSelected ? '#0f172a' : '#ffffff'};
					color: ${isSelected ? '#ffffff' : '#0f172a'};
					border: 2px solid ${routeColor};
					box-shadow: 0 4px 8px rgba(0,0,0,0.25);
					font-size: 11px;
					font-weight: 700;
					user-select: none;
					white-space: nowrap;
				">
					<span style="
						display: inline-block;
						width: 7px;
						height: 7px;
						border-radius: 9999px;
						background-color: ${isDelayed ? '#f59e0b' : isEnRoute ? '#10b981' : '#94a3b8'};
					"></span>
					<span>${route ? route.code : 'BUS'}</span>
				</div>
			`;

			el.addEventListener('click', (e) => {
				e.stopPropagation();
				onSelectBus(bus.id);
			});

			const marker = new maplibregl.Marker({
				element: el,
				anchor: 'center'
			})
				.setLngLat(bus.currentPosition)
				.addTo(map);

			busMarkers.push(marker);
		}
	}

	// Reactive updates when selectedRouteId or selectedStopId changes
	$effect(() => {
		const rId = selectedRouteId;
		const sId = selectedStopId;
		const bId = selectedBusId;

		if (!mapInstance || !mapInstance.isStyleLoaded()) return;

		// 1. Update layers styling
		if (mapInstance.getLayer('routes-casing')) {
			mapInstance.setPaintProperty('routes-casing', 'line-width', [
				'case',
				['==', ['get', 'id'], rId || ''],
				9,
				0
			]);
			mapInstance.setPaintProperty('routes-casing', 'line-opacity', [
				'case',
				['==', ['get', 'id'], rId || ''],
				0.9,
				0
			]);
		}

		if (mapInstance.getLayer('routes-line')) {
			mapInstance.setPaintProperty('routes-line', 'line-width', [
				'case',
				['==', ['get', 'id'], rId || ''],
				6,
				4
			]);
			mapInstance.setPaintProperty('routes-line', 'line-opacity', [
				'case',
				['==', rId || '', ''],
				0.9,
				['==', ['get', 'id'], rId || ''],
				1.0,
				0.3
			]);
		}

		if (mapInstance.getLayer('stops-halo')) {
			mapInstance.setPaintProperty('stops-halo', 'circle-radius', [
				'case',
				['==', ['get', 'id'], sId || ''],
				10,
				['==', ['get', 'type'], 'station'],
				7,
				5
			]);
			mapInstance.setPaintProperty('stops-halo', 'circle-color', [
				'case',
				['==', ['get', 'id'], sId || ''],
				'#10b981',
				'#ffffff'
			]);
		}

		// 2. Camera focus
		if (rId) {
			const route = getUrbanRouteById(rId);
			if (route && route.geometry && Array.isArray(route.geometry.coordinates)) {
				const bounds = calculateCoordinatesBounds(route.geometry.coordinates);
				if (bounds) {
					mapInstance.fitBounds(bounds, {
						padding: { top: 40, bottom: 40, left: 40, right: 40 },
						maxZoom: 15,
						duration: 600
					});
				}
			}
		} else if (sId) {
			const stop = getStopById(sId);
			if (stop && stop.coordinates) {
				mapInstance.flyTo({
					center: stop.coordinates,
					zoom: 15.2,
					duration: 600
				});
			}
		} else if (bId) {
			const bus = getBusById(bId);
			if (bus && bus.currentPosition) {
				mapInstance.flyTo({
					center: bus.currentPosition,
					zoom: 15.5,
					duration: 600
				});
			}
		}

		// Update markers highlight
		updateBusMarkers(mapInstance);
	});

	// Reactive update when active city changes
	$effect(() => {
		const currentCity = cityId;
		if (!mapInstance || !mapInstance.isStyleLoaded()) return;

		const preset = CITY_MAP_PRESETS[currentCity] || DEFAULT_CITY_PRESET;

		mapInstance.flyTo({
			center: preset.center,
			zoom: preset.zoom,
			duration: 800
		});

		setupTransitLayers(mapInstance);
		updateBusMarkers(mapInstance);
	});

	// Reset camera to default city bounds
	export function resetView() {
		if (!mapInstance) return;
		onDeselect();
		mapInstance.flyTo({
			center: cityPreset.center,
			zoom: cityPreset.zoom,
			duration: 600
		});
	}

	// Retry map initialization
	function handleRetry() {
		initializeMap();
	}
</script>

<div class="relative w-full h-80 sm:h-96 md:h-[460px] rounded-2xl border border-border bg-slate-100 dark:bg-slate-900 overflow-hidden shadow-inner flex flex-col">
	<!-- Map Container for MapLibre Canvas -->
	<div bind:this={mapContainer} class="w-full h-full flex-1"></div>

	<!-- Loading Overlay -->
	{#if isLoading && !hasError}
		<div class="absolute inset-0 bg-background/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2.5 z-20 transition-opacity">
			<Loader2 class="h-7 w-7 text-emerald-600 animate-spin" />
			<div class="text-xs font-semibold text-foreground">
				{$t('urbanPage.mapLoading')}
			</div>
		</div>
	{/if}

	<!-- Error / Fallback State -->
	{#if hasError}
		<div class="absolute inset-0 bg-background/95 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center space-y-3 z-30 animate-in fade-in">
			<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
				<AlertTriangle class="h-6 w-6" />
			</div>
			<div class="max-w-xs space-y-1">
				<h3 class="text-sm font-bold text-foreground">{$t('urbanPage.mapErrorTitle')}</h3>
				<p class="text-xs text-muted-foreground leading-relaxed">
					{errorMessage || $t('urbanPage.mapErrorDesc')}
				</p>
			</div>
			<button
				type="button"
				class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer shadow-xs transition-colors"
				onclick={handleRetry}
			>
				<RotateCcw class="h-3.5 w-3.5" />
				<span>{$t('urbanPage.retryMap')}</span>
			</button>
		</div>
	{/if}

	<!-- Floating Reset View Button (Top-start corner) -->
	{#if !isLoading && !hasError}
		<div class="absolute top-2.5 start-2.5 z-10 flex items-center gap-1.5">
			<button
				type="button"
				class="flex h-8 items-center gap-1.5 px-2.5 rounded-lg bg-background/90 hover:bg-background text-foreground text-xs font-medium border border-border shadow-xs backdrop-blur cursor-pointer transition-colors"
				onclick={resetView}
				title={$t('urbanPage.resetView')}
				aria-label={$t('urbanPage.resetView')}
			>
				<RotateCcw class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
				<span class="text-[11px]">{$t('urbanPage.resetView')}</span>
			</button>
		</div>
	{/if}
</div>
