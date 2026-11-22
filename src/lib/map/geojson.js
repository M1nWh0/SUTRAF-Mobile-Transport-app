/**
 * SUTRAF GeoJSON Utilities
 * Converts domain entities into MapLibre-compatible GeoJSON FeatureCollections
 */

/**
 * Converts urban routes into a GeoJSON FeatureCollection of LineStrings
 */
export function routesToGeoJSON(routes = []) {
	return {
		type: 'FeatureCollection',
		features: routes
			.filter((route) => route && route.geometry && Array.isArray(route.geometry.coordinates))
			.map((route) => ({
				type: 'Feature',
				id: route.id,
				properties: {
					id: route.id,
					code: route.code,
					name: route.name,
					nameArabic: route.nameArabic,
					color: route.color || '#059669',
					type: route.type || 'bus',
					frequencyMinutes: route.frequencyMinutes || 10,
					stopCount: Array.isArray(route.stopIds) ? route.stopIds.length : 0,
					companyId: route.companyId
				},
				geometry: route.geometry
			}))
	};
}

/**
 * Converts urban stops into a GeoJSON FeatureCollection of Points
 */
export function stopsToGeoJSON(stops = []) {
	return {
		type: 'FeatureCollection',
		features: stops
			.filter((stop) => stop && Array.isArray(stop.coordinates) && stop.coordinates.length === 2)
			.map((stop) => ({
				type: 'Feature',
				id: stop.id,
				properties: {
					id: stop.id,
					name: stop.name,
					nameArabic: stop.nameArabic,
					type: stop.type || 'stop', // 'station' | 'stop'
					hasShelter: Boolean(stop.hasShelter),
					routeCount: Array.isArray(stop.routeIds) ? stop.routeIds.length : 0,
					routeIds: stop.routeIds || []
				},
				geometry: {
					type: 'Point',
					coordinates: stop.coordinates
				}
			}))
	};
}

/**
 * Converts fleet buses into a GeoJSON FeatureCollection of Points (static positions for Phase 4)
 */
export function busesToGeoJSON(buses = []) {
	return {
		type: 'FeatureCollection',
		features: buses
			.filter((bus) => bus && Array.isArray(bus.currentPosition) && bus.currentPosition.length === 2)
			.map((bus) => ({
				type: 'Feature',
				id: bus.id,
				properties: {
					id: bus.id,
					label: bus.label,
					model: bus.model,
					capacity: bus.capacity,
					status: bus.status,
					routeId: bus.routeId,
					companyId: bus.companyId,
					driverId: bus.driverId
				},
				geometry: {
					type: 'Point',
					coordinates: bus.currentPosition
				}
			}))
	};
}

/**
 * Computes bounding box [[minLng, minLat], [maxLng, maxLat]] for a coordinate array
 */
export function calculateCoordinatesBounds(coordinates = []) {
	if (!coordinates || coordinates.length === 0) return null;

	let minLng = Infinity;
	let minLat = Infinity;
	let maxLng = -Infinity;
	let maxLat = -Infinity;

	for (const coord of coordinates) {
		if (Array.isArray(coord) && coord.length >= 2) {
			const [lng, lat] = coord;
			if (lng < minLng) minLng = lng;
			if (lat < minLat) minLat = lat;
			if (lng > maxLng) maxLng = lng;
			if (lat > maxLat) maxLat = lat;
		}
	}

	if (minLng === Infinity || minLat === Infinity) return null;

	return [
		[minLng, minLat],
		[maxLng, maxLat]
	];
}
