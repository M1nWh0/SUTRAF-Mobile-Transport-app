import { incidents, routes, buses } from '$lib/data/index.js';

/**
 * Deterministic Simulation & ETA Calculation Services
 * Calculates ETAs from fixed segment durations and active incident delays.
 */

export function getActiveIncidents() {
	return incidents.filter((inc) => inc.status === 'active');
}

export function getIncidentsByRoute(routeId) {
	if (!routeId) return [];
	return incidents.filter((inc) => inc.routeId === routeId && inc.status === 'active');
}

/**
 * Calculates delay for a specific segment based on active incidents
 */
export function getSegmentDelayMinutes(routeId, fromStopId, toStopId) {
	const activeIncidents = getIncidentsByRoute(routeId);
	let delay = 0;

	for (const inc of activeIncidents) {
		if (
			inc.affectedSegment &&
			inc.affectedSegment.fromStopId === fromStopId &&
			inc.affectedSegment.toStopId === toStopId
		) {
			delay += inc.delayMinutes || 0;
		}
	}

	return delay;
}

/**
 * Returns total duration in minutes for an urban route including active incident delays
 */
export function calculateTotalRouteDuration(routeId) {
	const route = routes.find((r) => r.id === routeId);
	if (!route || !Array.isArray(route.segments)) return 0;

	return route.segments.reduce((total, seg) => {
		const delay = getSegmentDelayMinutes(route.id, seg.fromStopId, seg.toStopId);
		return total + seg.durationMinutes + delay;
	}, 0);
}

/**
 * Returns normal duration without incidents
 */
export function calculateNormalRouteDuration(routeId) {
	const route = routes.find((r) => r.id === routeId);
	if (!route || !Array.isArray(route.segments)) return 0;
	return route.segments.reduce((total, seg) => total + seg.durationMinutes, 0);
}

/**
 * Evaluates route operational status
 */
export function getRouteOperationalStatus(routeId) {
	const activeIncidents = getIncidentsByRoute(routeId);
	if (activeIncidents.length === 0) {
		return { statusKey: 'smooth', delayMinutes: 0, hasIncident: false };
	}

	const totalDelay = activeIncidents.reduce((sum, inc) => sum + (inc.delayMinutes || 0), 0);
	return {
		statusKey: 'delay',
		delayMinutes: totalDelay,
		hasIncident: true,
		incidents: activeIncidents
	};
}

/**
 * Calculates deterministic estimated arrival time for a bus at a target stop
 */
export function estimateBusArrivalMinutes(busId, targetStopId) {
	const bus = buses.find((b) => b.id === busId);
	if (!bus || !bus.routeId) return null;

	const route = routes.find((r) => r.id === bus.routeId);
	if (!route || !Array.isArray(route.segments)) return null;

	const currentSegIdx = bus.currentSegmentIndex || 0;
	const progress = Math.min(Math.max(bus.currentProgress || 0, 0), 1);

	// Find segment index where destination stop is reached
	const targetStopIdx = route.stopIds.indexOf(targetStopId);
	if (targetStopIdx === -1) return null;

	// If bus is already past target stop
	if (currentSegIdx >= targetStopIdx) {
		return 0;
	}

	let totalMinutes = 0;

	// Remaining time on current segment
	const currentSeg = route.segments[currentSegIdx];
	if (currentSeg) {
		const segDelay = getSegmentDelayMinutes(route.id, currentSeg.fromStopId, currentSeg.toStopId);
		const fullDuration = currentSeg.durationMinutes + segDelay;
		totalMinutes += fullDuration * (1 - progress);
	}

	// Add full durations of intermediate upcoming segments
	for (let i = currentSegIdx + 1; i < targetStopIdx; i++) {
		const seg = route.segments[i];
		if (seg) {
			const segDelay = getSegmentDelayMinutes(route.id, seg.fromStopId, seg.toStopId);
			totalMinutes += seg.durationMinutes + segDelay;
		}
	}

	return Math.max(1, Math.round(totalMinutes));
}
