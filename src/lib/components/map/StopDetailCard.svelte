<script>
	import { X, MapPin, Route, Clock, ShieldCheck, Sun, Building2 } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { t, locale } from '$lib/i18n/index.js';
	import {
		getRoutesByStopId,
		getRouteBuses,
		estimateBusArrivalMinutes
	} from '$lib/services/index.js';

	let {
		stop = null,
		onClose = () => {},
		onSelectRoute = () => {}
	} = $props();

	let servedRoutes = $derived(stop ? getRoutesByStopId(stop.id) : []);

	// Deterministic arrival estimates for buses approaching this stop
	let simulatedArrivals = $derived.by(() => {
		if (!stop || servedRoutes.length === 0) return [];
		const list = [];

		for (const route of servedRoutes) {
			const routeBuses = getRouteBuses(route.id);
			for (const bus of routeBuses) {
				const est = estimateBusArrivalMinutes(bus.id, stop.id);
				if (est !== null) {
					list.push({
						bus,
						route,
						minutes: est
					});
				}
			}
		}

		// Sort by earliest arrival
		return list.sort((a, b) => a.minutes - b.minutes);
	});
</script>

{#if stop}
	<Card class="p-4 shadow-lg border-emerald-600/30 bg-background/95 backdrop-blur transition-all animate-in fade-in slide-in-from-bottom-2 duration-200">
		<!-- Header -->
		<div class="flex items-start justify-between gap-2 border-b border-border/60 pb-3">
			<div class="flex items-center gap-2.5">
				<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 shrink-0">
					{#if stop.type === 'station'}
						<Building2 class="h-5 w-5" />
					{:else}
						<MapPin class="h-5 w-5" />
					{/if}
				</div>
				<div>
					<div class="flex items-center gap-1.5 flex-wrap">
						<span class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
							{$t('urbanPage.selectedStop')}
						</span>
						<span class="text-[10px] text-muted-foreground font-mono">
							[{stop.coordinates.join(', ')}]
						</span>
					</div>
					<h3 class="text-sm font-bold text-foreground leading-snug">
						{$locale === 'ar' ? stop.nameArabic : stop.name}
					</h3>
				</div>
			</div>
			<button
				type="button"
				class="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
				aria-label={$t('urbanPage.close')}
				onclick={onClose}
			>
				<X class="h-4 w-4" />
			</button>
		</div>

		<!-- Attributes Pill Strip -->
		<div class="flex items-center gap-2 py-2.5 border-b border-border/60 text-xs flex-wrap">
			<Badge variant={stop.type === 'station' ? 'default' : 'secondary'}>
				{stop.type === 'station' ? $t('urbanPage.stopTypeStation') : $t('urbanPage.stopTypeStop')}
			</Badge>
			<Badge variant="outline" class="gap-1">
				{#if stop.hasShelter}
					<ShieldCheck class="h-3 w-3 text-emerald-600" />
					<span>{$t('urbanPage.shelter')}</span>
				{:else}
					<Sun class="h-3 w-3 text-amber-500" />
					<span>{$t('urbanPage.noShelter')}</span>
				{/if}
			</Badge>
			<Badge variant="outline" class="font-mono text-[10px]">
				{servedRoutes.length} {$t('urbanPage.activeLinesCount')}
			</Badge>
		</div>

		<!-- Served Transit Lines -->
		<div class="py-3 space-y-2 border-b border-border/60">
			<h4 class="text-xs font-semibold text-foreground flex items-center gap-1.5">
				<Route class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
				<span>{$t('urbanPage.servedRoutes')}</span>
			</h4>
			<div class="flex flex-wrap gap-2">
				{#each servedRoutes as route}
					<button
						type="button"
						class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/60 bg-secondary/40 hover:bg-secondary text-xs transition-colors cursor-pointer group"
						onclick={() => onSelectRoute(route.id)}
					>
						<span
							class="px-1.5 py-0.2 rounded font-bold text-white text-[10px]"
							style="background-color: {route.color || '#059669'}"
						>
							{route.code}
						</span>
						<span class="font-medium text-foreground text-[11px] group-hover:text-emerald-600 transition-colors">
							{$locale === 'ar' ? route.nameArabic : route.name}
						</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Upcoming Simulated Arrivals -->
		<div class="pt-3 space-y-2">
			<div class="flex items-center justify-between">
				<h4 class="text-xs font-semibold text-foreground flex items-center gap-1.5">
					<Clock class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
					<span>{$t('urbanPage.upcomingArrivals')}</span>
				</h4>
				<Badge variant="simulation" class="text-[9px]">Simulation</Badge>
			</div>

			{#if simulatedArrivals.length === 0}
				<div class="p-2.5 rounded-lg bg-secondary/30 text-xs text-muted-foreground text-center">
					<span>Estimated next arrivals every {servedRoutes[0]?.frequencyMinutes || 10} {$t('urbanPage.min')}</span>
				</div>
			{:else}
				<div class="space-y-1.5">
					{#each simulatedArrivals as item}
						<div class="flex items-center justify-between p-2 rounded-lg bg-secondary/40 border border-border/40 text-xs">
							<div class="flex items-center gap-2">
								<span
									class="px-1.5 py-0.2 rounded font-bold text-white text-[10px]"
									style="background-color: {item.route.color || '#059669'}"
								>
									{item.route.code}
								</span>
								<span class="font-mono text-muted-foreground text-[11px]">{item.bus.label}</span>
							</div>
							<div class="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
								<span>~{item.minutes}</span>
								<span class="text-[10px] font-normal text-muted-foreground">{$t('urbanPage.min')}</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</Card>
{/if}
