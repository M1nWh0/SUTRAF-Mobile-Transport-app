<script>
	import { BusFront, Calendar, Search, ArrowRight, ArrowLeftRight, Clock, ShieldCheck } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t } from '$lib/i18n/index.js';

	let origin = $state('16 - Algiers / الجزائر');
	let destination = $state('31 - Oran / وهران');
	let date = $state('2026-11-25');
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
						<BusFront class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
						<input
							type="text"
							bind:value={origin}
							class="w-full bg-transparent outline-none font-medium text-foreground"
							placeholder={$t('intercityPage.originPlaceholder')}
						/>
					</div>
				</label>

				<label class="block">
					<span class="text-muted-foreground font-medium">{$t('intercityPage.destLabel')}</span>
					<div class="mt-1 flex items-center gap-2 p-2 rounded-lg bg-secondary/60 border border-border">
						<BusFront class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
						<input
							type="text"
							bind:value={destination}
							class="w-full bg-transparent outline-none font-medium text-foreground"
							placeholder={$t('intercityPage.destPlaceholder')}
						/>
					</div>
				</label>

				<label class="block">
					<span class="text-muted-foreground font-medium">{$t('intercityPage.dateLabel')}</span>
					<div class="mt-1 flex items-center gap-2 p-2 rounded-lg bg-secondary/60 border border-border">
						<Calendar class="h-4 w-4 text-muted-foreground" />
						<input
							type="date"
							bind:value={date}
							class="w-full bg-transparent outline-none font-medium text-foreground"
						/>
					</div>
				</label>
			</div>

			<Button variant="default" class="w-full gap-2">
				<Search class="h-4 w-4" />
				<span>{$t('intercityPage.searchBtn')}</span>
			</Button>
		</CardContent>
	</Card>

	<!-- Sample Trips Results Placeholder -->
	<div class="space-y-2">
		<h2 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
			{$t('intercityPage.resultsTitle')}
		</h2>

		<Card class="p-3.5 space-y-2">
			<div class="flex items-center justify-between">
				<span class="text-xs font-bold text-foreground">SOGRAL / El Ghazala Express</span>
				<span class="text-xs font-bold text-emerald-700 dark:text-emerald-400">1 200 {$t('intercityPage.fareCurrency')}</span>
			</div>
			<div class="flex items-center justify-between text-xs text-muted-foreground">
				<div class="flex items-center gap-1.5">
					<Clock class="h-3.5 w-3.5" />
					<span>07:30 → 13:00 (5h 30m)</span>
				</div>
				<Badge variant="outline">{$t('intercityPage.directAirConditioned')}</Badge>
			</div>
			<div class="text-[11px] text-muted-foreground border-t border-border/50 pt-2 flex items-center justify-between">
				<span>{$t('intercityPage.departureStation')}</span>
				<span class="text-emerald-700 dark:text-emerald-400 font-medium">{$t('intercityPage.seatsDemo')}</span>
			</div>
		</Card>
	</div>
</div>
