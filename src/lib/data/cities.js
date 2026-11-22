/**
 * Sample Metropolitan Cities for Urban Transport Networks
 * Coordinates follow GeoJSON convention: [longitude, latitude]
 */
export const cities = [
	{
		id: 'city-alger',
		wilayaId: '16',
		name: 'Algiers',
		nameArabic: 'الجزائر العاصمة',
		centreCoordinates: [3.0588, 36.7538],
		defaultZoom: 13,
		activeLinesCount: 8,
		urbanStopsCount: 64,
		activeFleetCount: 18,
		isDefault: true
	},
	{
		id: 'city-oran',
		wilayaId: '31',
		name: 'Oran',
		nameArabic: 'وهران',
		centreCoordinates: [-0.6417, 35.6976],
		defaultZoom: 13,
		activeLinesCount: 5,
		urbanStopsCount: 42,
		activeFleetCount: 12,
		isDefault: false
	},
	{
		id: 'city-constantine',
		wilayaId: '25',
		name: 'Constantine',
		nameArabic: 'قسنطينة',
		centreCoordinates: [6.6147, 36.3650],
		defaultZoom: 13,
		activeLinesCount: 4,
		urbanStopsCount: 36,
		activeFleetCount: 10,
		isDefault: false
	}
];
