import { cities } from '$lib/data/cities.js';

/**
 * SUTRAF Map Configuration & Basemap Provider Settings
 * 
 * OpenStreetMap-derived raster basemap configuration for MapLibre GL JS.
 * Supports all 58 Wilayas of Algeria.
 */

export const TILE_PROVIDERS = {
	cartoLight: {
		id: 'carto-light',
		name: 'CARTO Voyager (Light)',
		tiles: [
			'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
			'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
			'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
		],
		attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
		maxZoom: 19
	},
	cartoDark: {
		id: 'carto-dark',
		name: 'CARTO Dark Matter (Dark)',
		tiles: [
			'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
			'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
			'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
		],
		attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
		maxZoom: 19
	},
	osmStandard: {
		id: 'osm-standard',
		name: 'OpenStreetMap Standard',
		tiles: [
			'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
		],
		attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
		maxZoom: 19
	}
};

/**
 * City map presets dynamically generated for all 58 Algerian Wilayas
 */
export const CITY_MAP_PRESETS = Object.fromEntries(
	cities.map((city) => [
		city.id,
		{
			id: city.id,
			wilayaId: city.wilayaId,
			name: city.name,
			nameArabic: city.nameArabic,
			center: city.centreCoordinates,
			zoom: city.defaultZoom || 13,
			minZoom: 8,
			maxZoom: 18,
			bounds: [
				[city.centreCoordinates[0] - 0.12, city.centreCoordinates[1] - 0.08],
				[city.centreCoordinates[0] + 0.12, city.centreCoordinates[1] + 0.08]
			]
		}
	])
);

// Fallback default
export const DEFAULT_CITY_PRESET = CITY_MAP_PRESETS['city-alger'];

/**
 * Builds a MapLibre Style Specification JSON
 * Uses a background layer first so vector transit lines are visible even during tile loading.
 */
export function createMapLibreStyle({ isDark = false, customTileUrl = null } = {}) {
	const customUrl = customTileUrl || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_MAP_TILE_URL);

	let tiles;
	let attribution;

	if (customUrl) {
		tiles = [customUrl];
		attribution = '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';
	} else if (isDark) {
		tiles = TILE_PROVIDERS.cartoDark.tiles;
		attribution = TILE_PROVIDERS.cartoDark.attribution;
	} else {
		tiles = TILE_PROVIDERS.cartoLight.tiles;
		attribution = TILE_PROVIDERS.cartoLight.attribution;
	}

	return {
		version: 8,
		name: 'SUTRAF Transit Basemap',
		sources: {
			'sutraf-basemap-tiles': {
				type: 'raster',
				tiles: tiles,
				tileSize: 256,
				attribution: attribution
			}
		},
		layers: [
			{
				id: 'sutraf-background',
				type: 'background',
				paint: {
					'background-color': isDark ? '#0f172a' : '#f8fafc'
				}
			},
			{
				id: 'sutraf-basemap-layer',
				type: 'raster',
				source: 'sutraf-basemap-tiles',
				minzoom: 0,
				maxzoom: 19
			}
		]
	};
}
