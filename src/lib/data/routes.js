/**
 * Urban Routes with GeoJSON Geometry, Ordered Stops & Fixed Segment Durations
 * Segment durations are explicit and constant across calculations.
 */
export const routes = [
	{
		id: 'route-etusa-04',
		cityId: 'city-alger',
		companyId: 'comp-etusa',
		code: 'L04',
		name: 'Place des Martyrs ↔ Tafourah - Grande Poste',
		nameArabic: 'ساحة الشهداء ↔ تافورة - البريد المركزي',
		color: '#d97706', // amber-600
		type: 'bus',
		frequencyMinutes: 8,
		stopIds: ['stop-alg-martyrs', 'stop-alg-beo', 'stop-alg-audin', 'stop-alg-tafourah'],
		segments: [
			{ fromStopId: 'stop-alg-martyrs', toStopId: 'stop-alg-beo', durationMinutes: 4, distanceKm: 1.8 },
			{ fromStopId: 'stop-alg-beo', toStopId: 'stop-alg-audin', durationMinutes: 6, distanceKm: 2.4 },
			{ fromStopId: 'stop-alg-audin', toStopId: 'stop-alg-tafourah', durationMinutes: 3, distanceKm: 1.1 }
		],
		geometry: {
			type: 'LineString',
			coordinates: [
				[3.0617, 36.7867],
				[3.0555, 36.7895],
				[3.0489, 36.7925],
				[3.0510, 36.7820],
				[3.0545, 36.7750],
				[3.0570, 36.7705],
				[3.0588, 36.7725]
			]
		}
	},
	{
		id: 'route-etusa-01',
		cityId: 'city-alger',
		companyId: 'comp-etusa',
		code: 'L01',
		name: 'Tafourah ↔ Bab El Oued',
		nameArabic: 'تافورة ↔ باب الواد',
		color: '#059669', // emerald-600
		type: 'bus',
		frequencyMinutes: 6,
		stopIds: ['stop-alg-tafourah', 'stop-alg-audin', 'stop-alg-martyrs', 'stop-alg-beo'],
		segments: [
			{ fromStopId: 'stop-alg-tafourah', toStopId: 'stop-alg-audin', durationMinutes: 3, distanceKm: 1.1 },
			{ fromStopId: 'stop-alg-audin', toStopId: 'stop-alg-martyrs', durationMinutes: 5, distanceKm: 2.1 },
			{ fromStopId: 'stop-alg-martyrs', toStopId: 'stop-alg-beo', durationMinutes: 4, distanceKm: 1.8 }
		],
		geometry: {
			type: 'LineString',
			coordinates: [
				[3.0588, 36.7725],
				[3.0570, 36.7705],
				[3.0545, 36.7750],
				[3.0590, 36.7820],
				[3.0617, 36.7867],
				[3.0555, 36.7895],
				[3.0489, 36.7925]
			]
		}
	},
	{
		id: 'route-etusa-12',
		cityId: 'city-alger',
		companyId: 'comp-etusa',
		code: 'L12',
		name: 'Grande Poste ↔ Bab Ezzouar (Université USTHB)',
		nameArabic: 'البريد المركزي ↔ باب الزوار (جامعة هواري بومدين)',
		color: '#0284c7', // sky-600
		type: 'bus',
		frequencyMinutes: 12,
		stopIds: [
			'stop-alg-tafourah',
			'stop-alg-1ermai',
			'stop-alg-hamma',
			'stop-alg-ruisseau',
			'stop-alg-caroubier',
			'stop-alg-harrach',
			'stop-alg-bezzouar'
		],
		segments: [
			{ fromStopId: 'stop-alg-tafourah', toStopId: 'stop-alg-1ermai', durationMinutes: 5, distanceKm: 2.2 },
			{ fromStopId: 'stop-alg-1ermai', toStopId: 'stop-alg-hamma', durationMinutes: 4, distanceKm: 1.9 },
			{ fromStopId: 'stop-alg-hamma', toStopId: 'stop-alg-ruisseau', durationMinutes: 3, distanceKm: 1.3 },
			{ fromStopId: 'stop-alg-ruisseau', toStopId: 'stop-alg-caroubier', durationMinutes: 5, distanceKm: 2.6 },
			{ fromStopId: 'stop-alg-caroubier', toStopId: 'stop-alg-harrach', durationMinutes: 6, distanceKm: 3.1 },
			{ fromStopId: 'stop-alg-harrach', toStopId: 'stop-alg-bezzouar', durationMinutes: 7, distanceKm: 4.2 }
		],
		geometry: {
			type: 'LineString',
			coordinates: [
				[3.0588, 36.7725],
				[3.0540, 36.7640],
				[3.0515, 36.7570],
				[3.0620, 36.7520],
				[3.0725, 36.7485],
				[3.0635, 36.7455],
				[3.0850, 36.7440],
				[3.1042, 36.7428],
				[3.1180, 36.7320],
				[3.1315, 36.7210],
				[3.1550, 36.7160],
				[3.1812, 36.7118]
			]
		}
	}
];
