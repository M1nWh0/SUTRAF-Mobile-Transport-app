import { writable, derived } from 'svelte/store';
import { translations } from './translations.js';

export const SUPPORTED_LOCALES = ['ar', 'en'];
export const DEFAULT_LOCALE = 'en';

const STORAGE_KEY = 'sutraf_locale';

// Writable locale store ('en' or 'ar')
export const locale = writable(DEFAULT_LOCALE);

// Derived document direction store ('rtl' for Arabic, 'ltr' for English)
export const dir = derived(locale, ($locale) => ($locale === 'ar' ? 'rtl' : 'ltr'));

// Reactive translation helper store: $t('nav.home')
export const t = derived(locale, ($locale) => {
	return (path, fallback = '') => {
		const keys = path.split('.');
		let current = translations[$locale];

		for (const key of keys) {
			if (current && typeof current === 'object' && key in current) {
				current = current[key];
			} else {
				current = undefined;
				break;
			}
		}

		if (current !== undefined && typeof current === 'string') {
			return current;
		}

		// Fallback to English dictionary
		let fallbackCurrent = translations.en;
		for (const key of keys) {
			if (fallbackCurrent && typeof fallbackCurrent === 'object' && key in fallbackCurrent) {
				fallbackCurrent = fallbackCurrent[key];
			} else {
				fallbackCurrent = undefined;
				break;
			}
		}

		if (fallbackCurrent !== undefined && typeof fallbackCurrent === 'string') {
			return fallbackCurrent;
		}

		return fallback || path;
	};
});

/**
 * Switch locale, update DOM attributes and persist preference
 */
export function setLocale(newLocale) {
	if (!SUPPORTED_LOCALES.includes(newLocale)) return;
	locale.set(newLocale);

	if (typeof window !== 'undefined') {
		try {
			localStorage.setItem(STORAGE_KEY, newLocale);
		} catch (e) {
			console.warn('Could not persist locale to localStorage', e);
		}
		document.documentElement.lang = newLocale;
		document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
	}
}

/**
 * Toggle between Arabic and English
 */
export function toggleLocale() {
	locale.update((current) => {
		const next = current === 'ar' ? 'en' : 'ar';
		setLocale(next);
		return next;
	});
}

/**
 * Initialize locale on client-side mount
 */
export function initI18n() {
	if (typeof window === 'undefined') return;

	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved && SUPPORTED_LOCALES.includes(saved)) {
			setLocale(saved);
			return;
		}
	} catch (e) {}

	setLocale(DEFAULT_LOCALE);
}
