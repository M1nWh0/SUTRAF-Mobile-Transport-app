/**
 * Licensed Transport Companies / Operators
 * Demonstrates operator ownership and multi-tenant scoping.
 */
export const companies = [
	{
		id: 'comp-etusa',
		code: 'ETUSA',
		name: 'ETUSA (Entreprise de Transport Urbain et Suburbain d\'Alger)',
		nameArabic: 'مؤسسة النقل الحضري والشبه الحضري لمدينة الجزائر (إيتوزا)',
		type: 'urban',
		status: 'active',
		wilayaId: '16',
		fleetSize: 12,
		operatedRouteIds: ['route-etusa-01', 'route-etusa-04', 'route-etusa-12'],
		contactDetails: {
			phone: '+213 21 66 33 22',
			email: 'contact@etusa.dz',
			address: '02 Rue Hassiba Ben Bouali, Alger'
		}
	},
	{
		id: 'comp-sogral',
		code: 'SOGRAL',
		name: 'SOGRAL (Société de Gestion des Gares Routières d\'Algérie)',
		nameArabic: 'الشركة الوطنية لاستغلال وتسيير المحطات البرية (سوغرال)',
		type: 'intercity',
		status: 'active',
		wilayaId: '16',
		fleetSize: 24,
		contactDetails: {
			phone: '+213 21 49 55 00',
			email: 'info@sogral.dz',
			address: 'Gare Routière Centrale de Caroubier, Alger'
		}
	},
	{
		id: 'comp-elghazala',
		code: 'ELGHAZALA',
		name: 'El Ghazala Express Transport Interwilayas',
		nameArabic: 'الغزالة إكسبريس للنقل بين الولايات',
		type: 'intercity',
		status: 'active',
		wilayaId: '31',
		fleetSize: 10,
		contactDetails: {
			phone: '+213 41 33 11 00',
			email: 'contact@elghazala.dz',
			address: 'Gare Routière El Bahia, Oran'
		}
	},
	{
		id: 'comp-eto',
		code: 'ETO',
		name: 'ETO (Entreprise de Transport d\'Oran)',
		nameArabic: 'مؤسسة النقل الحضري لوهران',
		type: 'urban',
		status: 'active',
		wilayaId: '31',
		fleetSize: 8,
		operatedRouteIds: ['route-eto-01'],
		contactDetails: {
			phone: '+213 41 55 22 11',
			email: 'contact@eto.dz',
			address: 'Boulevard de l\'ALN, Oran'
		}
	}
];
