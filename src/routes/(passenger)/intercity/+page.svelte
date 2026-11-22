<script>
	import { BusFront, Calendar, Search, Clock, Users } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t, locale } from '$lib/i18n/index.js';
	import { getWilayas, searchIntercityTrips } from '$lib/services/index.js';

	const wilayasList = getWilayas();

	let origin = $state('16'); // Algiers
	let destination = $state('31'); // Oran
	let date = $state('2026-11-25');

	let searchResults = $derived(
		searchIntercityTrips({
			originWilayaId: origin,
			destinationWilayaId: destination,
			date: date
		})
	);
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<div>
		<h1 class="text-lg font-bold tracking-tight">{$t('intercityPage.title')}</h1>
		<p class="text-xs text-muted-foreground">{$t('intercityPage.subtitle')}</p>
	</div>

	<!-- Search Criteria Form Card -->
	<Card>
		<CardHeader class="pb-3">
			<CardTitle class="text-sm">{$t('intercityPage.searchTitle')}</CardTitle>
			<CardDescription>{$t('intercityPage.searchDesc')}</CardDescription>
		</CardHeader>
		<CardContent class="space-y-3">
			<div class="space-y-2 text-xs">
				<label class="block">
					<span class="text-muted-foreground font-medium">{$t('intercityPage.originLabel')}</span>
					<div class="mt-1 flex items-center gap-2 p-2 rounded-lg bg-secondary/60 border border-border">
						<BusFront class="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
						<select
							bind:value={origin}
							class="w-full bg-transparent outline-none font-medium text-foreground cursor-pointer"
						>
							{#each wilayasList as w}
								<option value={w.id} class="bg-background text-foreground">
									{w.id} - {$locale === 'ar' ? w.nameArabic : w.name}
								</option>
							{/each}
						</select>
					</div>
				</label>

				<label class="block">
					<span class="text-muted-foreground font-medium">{$t('intercityPage.destLabel')}</span>
					<div class="mt-1 flex items-center gap-2 p-2 rounded-lg bg-secondary/60 border border-border">
						<BusFront class="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
						<select
							bind:value={destination}
							class="w-full bg-transparent outline-none font-medium text-foreground cursor-pointer"
						>
							{#each wilayasList as w}
								<option value={w.id} class="bg-background text-foreground">
									{w.id} - {$locale === 'ar' ? w.nameArabic : w.name}
								</option>
							{/each}
						</select>
					</div>
				</label>

				<label class="block">
					<span class="text-muted-foreground font-medium">{$t('intercityPage.dateLabel')}</span>
					<div class="mt-1 flex items-center gap-2 p-2 rounded-lg bg-secondary/60 border border-border">
						<Calendar class="h-4 w-4 text-muted-foreground shrink-0" />
						<input
							type="date"
							bind:value={date}
							class="w-full bg-transparent outline-none font-medium text-foreground"
						/>
					</div>
				</label>
			</div>
		</CardContent>
	</Card>

	<!-- Sample Trips Results -->
	<div class="space-y-2">
		<h2 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
			{$t('intercityPage.resultsTitle')} ({searchResults.length})
		</h2>

		{#if searchResults.length === 0}
			<Card class="p-4 text-center text-xs text-muted-foreground">
				No scheduled departures found for this criteria in the demo dataset.
			</Card>
		{:else}
			{#each searchResults as trip}
				<Card class="p-3.5 space-y-2.5">
					<div class="flex items-center justify-between">
						<span class="text-xs font-bold text-foreground">{trip.operatorName}</span>
						<span class="text-xs font-bold text-emerald-700 dark:text-emerald-400">{trip.priceDzd} {$t('intercityPage.fareCurrency')}</span>
					</div>
					<div class="flex items-center justify-between text-xs text-muted-foreground">
						<div class="flex items-center gap-1.5">
							<Clock class="h-3.5 w-3.5" />
							<span>{trip.departureTime} → {trip.arrivalTime} ({Math.round(trip.durationMinutes / 60)}h {trip.durationMinutes % 60}m)</span>
						</div>
						<Badge variant="outline">{trip.busModel}</Badge>
					</div>
					<div class="text-[11px] text-muted-foreground border-t border-border/50 pt-2 flex items-center justify-between">
						<span class="truncate max-w-[200px]">{trip.stops[0]?.stopName || 'Departure'}</span>
						<span class="text-emerald-700 dark:text-emerald-400 font-medium">{trip.availableSeats} demo seats</span>
					</div>
				</Card>
			{/each}
		{/if}
	</div>
</div>
