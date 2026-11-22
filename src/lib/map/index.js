/**
 * SUTRAF Map Layer
 * 
 * MapLibre GL JS configuration, tile providers, and GeoJSON generators:
 * - Basemap tile endpoint config
 * - GeoJSON LineStrings for urban routes
 * - GeoJSON Point features for stops & stations
 * - Vehicle animation & marker coordinates
 * 
 * Realized in Phase 4.
 */

export const DEFAULT_MAP_CONFIG = {
	center: [3.0588, 36.7538], // Alger / Algiers [lng, lat]
	zoom: 12.5,
	attribution: '© OpenStreetMap contributors'
};
