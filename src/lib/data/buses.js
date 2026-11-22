/**
 * Simulated Bus Fleet
 * Demonstrates operator ownership:
 * - ETUSA manages multiple buses (bus-16-042, bus-16-043, bus-16-011, bus-16-012, bus-16-121, bus-16-122)
 * - Driver Ahmed Mansouri is assigned specifically to bus-16-042
 * - ETO manages bus-31-001 (isolated from ETUSA)
 */
export const buses = [
	{
		id: 'bus-16-042',
		companyId: 'comp-etusa',
		routeId: 'route-etusa-04',
		driverId: 'user-driver-1',
		label: 'BUS-16-042',
		model: 'Mercedes-Benz Citaro C2',
		capacity: 85,
		status: 'en_route', // 'en_route' | 'at_depot' | 'delayed'
		currentSegmentIndex: 1, // Between stop-alg-beo and stop-alg-audin
		currentProgress: 0.45, // 45% through current segment
		currentPosition: [3.0525, 36.7850],
		lastUpdated: '2026-11-22T08:30:00Z'
	},
	{
		id: 'bus-16-043',
		companyId: 'comp-etusa',
		routeId: 'route-etusa-04',
		driverId: null,
		label: 'BUS-16-043',
		model: 'Mercedes-Benz Citaro',
		capacity: 85,
		status: 'en_route',
		currentSegmentIndex: 0,
		currentProgress: 0.20,
		currentPosition: [3.0590, 36.7880],
		lastUpdated: '2026-11-22T08:30:00Z'
	},
	{
		id: 'bus-16-011',
		companyId: 'comp-etusa',
		routeId: 'route-etusa-01',
		driverId: null,
		label: 'BUS-16-011',
		model: 'Van Hool A330',
		capacity: 90,
		status: 'en_route',
		currentSegmentIndex: 1,
		currentProgress: 0.70,
		currentPosition: [3.0560, 36.7790],
		lastUpdated: '2026-11-22T08:30:00Z'
	},
	{
		id: 'bus-16-012',
		companyId: 'comp-etusa',
		routeId: 'route-etusa-01',
		driverId: null,
		label: 'BUS-16-012',
		model: 'Van Hool A330',
		capacity: 90,
		status: 'at_depot',
		currentSegmentIndex: 0,
		currentProgress: 0.0,
		currentPosition: [3.0588, 36.7725],
		lastUpdated: '2026-11-22T08:00:00Z'
	},
	{
		id: 'bus-16-121',
		companyId: 'comp-etusa',
		routeId: 'route-etusa-12',
		driverId: null,
		label: 'BUS-16-121',
		model: 'Mercedes Citaro G Articulated',
		capacity: 140,
		status: 'delayed', // Affected by incident on Ruisseau segment
		currentSegmentIndex: 3, // Between Ruisseau and Caroubier
		currentProgress: 0.60,
		currentPosition: [3.0800, 36.7445],
		lastUpdated: '2026-11-22T08:30:00Z'
	},
	{
		id: 'bus-16-122',
		companyId: 'comp-etusa',
		routeId: 'route-etusa-12',
		driverId: null,
		label: 'BUS-16-122',
		model: 'Mercedes-Benz Citaro',
		capacity: 85,
		status: 'en_route',
		currentSegmentIndex: 0,
		currentProgress: 0.85,
		currentPosition: [3.0530, 36.7600],
		lastUpdated: '2026-11-22T08:30:00Z'
	},
	{
		id: 'bus-31-001',
		companyId: 'comp-eto',
		routeId: null,
		driverId: null,
		label: 'BUS-31-001',
		model: 'Isuzu Citybus',
		capacity: 65,
		status: 'at_depot',
		currentSegmentIndex: 0,
		currentProgress: 0.0,
		currentPosition: [-0.6417, 35.6976],
		lastUpdated: '2026-11-22T08:00:00Z'
	}
];
