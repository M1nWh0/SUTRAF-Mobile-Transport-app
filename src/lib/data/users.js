/**
 * Structured Demo Users
 * Demonstrates role-based workspaces and scoping:
 * - Passenger: accesses public transit info, tickets & settings
 * - Driver: manages ONLY ONE bus (assignedBusId)
 * - Company: manages MULTIPLE buses across company fleet
 * - Admin: supervises global system data
 */
export const users = [
	{
		id: 'user-passenger-1',
		displayName: 'Karim Benali',
		email: 'karim.demo@sutraf.dz',
		role: 'passenger',
		activeCityId: 'city-alger',
		status: 'active'
	},
	{
		id: 'user-driver-1',
		displayName: 'Ahmed Mansouri',
		email: 'a.mansouri@etusa.dz',
		role: 'driver',
		companyId: 'comp-etusa',
		assignedBusId: 'bus-16-042', // Driver has exactly 1 bus
		assignedRouteId: 'route-etusa-04',
		status: 'active'
	},
	{
		id: 'user-company-1',
		displayName: 'Farid Belkacem (ETUSA Fleet Admin)',
		email: 'ops@etusa.dz',
		role: 'company',
		companyId: 'comp-etusa', // Company manages multiple buses
		status: 'active'
	},
	{
		id: 'user-admin-1',
		displayName: 'SUTRAF Admin (National Transit)',
		email: 'admin@sutraf.dz',
		role: 'admin',
		status: 'active'
	}
];
