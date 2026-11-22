<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		Map,
		Layers,
		Navigation,
		Info,
		Clock,
		AlertCircle,
		Route,
		MapPin,
		BusFront,
		ChevronRight
	} from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t, locale } from '$lib/i18n/index.js';
	import {
		activeCity,
		activeCityId,
		setActiveCity,
		getUrbanRoutes,
		getAllStops,
		getCityBuses,
		getUrbanRouteById,
		getStopById,
		getBusById,
		getRouteOperationalStatus,
		calculateTotalRouteDuration
	} from '$lib/services/index.js';
	import TransitMap from '$lib/components/map/TransitMap.svelte';
	import CitySelector from '$lib/components/map/CitySelector.svelte';
	import RouteDetailCard from '$lib/components/map/RouteDetailCard.svelte';
	import StopDetailCard from '$lib/components/map/StopDetailCard.svelte';
	import BusDetailCard from '$lib/components/map/BusDetailCard.svelte';
	import MapLegend from '$lib/components/map/MapLegend.svelte';

	// Interactive selection state
	let selectedRouteId = $state(null);
	let selectedStopId = $state(null);
	let selectedBusId = $state(null);

	// Reactive domain queries based on active city
	let currentRoutes = $derived(getUrbanRoutes($activeCityId));
	let currentStops = $derived(getAllStops($activeCityId));
	let currentBuses = $derived(getCityBuses($activeCityId));

	// Selected entity objects
	let selectedRoute = $derived(selectedRouteId ? getUrbanRouteById(selectedRouteId) : null);
	let selectedStop = $derived(selectedStopId ? getStopById(selectedStopId) : null);
	let selectedBus = $derived(selectedBusId ? getBusById(selectedBusId) : null);

	onMount(() => {
		const param = $page.url.searchParams.get('route');
		if (param && getUrbanRouteById(param)) {
			handleSelectRoute(param);
		}
	});

	function handleSelectRoute(routeId) {
		selectedRouteId = routeId;
		selectedStopId = null;
		selectedBusId = null;
	}

	function handleSelectStop(stopId) {
		selectedStopId = stopId;
		selectedRouteId = null;
		selectedBusId = null;
	}

	function handleSelectBus(busId) {
		selectedBusId = busId;
		selectedRouteId = null;
		selectedStopId = null;
	}

	function handleDeselect() {
		selectedRouteId = null;
		selectedStopId = null;
		selectedBusId = null;
	}

	function handleCitySelect(newCityId) {
		handleDeselect();
		setActiveCity(newCityId);
	}
</script>

<div class="flex-1 flex flex-col p-3 sm:p-4 space-y-3.5 max-w-4xl mx-auto w-full">
	<!-- Page Header -->
	<div class="flex items-start justify-between gap-2">
		<div>
			<h1 class="text-lg sm:text-xl font-bold tracking-tight text-foreground">
				{$t('urbanPage.title')}
			</h1>
			<p class="text-xs text-muted-foreground">
				{$locale === 'ar' ? $activeCity?.nameArabic : $activeCity?.name} • {$t('urbanPage.subtitle')}
			</p>
		</div>
		<Badge variant="simulation" class="shrink-0 text-[10px]">
			{$t('urbanPage.phaseBadge')}
		</Badge>
	</div>

	<!-- City Selector & Manual Location Controls -->
	<CitySelector
		selectedCityId={$activeCityId}
		onSelectCity={handleCitySelect}
	/>

	<!-- Map Status Bar & Legend Pill -->
	<div class="flex items-center justify-between text-xs px-1">
		<div class="flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap">
			<span class="inline-flex items-center gap-1 font-semibold text-foreground">
				<Route class="h-3 w-3 text-emerald-600" />
				<span>{currentRoutes.length}</span>
				<span class="font-normal text-muted-foreground">{$t('urbanPage.activeLinesCount')}</span>
			</span>
			<span>•</span>
			<span class="inline-flex items-center gap-1">
				<MapPin class="h-3 w-3 text-sky-600" />
				<span>{currentStops.length}</span>
				<span>{$t('urbanPage.activeStops')}</span>
			</span>
			<span>•</span>
			<span class="inline-flex items-center gap-1">
				<BusFront class="h-3 w-3 text-amber-600" />
				<span>{currentBuses.length}</span>
				<span>{$t('urbanPage.activeBuses')}</span>
			</span>
		</div>

		<!-- Map Legend Dropdown -->
		<MapLegend />
	</div>

	<!-- Interactive MapLibre GL JS Map -->
	<TransitMap
		cityId={$activeCityId}
		{selectedRouteId}
		{selectedStopId}
		{selectedBusId}
		onSelectRoute={handleSelectRoute}
		onSelectStop={handleSelectStop}
		onSelectBus={handleSelectBus}
		onDeselect={handleDeselect}
	/>

	<!-- Interactive Entity Detail Panels -->
	{#if selectedRoute}
		<RouteDetailCard
			route={selectedRoute}
			onClose={handleDeselect}
			onSelectStop={handleSelectStop}
			onSelectBus={handleSelectBus}
		/>
	{:else if selectedStop}
		<StopDetailCard
			stop={selectedStop}
			onClose={handleDeselect}
			onSelectRoute={handleSelectRoute}
		/>
	{:else if selectedBus}
		<BusDetailCard
			bus={selectedBus}
			onClose={handleDeselect}
			onSelectRoute={handleSelectRoute}
		/>
	{/if}

	<!-- Available Transit Lines Drawer / List (when nothing is selected or for quick route browsing) -->
	{#if !selectedRoute && !selectedStop && !selectedBus}
		<Card class="p-3.5 space-y-2.5">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Route class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
					<h3 class="text-xs font-semibold text-foreground">
						{$t('urbanPage.availableLines')}
					</h3>
				</div>
				<span class="text-[11px] text-muted-foreground">
					{currentRoutes.length} {$t('home.activeLines')}
				</span>
			</div>

			{#if currentRoutes.length === 0}
				<!-- Empty state for cities without routes yet -->
				<div class="p-4 rounded-xl bg-secondary/30 border border-dashed border-border/70 text-center space-y-2">
					<p class="text-xs text-muted-foreground">
						{$t('urbanPage.noRoutesCity')}
					</p>
					<Button
						variant="outline"
						size="sm"
						class="text-xs gap-1.5"
						onclick={() => handleCitySelect('city-alger')}
					>
						<MapPin class="h-3.5 w-3.5 text-emerald-600" />
						<span>{$t('profilePage.algiersCity')}</span>
					</Button>
				</div>
			{:else}
				<div class="space-y-2">
					{#each currentRoutes as route}
						{@const opStatus = getRouteOperationalStatus(route.id)}
						{@const totalDuration = calculateTotalRouteDuration(route.id)}
						<button
							type="button"
							class="w-full p-2.5 rounded-xl bg-secondary/40 hover:bg-secondary border border-border/50 flex items-center justify-between text-xs transition-colors cursor-pointer text-start group"
							onclick={() => handleSelectRoute(route.id)}
						>
							<div class="flex items-center gap-2.5 min-w-0 pr-2">
								<span
									class="px-2 py-1 rounded-lg font-bold text-white text-[11px] shadow-2xs shrink-0"
									style="background-color: {route.color || '#059669'}"
								>
									{route.code}
								</span>
								<div class="min-w-0">
									<span class="font-medium text-foreground block truncate group-hover:text-emerald-600 transition-colors">
										{$locale === 'ar' ? route.nameArabic : route.name}
									</span>
									<span class="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
										<span>{route.stopIds?.length || 0} stops</span>
										<span>•</span>
										<span class="flex items-center gap-0.5">
											<Clock class="h-2.5 w-2.5" />
											~{totalDuration} {$t('urbanPage.min')}
										</span>
									</span>
								</div>
							</div>
							<div class="flex items-center gap-1.5 shrink-0">
								<Badge variant={opStatus.statusKey === 'smooth' ? 'success' : 'warning'} class="text-[10px] px-1.5 py-0">
									{$t(`home.${opStatus.statusKey}`)}
								</Badge>
								<ChevronRight class="h-4 w-4 text-muted-foreground rtl:rotate-180 group-hover:text-foreground transition-transform" />
							</div>
						</button>
					{/each}
				</div>
			{/if}
		</Card>
	{/if}

	<!-- Simulation Notice Banner -->
	<div class="p-3 rounded-xl bg-secondary/30 border border-border/60 text-[11px] text-muted-foreground flex items-start gap-2">
		<Info class="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
		<p class="leading-relaxed">
			{$t('urbanPage.simulatedNotice')}
		</p>
	</div>
</div>
