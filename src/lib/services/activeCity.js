import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { cities } from '$lib/data/cities.js';

const STORAGE_KEY = 'sutraf_active_city_id';
const DEFAULT_CITY_ID = 'city-alger';

function getInitialCityId() {
	if (browser) {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved && cities.some((c) => c.id === saved)) {
				return saved;
			}
		} catch (e) {
			// localStorage error / disabled
		}
	}
	return DEFAULT_CITY_ID;
}

export const activeCityId = writable(getInitialCityId());

export const activeCity = derived(activeCityId, ($id) => {
	return cities.find((c) => c.id === $id) || cities[0];
});

export function setActiveCity(cityIdOrWilaya) {
	const found = cities.find(
		(c) =>
			c.id === cityIdOrWilaya ||
			c.wilayaId === cityIdOrWilaya ||
			c.wilayaId === String(cityIdOrWilaya).padStart(2, '0')
	);
	if (found) {
		activeCityId.set(found.id);
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, found.id);
			} catch (e) {}
		}
	}
}

/**
 * Finds the nearest supported Algerian transit city from coordinates
 * Uses Haversine distance
 */
export function findNearestSupportedCity(latitude, longitude) {
	if (typeof latitude !== 'number' || typeof longitude !== 'number') return null;

	const toRad = (deg) => (deg * Math.PI) / 180;
	let nearestCity = null;
	let shortestDistance = Infinity;

	for (const city of cities) {
		const [cityLng, cityLat] = city.centreCoordinates;
		const dLat = toRad(cityLat - latitude);
		const dLon = toRad(cityLng - longitude);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(latitude)) * Math.cos(toRad(cityLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distanceKm = 6371 * c;

		if (distanceKm < shortestDistance) {
			shortestDistance = distanceKm;
			nearestCity = { city, distanceKm: Math.round(distanceKm) };
		}
	}

	return nearestCity;
}
