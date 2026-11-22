import { wilayas, trips, companies } from '$lib/data/index.js';

/**
 * Intercity Coach & Trip Services
 */

export function getWilayas() {
	return wilayas;
}

export function getWilayaById(id) {
	if (!id) return null;
	// Support lookup by string ID ('16') or numeric code (16)
	const cleanId = String(id).padStart(2, '0');
	return wilayas.find((w) => w.id === cleanId || w.id === id) || null;
}

export function getTripById(id) {
	if (!id) return null;
	return trips.find((t) => t.id === id) || null;
}

export function getAllIntercityTrips() {
	return trips;
}

/**
 * Search intercity trips with intermediate stops awareness
 * Returns trips where origin is visited before destination.
 */
export function searchIntercityTrips({ originWilayaId, destinationWilayaId, date } = {}) {
	const cleanOrigin = originWilayaId ? String(originWilayaId).padStart(2, '0') : null;
	const cleanDest = destinationWilayaId ? String(destinationWilayaId).padStart(2, '0') : null;

	return trips.filter((trip) => {
		// Date filtering if provided
		if (date && trip.date !== date) {
			return false;
		}

		if (!cleanOrigin && !cleanDest) {
			return true;
		}

		const stops = trip.stops || [];

		// Find index of origin in stop sequence
		let originIndex = -1;
		if (cleanOrigin) {
			originIndex = stops.findIndex(
				(s) => s.wilayaId === cleanOrigin || (s.isDeparture && trip.originWilayaId === cleanOrigin)
			);
			if (originIndex === -1 && trip.originWilayaId === cleanOrigin) {
				originIndex = 0;
			}
			if (originIndex === -1) return false;
		}

		// Find index of destination in stop sequence
		let destIndex = -1;
		if (cleanDest) {
			destIndex = stops.findIndex(
				(s) => s.wilayaId === cleanDest || (s.isArrival && trip.destinationWilayaId === cleanDest)
			);
			if (destIndex === -1 && trip.destinationWilayaId === cleanDest) {
				destIndex = stops.length - 1;
			}
			if (destIndex === -1) return false;
		}

		// When both endpoints provided: origin must be before destination
		if (originIndex !== -1 && destIndex !== -1) {
			return originIndex < destIndex;
		}

		return true;
	});
}
