import { cities, routes, stops, buses } from '$lib/data/index.js';

/**
 * Urban Transit Query Services
 */

export function getCities() {
	return cities;
}

export function getCityById(id) {
	if (!id) return null;
	return (
		cities.find(
			(c) =>
				c.id === id ||
				c.wilayaId === id ||
				c.wilayaId === String(id).padStart(2, '0')
		) || null
	);
}

export function getDefaultCity() {
	return cities.find((c) => c.isDefault) || cities[0];
}

export function getUrbanRoutes(cityId = 'city-alger') {
	const city = getCityById(cityId);
	const targetId = city ? city.id : cityId;
	return routes.filter((r) => !cityId || r.cityId === targetId);
}

export function getUrbanRouteById(id) {
	if (!id) return null;
	return routes.find((r) => r.id === id) || null;
}

export function getStopById(id) {
	if (!id) return null;
	return stops.find((s) => s.id === id) || null;
}

export function getRouteStops(routeId) {
	const route = getUrbanRouteById(routeId);
	if (!route || !Array.isArray(route.stopIds)) return [];
	return route.stopIds.map((stopId) => getStopById(stopId)).filter(Boolean);
}

export function getRouteBuses(routeId) {
	if (!routeId) return [];
	return buses.filter((b) => b.routeId === routeId);
}

export function getAllStops(cityId = 'city-alger') {
	const city = getCityById(cityId);
	const targetId = city ? city.id : cityId;
	return stops.filter((s) => !cityId || s.cityId === targetId);
}

export function getBusById(id) {
	if (!id) return null;
	return buses.find((b) => b.id === id) || null;
}

export function getAllBuses() {
	return buses;
}

/**
 * Returns all buses active in a given city (by route assignment)
 */
export function getCityBuses(cityId = 'city-alger') {
	const cityRoutes = getUrbanRoutes(cityId);
	const cityRouteIds = new Set(cityRoutes.map((r) => r.id));
	return buses.filter((b) => b.routeId && cityRouteIds.has(b.routeId));
}

/**
 * Returns all routes that serve a specific stop
 */
export function getRoutesByStopId(stopId) {
	if (!stopId) return [];
	return routes.filter((r) => Array.isArray(r.stopIds) && r.stopIds.includes(stopId));
}

/**
 * Returns a GeoJSON Feature representing the route path
 */
export function getRouteGeoJSON(routeId) {
	const route = getUrbanRouteById(routeId);
	if (!route || !route.geometry) return null;

	return {
		type: 'Feature',
		properties: {
			id: route.id,
			code: route.code,
			name: route.name,
			nameArabic: route.nameArabic,
			color: route.color
		},
		geometry: route.geometry
	};
}
