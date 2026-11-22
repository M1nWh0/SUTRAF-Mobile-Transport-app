<script>
	import { X, Clock, MapPin, BusFront, AlertTriangle, ChevronRight } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t, locale } from '$lib/i18n/index.js';
	import {
		getRouteStops,
		getRouteBuses,
		calculateTotalRouteDuration,
		getRouteOperationalStatus,
		getCompanyById
	} from '$lib/services/index.js';

	let {
		route = null,
		onClose = () => {},
		onSelectStop = () => {},
		onSelectBus = () => {}
	} = $props();

	let routeStops = $derived(route ? getRouteStops(route.id) : []);
	let routeBuses = $derived(route ? getRouteBuses(route.id) : []);
	let totalDuration = $derived(route ? calculateTotalRouteDuration(route.id) : 0);
	let opStatus = $derived(route ? getRouteOperationalStatus(route.id) : null);
	let company = $derived(route ? getCompanyById(route.companyId) : null);
</script>

{#if route}
	<Card class="p-4 shadow-lg border-primary/30 bg-background/95 backdrop-blur transition-all animate-in fade-in slide-in-from-bottom-2 duration-200">
		<!-- Header -->
		<div class="flex items-start justify-between gap-2 border-b border-border/60 pb-3">
			<div class="flex items-center gap-2.5">
				<span
					class="flex h-9 w-12 items-center justify-center rounded-lg font-bold text-xs text-white shadow-xs shrink-0"
					style="background-color: {route.color || '#059669'}"
				>
					{route.code}
				</span>
				<div>
					<div class="flex items-center gap-1.5 flex-wrap">
						<span class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
							{$t('urbanPage.selectedRoute')}
						</span>
						{#if company}
							<span class="text-[10px] text-muted-foreground">• {company.shortName || company.name}</span>
						{/if}
					</div>
					<h3 class="text-sm font-bold text-foreground leading-snug">
						{$locale === 'ar' ? route.nameArabic : route.name}
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

		<!-- Status & Metrics Strip -->
		<div class="grid grid-cols-3 gap-2 py-2.5 border-b border-border/60 text-xs">
			<div class="p-2 rounded-lg bg-secondary/50 text-center">
				<span class="text-[10px] text-muted-foreground block">
					{$t('urbanPage.frequency')}
				</span>
				<span class="font-bold text-foreground">{route.frequencyMinutes} {$t('urbanPage.min')}</span>
			</div>
			<div class="p-2 rounded-lg bg-secondary/50 text-center">
				<span class="text-[10px] text-muted-foreground block">
					{$t('urbanPage.estimatedDuration')}
				</span>
				<span class="font-bold text-foreground flex items-center justify-center gap-1">
					<Clock class="h-3 w-3 text-muted-foreground" />
					~{totalDuration} {$t('urbanPage.min')}
				</span>
			</div>
			<div class="p-2 rounded-lg bg-secondary/50 text-center">
				<span class="text-[10px] text-muted-foreground block">
					{$t('urbanPage.busStatus')}
				</span>
				<Badge
					variant={opStatus?.statusKey === 'smooth' ? 'success' : 'warning'}
					class="text-[10px] px-1.5 py-0 mt-0.5"
				>
					{$t(`home.${opStatus?.statusKey || 'smooth'}`)}
				</Badge>
			</div>
		</div>

		<!-- Ordered Stops Sequence -->
		<div class="py-3 space-y-2 border-b border-border/60">
			<div class="flex items-center justify-between">
				<h4 class="text-xs font-semibold text-foreground flex items-center gap-1.5">
					<MapPin class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
					<span>{$t('urbanPage.orderedStops')}</span>
				</h4>
				<span class="text-[10px] text-muted-foreground font-mono">{routeStops.length} stops</span>
			</div>

			<div class="flex flex-col space-y-1 max-h-40 overflow-y-auto pr-1">
				{#each routeStops as stop, idx}
					<button
						type="button"
						class="flex items-center justify-between p-1.5 rounded-lg text-xs hover:bg-secondary text-start transition-colors cursor-pointer group"
						onclick={() => onSelectStop(stop.id)}
					>
						<div class="flex items-center gap-2 min-w-0">
							<span class="flex h-5 w-5 items-center justify-center rounded-full bg-secondary-foreground/10 text-muted-foreground text-[10px] font-bold shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
								{idx + 1}
							</span>
							<span class="truncate font-medium text-foreground">
								{$locale === 'ar' ? stop.nameArabic : stop.name}
							</span>
							{#if stop.type === 'station'}
								<span class="text-[9px] px-1 py-0.2 rounded bg-primary/10 text-primary font-medium shrink-0">
									Station
								</span>
							{/if}
						</div>
						<ChevronRight class="h-3.5 w-3.5 text-muted-foreground rtl:rotate-180 group-hover:text-foreground shrink-0" />
					</button>
				{/each}
			</div>
		</div>

		<!-- Buses on this Route -->
		<div class="pt-3 space-y-2">
			<div class="flex items-center justify-between">
				<h4 class="text-xs font-semibold text-foreground flex items-center gap-1.5">
					<BusFront class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
					<span>{$t('urbanPage.busesOnRoute')}</span>
				</h4>
				<span class="text-[10px] text-muted-foreground font-mono">{routeBuses.length}</span>
			</div>

			{#if routeBuses.length === 0}
				<p class="text-[11px] text-muted-foreground italic">
					{$t('urbanPage.noBusesOnRoute')}
				</p>
			{:else}
				<div class="grid grid-cols-2 gap-2">
					{#each routeBuses as bus}
						<button
							type="button"
							class="flex items-center justify-between p-2 rounded-lg bg-secondary/40 border border-border/50 hover:bg-secondary text-start text-xs transition-colors cursor-pointer group"
							onclick={() => onSelectBus(bus.id)}
						>
							<div class="min-w-0">
								<span class="font-bold text-foreground block truncate">{bus.label}</span>
								<span class="text-[10px] text-muted-foreground block truncate">{bus.model}</span>
							</div>
							<Badge
								variant={bus.status === 'delayed' ? 'warning' : bus.status === 'en_route' ? 'success' : 'outline'}
								class="text-[9px] px-1 py-0 shrink-0"
							>
								{bus.status === 'delayed' ? 'Delay' : bus.status === 'en_route' ? 'En Route' : 'Depot'}
							</Badge>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</Card>
{/if}
