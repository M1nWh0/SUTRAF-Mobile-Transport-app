/**
 * Urban Transit Stops & Stations
 * Coordinates follow GeoJSON convention: [longitude, latitude]
 * Located in Algiers metropolitan center.
 */
export const stops = [
	{
		id: 'stop-alg-martyrs',
		cityId: 'city-alger',
		name: 'Place des Martyrs',
		nameArabic: 'ساحة الشهداء',
		coordinates: [3.0617, 36.7867],
		type: 'station',
		hasShelter: true,
		routeIds: ['route-etusa-01', 'route-etusa-04']
	},
	{
		id: 'stop-alg-beo',
		cityId: 'city-alger',
		name: 'Bab El Oued (Marché)',
		nameArabic: 'باب الواد (السوق)',
		coordinates: [3.0489, 36.7925],
		type: 'stop',
		hasShelter: true,
		routeIds: ['route-etusa-01', 'route-etusa-04']
	},
	{
		id: 'stop-alg-tafourah',
		cityId: 'city-alger',
		name: 'Tafourah - Grande Poste',
		nameArabic: 'تافورة - البريد المركزي',
		coordinates: [3.0588, 36.7725],
		type: 'station',
		hasShelter: true,
		routeIds: ['route-etusa-01', 'route-etusa-04', 'route-etusa-12']
	},
	{
		id: 'stop-alg-audin',
		cityId: 'city-alger',
		name: 'Place Maurice Audin',
		nameArabic: 'ساحة موريس أودان',
		coordinates: [3.0570, 36.7705],
		type: 'stop',
		hasShelter: true,
		routeIds: ['route-etusa-01', 'route-etusa-04']
	},
	{
		id: 'stop-alg-1ermai',
		cityId: 'city-alger',
		name: 'Place du 1er Mai',
		nameArabic: 'ساحة أول ماي',
		coordinates: [3.0515, 36.7570],
		type: 'station',
		hasShelter: true,
		routeIds: ['route-etusa-12']
	},
	{
		id: 'stop-alg-hamma',
		cityId: 'city-alger',
		name: 'Hamma - Jardin d\'Essai',
		nameArabic: 'الحامة - حديقة التجارب',
		coordinates: [3.0725, 36.7485],
		type: 'stop',
		hasShelter: true,
		routeIds: ['route-etusa-12']
	},
	{
		id: 'stop-alg-ruisseau',
		cityId: 'city-alger',
		name: 'Ruisseau (Pôle d\'Échange)',
		nameArabic: 'الرويسو (محطة التبادل)',
		coordinates: [3.0635, 36.7455],
		type: 'station',
		hasShelter: true,
		routeIds: ['route-etusa-12']
	},
	{
		id: 'stop-alg-caroubier',
		cityId: 'city-alger',
		name: 'Caroubier - Gare Multimodale',
		nameArabic: 'الخروبة - المحطة متعددة الأنماط',
		coordinates: [3.1042, 36.7428],
		type: 'station',
		hasShelter: true,
		routeIds: ['route-etusa-12']
	},
	{
		id: 'stop-alg-harrach',
		cityId: 'city-alger',
		name: 'El Harrach Centre',
		nameArabic: 'الحراش وسط',
		coordinates: [3.1315, 36.7210],
		type: 'stop',
		hasShelter: true,
		routeIds: ['route-etusa-12']
	},
	{
		id: 'stop-alg-bezzouar',
		cityId: 'city-alger',
		name: 'Bab Ezzouar (Université USTHB)',
		nameArabic: 'باب الزوار (جامعة هواري بومدين)',
		coordinates: [3.1812, 36.7118],
		type: 'station',
		hasShelter: true,
		routeIds: ['route-etusa-12']
	}
];
