<script>
	import { Building2, Bus, Calendar, Plus, Users, ArrowLeft, ShieldAlert } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let activeOperator = 'ETUSA (Entreprise de Transport Urbain et Suburbain d\'Alger)';
</script>

<div class="flex-1 flex flex-col p-4 sm:p-6 space-y-5">
	<!-- Company Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
		<div>
			<div class="flex items-center gap-2">
				<a href="/" class="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground">
					<ArrowLeft class="h-4 w-4" />
				</a>
				<h1 class="text-xl font-bold tracking-tight">Espace Entreprise & Chauffeur</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-0.5">
				Opérateur connecté : <strong class="text-foreground">{activeOperator}</strong>
			</p>
		</div>

		<div class="flex items-center gap-2">
			<Badge variant="simulation">Isolation Société (Périmètre Strict)</Badge>
			<Badge variant="outline">Rôle Démo</Badge>
		</div>
	</div>

	<!-- Demo Scoping Notice -->
	<div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
		<ShieldAlert class="h-4 w-4 shrink-0 mt-0.5" />
		<div>
			<strong class="block">Principe d'isolation des données d'entreprise</strong>
			<span>L'opérateur gère exclusivement son propre parc et ses horaires attribués. Les bus d'autres compagnies ne sont ni visibles en modification ni modifiables. Implémenté en détail dans la Phase 5.</span>
		</div>
	</div>

	<!-- Operator Fleet Overview Stats -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
		<Card class="p-4">
			<div class="flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Flotte Active</span>
				<Bus class="h-4 w-4 text-emerald-600" />
			</div>
			<div class="mt-2 text-2xl font-bold">12 Bus</div>
			<span class="text-[10px] text-emerald-600 font-medium">10 en ligne • 2 au dépôt</span>
		</Card>

		<Card class="p-4">
			<div class="flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Lignes Exploitées</span>
				<Calendar class="h-4 w-4 text-emerald-600" />
			</div>
			<div class="mt-2 text-2xl font-bold">4 Lignes</div>
			<span class="text-[10px] text-muted-foreground">L01, L04, L12, L18</span>
		</Card>

		<Card class="p-4">
			<div class="flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Chauffeurs Démo</span>
				<Users class="h-4 w-4 text-emerald-600" />
			</div>
			<div class="mt-2 text-2xl font-bold">16 Conducteurs</div>
			<span class="text-[10px] text-muted-foreground">Affectations actives</span>
		</Card>
	</div>

	<!-- Fleet Table Placeholder -->
	<Card>
		<CardHeader class="flex flex-row items-center justify-between pb-3">
			<div>
				<CardTitle class="text-base">Véhicules de la Société</CardTitle>
				<CardDescription>Affectation aux lignes et statut opérationnel simulé</CardDescription>
			</div>
			<Button variant="default" size="sm" class="gap-1.5 opacity-80 cursor-not-allowed">
				<Plus class="h-3.5 w-3.5" />
				<span>Ajouter un bus (Phase 5)</span>
			</Button>
		</CardHeader>
		<CardContent>
			<div class="space-y-2 text-xs">
				<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
					<div class="flex items-center gap-3">
						<span class="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs">
							BUS-16-042
						</span>
						<div>
							<h4 class="font-semibold text-foreground">Mercedes Citaro • Ligne L04</h4>
							<span class="text-muted-foreground text-[11px]">Chauffeur : A. Mansouri</span>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<Badge variant="success">En Trajet (Simulé)</Badge>
						<span class="text-muted-foreground text-[11px]">Prochain arrêt : Tafourah</span>
					</div>
				</div>

				<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
					<div class="flex items-center gap-3">
						<span class="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs">
							BUS-16-088
						</span>
						<div>
							<h4 class="font-semibold text-foreground">Van Hool A330 • Ligne L12</h4>
							<span class="text-muted-foreground text-[11px]">Chauffeur : M. Boudiaf</span>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<Badge variant="warning">Retard 5 min</Badge>
						<span class="text-muted-foreground text-[11px]">Prochain arrêt : El Harrach</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
</div>
