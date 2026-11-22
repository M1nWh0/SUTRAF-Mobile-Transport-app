/**
 * Traffic Incidents & Route Delays
 * Structured delays that deterministically affect specific route segments.
 */
export const incidents = [
	{
		id: 'inc-01',
		routeId: 'route-etusa-12',
		affectedSegment: {
			fromStopId: 'stop-alg-ruisseau',
			toStopId: 'stop-alg-caroubier'
		},
		delayMinutes: 8,
		severity: 'moderate',
		description: 'Heavy roadworks and traffic congestion near Ruisseau interchange',
		descriptionArabic: 'أشغال طرق وازدحام مروري بالقرب من محول الرويسو',
		status: 'active',
		reportedAt: '2026-11-22T08:15:00Z'
	},
	{
		id: 'inc-02',
		routeId: 'route-etusa-04',
		affectedSegment: {
			fromStopId: 'stop-alg-beo',
			toStopId: 'stop-alg-audin'
		},
		delayMinutes: 5,
		severity: 'minor',
		description: 'Temporary lane narrowing due to municipal maintenance',
		descriptionArabic: 'تضييق مؤقت للمسار بسبب أشغال الصيانة البلدية',
		status: 'active',
		reportedAt: '2026-11-22T08:30:00Z'
	}
];
