import { companies, buses, routes, users } from '$lib/data/index.js';

/**
 * Operator (Company & Driver) Workspace Services
 * Upholds tenant scoping:
 * - A Company user manages multiple buses in its fleet
 * - A Driver user manages exactly one assigned bus
 */

export function getCompanies() {
	return companies;
}

export function getCompanyById(id) {
	if (!id) return null;
	return companies.find((c) => c.id === id) || null;
}

/**
 * Returns all buses owned by a specific company (Company fleet view)
 */
export function getCompanyBuses(companyId) {
	if (!companyId) return [];
	return buses.filter((b) => b.companyId === companyId);
}

/**
 * Returns the single bus assigned to a driver
 */
export function getDriverBus(driverId) {
	if (!driverId) return null;
	const driver = users.find((u) => u.id === driverId && u.role === 'driver');
	if (!driver || !driver.assignedBusId) return null;
	return buses.find((b) => b.id === driver.assignedBusId) || null;
}

/**
 * Returns routes available to that company
 */
export function getCompanyRoutes(companyId) {
	if (!companyId) return [];
	return routes.filter((r) => r.companyId === companyId);
}

/**
 * Fleet statistics for operator overview
 */
export function getFleetStats(companyId) {
	const companyBuses = getCompanyBuses(companyId);
	return {
		total: companyBuses.length,
		enRoute: companyBuses.filter((b) => b.status === 'en_route').length,
		atDepot: companyBuses.filter((b) => b.status === 'at_depot').length,
		delayed: companyBuses.filter((b) => b.status === 'delayed').length
	};
}

/**
 * Checks whether an operator has permission to view/manage a bus
 */
export function canOperatorManageBus(user, busId) {
	if (!user || !busId) return false;
	const bus = buses.find((b) => b.id === busId);
	if (!bus) return false;

	if (user.role === 'admin') return true;
	if (user.role === 'company') return user.companyId === bus.companyId;
	if (user.role === 'driver') return user.assignedBusId === bus.id;

	return false;
}
