<script>
	import { Route, Clock, ChevronRight } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { t, dir } from '$lib/i18n/index.js';

	const sampleRoutes = [
		{ code: 'L01', name: 'Tafourah ↔ Bab El Oued', stopsCount: 16, frequency: '6 min', status: 'Fluid' },
		{ code: 'L04', name: 'Place des Martyrs ↔ Tafourah', stopsCount: 14, frequency: '8 min', status: 'Fluid' },
		{ code: 'L12', name: 'Grande Poste ↔ Bab Ezzouar', stopsCount: 22, frequency: '12 min', status: 'Delay' },
		{ code: 'T01', name: 'Ruisseau ↔ Dergana (Tramway)', stopsCount: 38, frequency: '5 min', status: 'Fluid' }
	];
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<div>
		<h1 class="text-lg font-bold tracking-tight">{$t('linesPage.title')}</h1>
		<p class="text-xs text-muted-foreground">{$t('linesPage.subtitle')}</p>
	</div>

	<div class="space-y-2">
		{#each sampleRoutes as route}
			<a href="/urban" class="block">
				<Card class="p-3.5 hover:border-emerald-600/50 hover:bg-secondary/40 transition-all">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<span class="flex h-9 w-11 items-center justify-center rounded-lg bg-emerald-700 font-bold text-xs text-white shadow-xs">
								{route.code}
							</span>
							<div>
								<h3 class="text-xs font-semibold text-foreground">{route.name}</h3>
								<div class="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
									<span>{route.stopsCount} {$t('home.stopsCount')}</span>
									<span>•</span>
									<span class="flex items-center gap-0.5">
										<Clock class="h-2.5 w-2.5" />
										~{route.frequency}
									</span>
								</div>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<Badge variant={route.status === 'Fluid' ? 'success' : 'warning'}>
								{route.status}
							</Badge>
							<ChevronRight class="h-4 w-4 text-muted-foreground rtl:rotate-180 transition-transform" />
						</div>
					</div>
				</Card>
			</a>
		{/each}
	</div>
</div>
