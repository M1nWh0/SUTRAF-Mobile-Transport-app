<script>
	import { Map, BusFront, Route, Ticket, ArrowRight, ShieldCheck, Clock, AlertTriangle } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t } from '$lib/i18n/index.js';

	let activeTransportMode = $state('urban'); // 'urban' | 'intercity'

	const sampleRoutes = [
		{ code: 'L01', nameEn: 'Tafourah ↔ Bab El Oued', nameAr: 'تافورة ↔ باب الواد', stops: 16, freq: '6', statusKey: 'smooth' },
		{ code: 'L04', nameEn: 'Place des Martyrs ↔ Tafourah', nameAr: 'ساحة الشهداء ↔ تافورة', stops: 14, freq: '8', statusKey: 'smooth' },
		{ code: 'L12', nameEn: 'Grande Poste ↔ Bab Ezzouar', nameAr: 'البريد المركزي ↔ باب الزوار', stops: 22, freq: '12', statusKey: 'delay' }
	];
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<!-- Hero / Welcome & Mode Switch -->
	<section class="space-y-3">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-xl font-bold tracking-tight text-foreground">
					{$t('home.title')}
				</h1>
				<p class="text-xs text-muted-foreground">
					{$t('home.subtitle')}
				</p>
			</div>
			<Badge variant="simulation">
				<Clock class="h-3 w-3 shrink-0" />
				<span>{$t('home.simulationBadge')}</span>
			</Badge>
		</div>

		<!-- Urban / Intercity Mode Toggle -->
		<div class="grid grid-cols-2 p-1 rounded-xl bg-secondary/80 border border-border/60">
			<button
				type="button"
				class="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer {activeTransportMode === 'urban'
					? 'bg-background text-foreground shadow-xs'
					: 'text-muted-foreground hover:text-foreground'}"
				onclick={() => (activeTransportMode = 'urban')}
			>
				<Map class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
				<span>{$t('home.urbanTab')}</span>
			</button>
			<button
				type="button"
				class="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer {activeTransportMode === 'intercity'
					? 'bg-background text-foreground shadow-xs'
					: 'text-muted-foreground hover:text-foreground'}"
				onclick={() => (activeTransportMode = 'intercity')}
			>
				<BusFront class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
				<span>{$t('home.intercityTab')}</span>
			</button>
		</div>
	</section>

	{#if activeTransportMode === 'urban'}
		<!-- Urban Transport Overview -->
		<section class="space-y-3">
			<Card class="border-emerald-600/30 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent">
				<CardHeader class="pb-2">
					<div class="flex items-center justify-between">
						<span class="text-xs font-medium text-emerald-700 dark:text-emerald-400">
							{$t('home.networkHub')}
						</span>
						<Badge variant="success">{$t('home.activeLines')}</Badge>
					</div>
					<CardTitle>{$t('home.interactiveCardTitle')}</CardTitle>
					<CardDescription>
						{$t('home.interactiveCardDesc')}
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-3">
					<div class="grid grid-cols-2 gap-2 text-xs">
						<div class="p-2.5 rounded-lg bg-secondary/60 border border-border/50">
							<span class="text-muted-foreground block text-[10px]">
								{$t('home.urbanStopsLabel')}
							</span>
							<span class="font-bold text-sm">{$t('home.urbanStopsVal')}</span>
						</div>
						<div class="p-2.5 rounded-lg bg-secondary/60 border border-border/50">
							<span class="text-muted-foreground block text-[10px]">
								{$t('home.busesLabel')}
							</span>
							<span class="font-bold text-sm">{$t('home.busesVal')}</span>
						</div>
					</div>

					<div class="flex gap-2">
						<Button variant="default" class="flex-1 gap-2" href="/urban">
							<Map class="h-4 w-4" />
							<span>{$t('home.openMapBtn')}</span>
						</Button>
						<Button variant="outline" class="gap-1.5" href="/lines">
							<Route class="h-4 w-4" />
							<span>{$t('home.browseLinesBtn')}</span>
						</Button>
					</div>
				</CardContent>
			</Card>

			<!-- Quick Lines Preview -->
			<div class="space-y-2">
				<div class="flex items-center justify-between px-1">
					<h2 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						{$t('home.frequentLines')}
					</h2>
					<a href="/lines" class="text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline">
						{$t('home.allLines')}
					</a>
				</div>

				<div class="space-y-1.5">
					{#each sampleRoutes as route}
						<a href="/urban" class="block">
							<div class="p-2.5 rounded-xl bg-card border border-border/80 hover:border-emerald-600/40 hover:bg-secondary/40 transition-all flex items-center justify-between text-xs">
								<div class="flex items-center gap-2.5">
									<span class="flex h-7 w-9 items-center justify-center rounded-md bg-emerald-700 font-bold text-xs text-white">
										{route.code}
									</span>
									<div>
										<span class="font-semibold block text-foreground">
											{route.nameEn}
										</span>
										<span class="text-[10px] text-muted-foreground">
											{route.stops} {$t('home.stopsCount')} • ~{route.freq} {$t('home.stopsCount')}
										</span>
									</div>
								</div>
								<Badge variant={route.statusKey === 'smooth' ? 'success' : 'warning'}>
									{$t(`home.${route.statusKey}`)}
								</Badge>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</section>
	{:else}
		<!-- Intercity Transport Overview -->
		<section class="space-y-3">
			<Card class="border-sky-600/30 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent">
				<CardHeader class="pb-2">
					<div class="flex items-center justify-between">
						<span class="text-xs font-medium text-sky-700 dark:text-sky-400">
							{$t('home.destinationsVal')}
						</span>
						<Badge variant="outline">{$t('home.destinationsLabel')}</Badge>
					</div>
					<CardTitle>{$t('home.intercityCardTitle')}</CardTitle>
					<CardDescription>
						{$t('home.intercityCardDesc')}
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-3">
					<div class="grid grid-cols-2 gap-2 text-xs">
						<div class="p-2.5 rounded-lg bg-secondary/60 border border-border/50">
							<span class="text-muted-foreground block text-[10px]">
								{$t('home.dailyDepartures')}
							</span>
							<span class="font-bold text-sm">{$t('home.dailyDeparturesVal')}</span>
						</div>
						<div class="p-2.5 rounded-lg bg-secondary/60 border border-border/50">
							<span class="text-muted-foreground block text-[10px]">
								{$t('home.destinationsLabel')}
							</span>
							<span class="font-bold text-sm">{$t('home.destinationsVal')}</span>
						</div>
					</div>

					<Button variant="default" class="w-full gap-2" href="/intercity">
						<BusFront class="h-4 w-4" />
						<span>{$t('home.searchTripsBtn')}</span>
					</Button>
				</CardContent>
			</Card>
		</section>
	{/if}
</div>
