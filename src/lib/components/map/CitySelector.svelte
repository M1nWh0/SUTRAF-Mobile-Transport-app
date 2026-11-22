<script>
	import { MapPin, Crosshair, Check, AlertCircle, Loader2 } from '@lucide/svelte';
	import { t, locale } from '$lib/i18n/index.js';
	import { cities } from '$lib/data/cities.js';
	import { findNearestSupportedCity } from '$lib/services/index.js';

	let {
		selectedCityId = 'city-alger',
		onSelectCity = () => {}
	} = $props();

	let locating = $state(false);
	let locationMessage = $state(null);
	let locationError = $state(false);

	function handleCityChange(e) {
		const newCityId = e.target.value;
		onSelectCity(newCityId);
	}

	function handleLocateMe() {
		if (typeof navigator === 'undefined' || !navigator.geolocation) {
			locationError = true;
			locationMessage = $t('urbanPage.locationError');
			return;
		}

		locating = true;
		locationMessage = null;
		locationError = false;

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				locating = false;
				const { latitude, longitude } = pos.coords;
				const nearest = findNearestSupportedCity(latitude, longitude);

				if (nearest && nearest.city) {
					onSelectCity(nearest.city.id);
					locationError = false;
					const cityName = $locale === 'ar' ? nearest.city.nameArabic : nearest.city.name;
					locationMessage = `${$t('urbanPage.locationDetected')} ${cityName} (~${nearest.distanceKm} km)`;
				} else {
					locationError = false;
					locationMessage = $t('urbanPage.locationDetected') + ' ' + cities[0].name;
					onSelectCity(cities[0].id);
				}

				// Clear notification after 4s
				setTimeout(() => {
					locationMessage = null;
				}, 4000);
			},
			(err) => {
				locating = false;
				locationError = true;
				locationMessage = $t('urbanPage.locationError');
				setTimeout(() => {
					locationMessage = null;
					locationError = false;
				}, 4000);
			},
			{ timeout: 8000, maximumAge: 60000, enableHighAccuracy: false }
		);
	}
</script>

<div class="flex flex-col space-y-1.5 w-full">
	<div class="flex items-center justify-between gap-2">
		<!-- Manual City Selector -->
		<div class="relative flex-1">
			<label for="city-select" class="sr-only">{$t('urbanPage.citySelectLabel')}</label>
			<div class="relative flex items-center">
				<MapPin class="absolute start-2.5 h-4 w-4 text-emerald-600 dark:text-emerald-400 pointer-events-none" />
				<select
					id="city-select"
					value={selectedCityId}
					onchange={handleCityChange}
					class="w-full h-9 ps-8 pe-4 rounded-lg bg-background border border-border text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer shadow-xs transition-colors"
				>
					{#each cities as city}
						<option value={city.id}>
							{$locale === 'ar' ? city.nameArabic : city.name} ({city.wilayaId})
						</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Optional Explicit Locate Me Button -->
		<button
			type="button"
			class="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-xs font-medium text-foreground cursor-pointer shadow-xs transition-colors shrink-0 disabled:opacity-50"
			onclick={handleLocateMe}
			disabled={locating}
			title={$t('urbanPage.locateMe')}
			aria-label={$t('urbanPage.locateMe')}
		>
			{#if locating}
				<Loader2 class="h-3.5 w-3.5 animate-spin text-emerald-600" />
				<span class="hidden sm:inline text-[11px]">{$t('urbanPage.locating')}</span>
			{:else}
				<Crosshair class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
				<span class="hidden sm:inline text-[11px]">{$t('urbanPage.locateMe')}</span>
			{/if}
		</button>
	</div>

	<!-- Non-blocking location feedback banner -->
	{#if locationMessage}
		<div
			class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-all {locationError
				? 'bg-destructive/10 text-destructive border border-destructive/20'
				: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'}"
		>
			{#if locationError}
				<AlertCircle class="h-3 w-3 shrink-0" />
			{:else}
				<Check class="h-3 w-3 shrink-0" />
			{/if}
			<span class="truncate">{locationMessage}</span>
		</div>
	{/if}
</div>
