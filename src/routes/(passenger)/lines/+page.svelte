<script>
	import { Route, Clock, ChevronRight } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { t, locale } from '$lib/i18n/index.js';
	import {
		activeCity,
		activeCityId,
		getUrbanRoutes,
		calculateTotalRouteDuration,
		getRouteOperationalStatus
	} from '$lib/services/index.js';

	let urbanRoutes = $derived(getUrbanRoutes($activeCityId));
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<div>
		<h1 class="text-lg font-bold tracking-tight">{$t('linesPage.title')}</h1>
		<p class="text-xs text-muted-foreground">
			{$locale === 'ar' ? $activeCity?.nameArabic : $activeCity?.name} • {$t('linesPage.subtitle')}
		</p>
	</div>

	<div class="space-y-2">
		{#if urbanRoutes.length === 0}
			<div class="p-6 rounded-xl bg-secondary/30 border border-dashed border-border text-center text-xs text-muted-foreground">
				{$t('urbanPage.noRoutesCity')}
			</div>
		{:else}
			{#each urbanRoutes as route}
				{@const totalDuration = calculateTotalRouteDuration(route.id)}
				{@const opStatus = getRouteOperationalStatus(route.id)}
				<a href="/urban?route={route.id}" class="block">
					<Card class="p-3.5 hover:border-emerald-600/50 hover:bg-secondary/40 transition-all">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3">
								<span
									class="flex h-9 w-11 items-center justify-center rounded-lg font-bold text-xs text-white shadow-xs"
									style="background-color: {route.color || '#059669'}"
								>
									{route.code}
								</span>
								<div>
									<h3 class="text-xs font-semibold text-foreground">
										{$locale === 'ar' ? route.nameArabic : route.name}
									</h3>
									<div class="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
										<span>{route.stopIds.length} {$t('home.stopsCount')}</span>
										<span>•</span>
										<span class="flex items-center gap-0.5">
											<Clock class="h-2.5 w-2.5" />
											~{totalDuration} {$t('urbanPage.min')}
										</span>
									</div>
								</div>
							</div>
							<div class="flex items-center gap-2">
								<Badge variant={opStatus.statusKey === 'smooth' ? 'success' : 'warning'}>
									{$t(`home.${opStatus.statusKey}`)}
								</Badge>
								<ChevronRight class="h-4 w-4 text-muted-foreground rtl:rotate-180 transition-transform" />
							</div>
						</div>
					</Card>
				</a>
			{/each}
		{/if}
	</div>
</div>
