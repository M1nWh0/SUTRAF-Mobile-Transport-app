<script>
	import { X, BusFront, Route, User, ShieldAlert, CheckCircle2, Clock, AlertTriangle } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { t, locale } from '$lib/i18n/index.js';
	import {
		getUrbanRouteById,
		getCompanyById,
		getDemoUser
	} from '$lib/services/index.js';

	let {
		bus = null,
		onClose = () => {},
		onSelectRoute = () => {}
	} = $props();

	let route = $derived(bus?.routeId ? getUrbanRouteById(bus.routeId) : null);
	let company = $derived(bus?.companyId ? getCompanyById(bus.companyId) : null);
	let driver = $derived(bus?.driverId ? getDemoUser(bus.driverId) : null);
</script>

{#if bus}
	<Card class="p-4 shadow-lg border-primary/30 bg-background/95 backdrop-blur transition-all animate-in fade-in slide-in-from-bottom-2 duration-200">
		<!-- Header -->
		<div class="flex items-start justify-between gap-2 border-b border-border/60 pb-3">
			<div class="flex items-center gap-2.5">
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
					<BusFront class="h-6 w-6" />
				</div>
				<div>
					<div class="flex items-center gap-1.5 flex-wrap">
						<span class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
							{$t('urbanPage.selectedBus')}
						</span>
						<span class="text-[10px] text-muted-foreground font-mono">
							[{bus.currentPosition.join(', ')}]
						</span>
					</div>
					<h3 class="text-base font-bold text-foreground leading-snug">
						{bus.label}
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

		<!-- Status & Spec Grid -->
		<div class="grid grid-cols-2 gap-2 py-3 border-b border-border/60 text-xs">
			<div class="p-2.5 rounded-lg bg-secondary/40 space-y-1">
				<span class="text-[10px] text-muted-foreground block">
					{$t('urbanPage.busStatus')}
				</span>
				<div class="flex items-center gap-1.5">
					{#if bus.status === 'delayed'}
						<AlertTriangle class="h-4 w-4 text-amber-500 shrink-0" />
						<span class="font-bold text-amber-600 dark:text-amber-400">{$t('urbanPage.statusDelayed')}</span>
					{:else if bus.status === 'en_route'}
						<CheckCircle2 class="h-4 w-4 text-emerald-600 shrink-0" />
						<span class="font-bold text-emerald-600 dark:text-emerald-400">{$t('urbanPage.statusEnRoute')}</span>
					{:else}
						<Clock class="h-4 w-4 text-muted-foreground shrink-0" />
						<span class="font-medium text-muted-foreground">{$t('urbanPage.statusAtDepot')}</span>
					{/if}
				</div>
			</div>

			<div class="p-2.5 rounded-lg bg-secondary/40 space-y-1">
				<span class="text-[10px] text-muted-foreground block">
					{$t('urbanPage.busCapacity')}
				</span>
				<span class="font-bold text-foreground">
					{bus.capacity} {$t('urbanPage.passengers')}
				</span>
			</div>
		</div>

		<!-- Assigned Route & Vehicle Details -->
		<div class="py-3 space-y-2 border-b border-border/60 text-xs">
			<div class="flex items-center justify-between">
				<span class="text-muted-foreground">{$t('urbanPage.busModel')}:</span>
				<span class="font-semibold text-foreground">{bus.model}</span>
			</div>

			<div class="flex items-center justify-between">
				<span class="text-muted-foreground">{$t('urbanPage.operator')}:</span>
				<span class="font-semibold text-foreground">{company?.name || 'ETUSA'}</span>
			</div>

			<div class="flex items-center justify-between">
				<span class="text-muted-foreground">{$t('urbanPage.assignedDriver')}:</span>
				<div class="flex items-center gap-1 font-medium text-foreground">
					<User class="h-3 w-3 text-muted-foreground" />
					<span>{driver?.name || $t('urbanPage.unassigned')}</span>
				</div>
			</div>
		</div>

		<!-- Assigned Route Action -->
		<div class="pt-3">
			{#if route}
				<div class="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border/50">
					<div class="min-w-0 pr-2">
						<span class="text-[10px] text-muted-foreground block">Assigned Line:</span>
						<span class="text-xs font-bold text-foreground block truncate">
							{$locale === 'ar' ? route.nameArabic : route.name}
						</span>
					</div>
					<button
						type="button"
						class="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold text-white shrink-0 cursor-pointer shadow-xs transition-opacity hover:opacity-90"
						style="background-color: {route.color || '#059669'}"
						onclick={() => onSelectRoute(route.id)}
					>
						<span>{route.code}</span>
						<Route class="h-3.5 w-3.5" />
					</button>
				</div>
			{:else}
				<div class="p-2 text-xs text-muted-foreground italic text-center">
					<span>Vehicle currently unassigned to an active route.</span>
				</div>
			{/if}
		</div>
	</Card>
{/if}
