/**
 * Intercity Coach Trips Between Algerian Wilayas
 * Structured intermediate stop sequences with fixed scheduled times and prices.
 */
export const trips = [
	{
		id: 'trip-alg-ora-01',
		companyId: 'comp-sogral',
		operatorName: 'SOGRAL / El Ghazala Express',
		originWilayaId: '16', // Algiers
		destinationWilayaId: '31', // Oran
		date: '2026-11-25',
		departureTime: '07:30',
		arrivalTime: '13:00',
		durationMinutes: 330,
		priceDzd: 1200,
		availableSeats: 42,
		totalSeats: 48,
		busModel: 'Scania Irizar i6',
		amenities: ['ac', 'wifi', 'usb_charging', 'direct'],
		stops: [
			{ wilayaId: '16', stopName: 'Gare Routière Caroubier (Alger)', scheduledTime: '07:30', isDeparture: true },
			{ wilayaId: '09', stopName: 'Gare Routière de Blida', scheduledTime: '08:15' },
			{ wilayaId: '44', stopName: 'Aïn Defla Station', scheduledTime: '09:40' },
			{ wilayaId: '02', stopName: 'Chlef Gare Routière', scheduledTime: '10:50' },
			{ wilayaId: '48', stopName: 'Relizane', scheduledTime: '11:45' },
			{ wilayaId: '31', stopName: 'Gare Routière El Bahia (Oran)', scheduledTime: '13:00', isArrival: true }
		]
	},
	{
		id: 'trip-alg-con-01',
		companyId: 'comp-sogral',
		operatorName: 'SOGRAL Inter-Est',
		originWilayaId: '16', // Algiers
		destinationWilayaId: '25', // Constantine
		date: '2026-11-25',
		departureTime: '08:00',
		arrivalTime: '14:30',
		durationMinutes: 390,
		priceDzd: 1400,
		availableSeats: 35,
		totalSeats: 48,
		busModel: 'Mercedes-Benz Travego',
		amenities: ['ac', 'wifi'],
		stops: [
			{ wilayaId: '16', stopName: 'Gare Routière Caroubier (Alger)', scheduledTime: '08:00', isDeparture: true },
			{ wilayaId: '35', stopName: 'Boumerdès Station', scheduledTime: '08:45' },
			{ wilayaId: '10', stopName: 'Bouira Gare', scheduledTime: '09:50' },
			{ wilayaId: '34', stopName: 'Bordj Bou Arréridj', scheduledTime: '11:30' },
			{ wilayaId: '19', stopName: 'Sétif Gare Routière', scheduledTime: '12:45' },
			{ wilayaId: '25', stopName: 'Gare Routière Oued Ziad (Constantine)', scheduledTime: '14:30', isArrival: true }
		]
	},
	{
		id: 'trip-alg-bej-01',
		companyId: 'comp-elghazala',
		operatorName: 'El Ghazala Express',
		originWilayaId: '16', // Algiers
		destinationWilayaId: '06', // Béjaïa
		date: '2026-11-25',
		departureTime: '09:00',
		arrivalTime: '13:30',
		durationMinutes: 270,
		priceDzd: 850,
		availableSeats: 28,
		totalSeats: 40,
		busModel: 'Higer Touring V8',
		amenities: ['ac'],
		stops: [
			{ wilayaId: '16', stopName: 'Gare Routière Caroubier (Alger)', scheduledTime: '09:00', isDeparture: true },
			{ wilayaId: '15', stopName: 'Tizi Ouzou (Carrefour)', scheduledTime: '10:30' },
			{ wilayaId: '06', stopName: 'Gare Routière de Béjaïa', scheduledTime: '13:30', isArrival: true }
		]
	},
	{
		id: 'trip-ora-tlem-01',
		companyId: 'comp-elghazala',
		operatorName: 'El Ghazala Ouest',
		originWilayaId: '31', // Oran
		destinationWilayaId: '13', // Tlemcen
		date: '2026-11-25',
		departureTime: '10:00',
		arrivalTime: '12:30',
		durationMinutes: 150,
		priceDzd: 500,
		availableSeats: 30,
		totalSeats: 45,
		busModel: 'Volvo B11R',
		amenities: ['ac', 'wifi'],
		stops: [
			{ wilayaId: '31', stopName: 'Gare Routière El Bahia (Oran)', scheduledTime: '10:00', isDeparture: true },
			{ wilayaId: '46', stopName: 'Aïn Témouchent', scheduledTime: '11:15' },
			{ wilayaId: '13', stopName: 'Gare Routière Tlemcen', scheduledTime: '12:30', isArrival: true }
		]
	}
];
