import { cities, routes, stops, buses } from '$lib/data/index.js';

/**
 * Urban Transit Query Services
 */

export function getCities() {
	return cities;
}

export function getCityById(id) {
	if (!id) return null;
	return cities.find((c) => c.id === id) || null;
}

export function getDefaultCity() {
	return cities.find((c) => c.isDefault) || cities[0];
}

export function getUrbanRoutes(cityId = 'city-alger') {
	return routes.filter((r) => !cityId || r.cityId === cityId);
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
	return stops.filter((s) => !cityId || s.cityId === cityId);
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
