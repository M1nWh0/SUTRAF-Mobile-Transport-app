/**
 * Licensed Transport Companies / Operators
 * Demonstrates operator ownership and multi-tenant scoping across Algerian wilayas.
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
		fleetSize: 45,
		operatedRouteIds: ['route-etusa-01', 'route-etusa-04', 'route-etusa-07', 'route-etusa-12', 'route-etusa-16', 'route-etusa-32', 'route-tram-alger', 'route-metro-alger'],
		contactDetails: {
			phone: '+213 21 66 33 22',
			email: 'contact@etusa.dz',
			address: '02 Rue Hassiba Ben Bouali, Alger'
		}
	},
	{
		id: 'comp-eto',
		code: 'ETO',
		name: 'ETO (Entreprise de Transport d\'Oran)',
		nameArabic: 'مؤسسة النقل الحضري لوهران (إيتو)',
		type: 'urban',
		status: 'active',
		wilayaId: '31',
		fleetSize: 28,
		operatedRouteIds: ['route-eto-01', 'route-eto-03', 'route-eto-11', 'route-tram-oran'],
		contactDetails: {
			phone: '+213 41 55 22 11',
			email: 'contact@eto.dz',
			address: 'Boulevard de l\'ALN, Oran'
		}
	},
	{
		id: 'comp-etc',
		code: 'ETC',
		name: 'ETC (Entreprise de Transport de Constantine)',
		nameArabic: 'مؤسسة النقل الحضري لقسنطينة',
		type: 'urban',
		status: 'active',
		wilayaId: '25',
		fleetSize: 22,
		operatedRouteIds: ['route-etc-02', 'route-etc-05', 'route-tram-constantine'],
		contactDetails: {
			phone: '+213 31 88 44 20',
			email: 'contact@etc.dz',
			address: 'Zone Industrielle Palma, Constantine'
		}
	},
	{
		id: 'comp-etua',
		code: 'ETUA',
		name: 'ETUA (Entreprise de Transport Urbain d\'Annaba)',
		nameArabic: 'مؤسسة النقل الحضري لعنابة',
		type: 'urban',
		status: 'active',
		wilayaId: '23',
		fleetSize: 18,
		operatedRouteIds: ['route-etua-01', 'route-etua-04'],
		contactDetails: {
			phone: '+213 38 72 15 00',
			email: 'contact@etua.dz',
			address: 'Boulevard Zighoud Youcef, Annaba'
		}
	},
	{
		id: 'comp-etus',
		code: 'ETUS',
		name: 'ETUS (Entreprise de Transport Urbain de Sétif)',
		nameArabic: 'مؤسسة النقل الحضري لسطيف',
		type: 'urban',
		status: 'active',
		wilayaId: '19',
		fleetSize: 16,
		operatedRouteIds: ['route-etus-01', 'route-tram-setif'],
		contactDetails: {
			phone: '+213 36 91 30 10',
			email: 'contact@etus-setif.dz',
			address: 'Zone des Pépinières, Sétif'
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
		fleetSize: 120,
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
		fleetSize: 35,
		contactDetails: {
			phone: '+213 41 33 11 00',
			email: 'contact@elghazala.dz',
			address: 'Gare Routière El Bahia, Oran'
		}
	},
	{
		id: 'comp-trans-sud',
		code: 'TRANSSUD',
		name: 'Trans-Sud Voyages Sahariens',
		nameArabic: 'ترانس جنوب للرحلات الصحراوية',
		type: 'intercity',
		status: 'active',
		wilayaId: '47',
		fleetSize: 25,
		contactDetails: {
			phone: '+213 29 88 12 34',
			email: 'contact@trans-sud.dz',
			address: 'Avenue Habib Boukhari, Ghardaïa'
		}
	}
];
