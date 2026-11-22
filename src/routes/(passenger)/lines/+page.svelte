<script>
	import { Route, Clock, MapPin, ChevronRight } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	const sampleRoutes = [
		{
			code: 'L01',
			name: 'Tafourah ↔ Bab El Oued',
			badge: 'bus',
			stopsCount: 16,
			frequency: '6 min',
			status: 'Fluide'
		},
		{
			code: 'L04',
			name: 'Place des Martyrs ↔ Gare Tafourah',
			badge: 'bus',
			stopsCount: 14,
			frequency: '8 min',
			status: 'Fluide'
		},
		{
			code: 'L12',
			name: 'Grande Poste ↔ Bab Ezzouar (Université)',
			badge: 'bus',
			stopsCount: 22,
			frequency: '12 min',
			status: 'Ralentissement'
		},
		{
			code: 'T01',
			name: 'Ruisseau ↔ Dergana (Tramway)',
			badge: 'outline',
			stopsCount: 38,
			frequency: '5 min',
			status: 'Fluide'
		}
	];
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<div>
		<h1 class="text-lg font-bold tracking-tight">Lignes Urbaines</h1>
		<p class="text-xs text-muted-foreground">Catalogue des lignes d'Alger et itinéraires détaillés</p>
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
									<span>{route.stopsCount} arrêts</span>
									<span>•</span>
									<span class="flex items-center gap-0.5">
										<Clock class="h-2.5 w-2.5" />
										~{route.frequency}
									</span>
								</div>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<Badge variant={route.status === 'Fluide' ? 'success' : 'warning'}>
								{route.status}
							</Badge>
							<ChevronRight class="h-4 w-4 text-muted-foreground" />
						</div>
					</div>
				</Card>
			</a>
		{/each}
	</div>
</div>
