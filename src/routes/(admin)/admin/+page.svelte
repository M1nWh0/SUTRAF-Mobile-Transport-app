<script>
	import { Shield, Database, MapPin, Route, Bus, AlertTriangle, ArrowLeft, Activity } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<div class="flex-1 flex flex-col p-4 sm:p-6 space-y-5">
	<!-- Admin Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
		<div>
			<div class="flex items-center gap-2">
				<a href="/" class="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground">
					<ArrowLeft class="h-4 w-4" />
				</a>
				<h1 class="text-xl font-bold tracking-tight">Administration Globale SUTRAF</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-0.5">
				Supervision de l'ensemble du réseau, wilayas, opérateurs et incidents
			</p>
		</div>

		<div class="flex items-center gap-2">
			<Badge variant="destructive">Accès Administrateur Global</Badge>
			<Badge variant="simulation">Simulation Active</Badge>
		</div>
	</div>

	<!-- System Overview Grid -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
		<Card class="p-3.5">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>Wilayas & Villes</span>
				<MapPin class="h-4 w-4 text-emerald-600" />
			</div>
			<div class="mt-2 text-xl font-bold">58 Wilayas</div>
			<span class="text-[10px] text-muted-foreground">3 Villes urbaines modélisées</span>
		</Card>

		<Card class="p-3.5">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>Lignes & Tracés</span>
				<Route class="h-4 w-4 text-emerald-600" />
			</div>
			<div class="mt-2 text-xl font-bold">24 Lignes</div>
			<span class="text-[10px] text-muted-foreground">Tracés GeoJSON & Arrêts</span>
		</Card>

		<Card class="p-3.5">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>Flottes Totales</span>
				<Bus class="h-4 w-4 text-emerald-600" />
			</div>
			<div class="mt-2 text-xl font-bold">48 Véhicules</div>
			<span class="text-[10px] text-muted-foreground">Toutes compagnies confondues</span>
		</Card>

		<Card class="p-3.5">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>Incidents Actifs</span>
				<AlertTriangle class="h-4 w-4 text-amber-600" />
			</div>
			<div class="mt-2 text-xl font-bold">2 Signalements</div>
			<span class="text-[10px] text-amber-600 font-medium">+5 à +15 min retards calculés</span>
		</Card>
	</div>

	<!-- Management Sections -->
	<Card>
		<CardHeader>
			<CardTitle class="text-base">Modules de Gestion des Données (Phase 6)</CardTitle>
			<CardDescription>
				Gestion des données mock en mémoire avec mise à jour réactive des simulations
			</CardDescription>
		</CardHeader>
		<CardContent class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
			<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 space-y-1">
				<span class="font-semibold block text-foreground">Villes & Wilayas</span>
				<p class="text-muted-foreground text-[11px]">Gestion des centres géographiques et wilayas de départ/arrivée.</p>
			</div>
			<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 space-y-1">
				<span class="font-semibold block text-foreground">Lignes & Arrêts Urbains</span>
				<p class="text-muted-foreground text-[11px]">Édition des séquences d'arrêts et des coordonnées GeoJSON.</p>
			</div>
			<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 space-y-1">
				<span class="font-semibold block text-foreground">Compagnies de Transport</span>
				<p class="text-muted-foreground text-[11px]">Gestion des opérateurs conventionnés (ETUSA, SOGRAL, etc.).</p>
			</div>
			<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 space-y-1">
				<span class="font-semibold block text-foreground">Incidents & Ralentissements</span>
				<p class="text-muted-foreground text-[11px]">Injection de délais déterminés affectant le calcul d'ETA.</p>
			</div>
		</CardContent>
	</Card>
</div>
