<script>
	import { Map, Layers, Navigation, Info, Clock, AlertCircle } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-lg font-bold tracking-tight">Carte Urbaine</h1>
			<p class="text-xs text-muted-foreground">Alger Centre • Suivi simulé des lignes et arrêts</p>
		</div>
		<Badge variant="simulation">Phase 4 Prévue</Badge>
	</div>

	<!-- Map Viewport Placeholder -->
	<div class="relative w-full h-72 sm:h-96 rounded-xl border border-border bg-slate-100 dark:bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-3 shadow-inner">
		<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700/10 text-emerald-700 dark:text-emerald-400">
			<Map class="h-8 w-8" />
		</div>
		<div class="max-w-xs space-y-1">
			<h2 class="text-sm font-semibold text-foreground">Intégration MapLibre GL JS</h2>
			<p class="text-xs text-muted-foreground">
				Le rendu cartographique vectoriel avec les tuiles OpenStreetMap, les tracés GeoJSON et les bus simulés sera activé dans la Phase 4.
			</p>
		</div>
		<div class="flex items-center gap-2 pt-2">
			<Badge variant="outline">Centre: [3.0588, 36.7538]</Badge>
			<Badge variant="success">Attribution OSM</Badge>
		</div>
	</div>

	<!-- Stops & Routes Quick Drawer Placeholder -->
	<Card class="p-3">
		<div class="flex items-center justify-between mb-2">
			<h3 class="text-xs font-semibold">Lignes disponibles sur cette zone</h3>
			<span class="text-[11px] text-muted-foreground">3 lignes actives</span>
		</div>
		<div class="space-y-2">
			<div class="p-2 rounded-lg bg-secondary/50 border border-border/40 flex items-center justify-between text-xs">
				<div class="flex items-center gap-2">
					<span class="px-2 py-0.5 rounded bg-amber-500 font-bold text-slate-950 text-[11px]">L04</span>
					<span>Place des Martyrs ↔ Tafourah</span>
				</div>
				<span class="text-emerald-600 font-medium">Prochain bus ~4 min</span>
			</div>
			<div class="p-2 rounded-lg bg-secondary/50 border border-border/40 flex items-center justify-between text-xs">
				<div class="flex items-center gap-2">
					<span class="px-2 py-0.5 rounded bg-emerald-600 font-bold text-white text-[11px]">L12</span>
					<span>Grande Poste ↔ Bab Ezzouar</span>
				</div>
				<span class="text-amber-600 font-medium">Prochain bus ~9 min</span>
			</div>
		</div>
	</Card>
</div>
