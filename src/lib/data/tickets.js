/**
 * Demonstration Travel Passes & Tickets
 * Display-only presentation data with clear non-transactional labeling.
 */
export const subscriptions = [
	{
		id: 'sub-pass-01',
		passengerId: 'user-passenger-1',
		planName: 'Monthly Algiers Transit Pass',
		planNameArabic: 'اشتراك شهري شبكة الجزائر',
		zone: 'Réseau Urbain Alger Métropole',
		validFrom: '2026-11-01',
		validUntil: '2026-11-30',
		priceDzd: 1800,
		status: 'active',
		qrReference: 'SUTRAF-PASS-SUB-202611-KB',
		holderName: 'Karim Benali'
	}
];

export const tickets = [
	{
		id: 'tkt-2026-8819',
		passengerId: 'user-passenger-1',
		tripId: 'trip-alg-ora-01',
		reference: '#DZ-2026-8819',
		passengerName: 'Karim Benali',
		originName: 'Algiers (Gare Routière Caroubier)',
		originNameArabic: 'الجزائر (المحطة المركزية الخروبة)',
		destinationName: 'Oran (Gare Routière El Bahia)',
		destinationNameArabic: 'وهران (محطة الباهية)',
		seatNumber: 14,
		departureDate: '2026-11-25',
		departureTime: '07:30',
		priceDzd: 1200,
		status: 'confirmed',
		operatorName: 'SOGRAL / El Ghazala Express',
		qrReference: 'SUTRAF-TKT-DZ2026-8819'
	}
];
