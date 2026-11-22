<script>
	import { Map, BusFront, Route, Ticket, ArrowRight, ShieldCheck, Clock, AlertTriangle, Compass } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let activeTransportMode = $state('urban'); // 'urban' | 'intercity'
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<!-- Hero / Welcome & Mode Switch -->
	<section class="space-y-3">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-xl font-bold tracking-tight text-foreground">
					SUTRAF Transport
				</h1>
				<p class="text-xs text-muted-foreground">
					Réseau de transport urbain & interwilayas en Algérie
				</p>
			</div>
			<Badge variant="simulation">
				<Clock class="h-3 w-3" />
				<span>Simulation</span>
			</Badge>
		</div>

		<!-- Urban / Intercity Mode Toggle -->
		<div class="grid grid-cols-2 p-1 rounded-xl bg-secondary/80 border border-border/60">
			<button
				type="button"
				class="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all {activeTransportMode === 'urban'
					? 'bg-background text-foreground shadow-xs'
					: 'text-muted-foreground hover:text-foreground'}"
				onclick={() => (activeTransportMode = 'urban')}
			>
				<Map class="h-3.5 w-3.5 text-emerald-600" />
				<span>Transport Urbain</span>
			</button>
			<button
				type="button"
				class="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all {activeTransportMode === 'intercity'
					? 'bg-background text-foreground shadow-xs'
					: 'text-muted-foreground hover:text-foreground'}"
				onclick={() => (activeTransportMode = 'intercity')}
			>
				<BusFront class="h-3.5 w-3.5 text-emerald-600" />
				<span>Inter-Wilayas</span>
			</button>
		</div>
	</section>

	{#if activeTransportMode === 'urban'}
		<!-- Urban Transport Overview -->
		<section class="space-y-3">
			<Card class="border-emerald-600/30 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent">
				<CardHeader class="pb-2">
					<div class="flex items-center justify-between">
						<span class="text-xs font-medium text-emerald-700 dark:text-emerald-400">Alger Métropole</span>
						<Badge variant="success">8 Lignes Actives</Badge>
					</div>
					<CardTitle>Carte Interactive & Lignes</CardTitle>
					<CardDescription>
						Suivi simulé des bus en temps estimé et arrêts urbains
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-3">
					<div class="grid grid-cols-2 gap-2 text-xs">
						<div class="p-2.5 rounded-lg bg-secondary/60 border border-border/50">
							<span class="text-muted-foreground block text-[10px]">Arrêts urbains</span>
							<span class="font-bold text-sm">64 Stations</span>
						</div>
						<div class="p-2.5 rounded-lg bg-secondary/60 border border-border/50">
							<span class="text-muted-foreground block text-[10px]">Bus en service</span>
							<span class="font-bold text-sm">18 Véhicules</span>
						</div>
					</div>

					<div class="flex gap-2">
						<Button variant="default" class="flex-1 gap-2" href="/urban">
							<Map class="h-4 w-4" />
							<span>Ouvrir la Carte</span>
						</Button>
						<Button variant="outline" class="gap-1.5" href="/lines">
							<Route class="h-4 w-4" />
							<span>Lignes</span>
						</Button>
					</div>
				</CardContent>
			</Card>

			<!-- Quick Lines Preview -->
			<div class="space-y-2">
				<div class="flex items-center justify-between px-1">
					<h2 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Lignes Fréquentes (Alger)
					</h2>
					<a href="/lines" class="text-xs text-emerald-700 dark:text-emerald-400 font-medium hover:underline">
						Voir tout
					</a>
				</div>

				<div class="space-y-2">
					<a href="/urban" class="block">
						<Card class="hover:border-emerald-600/40 hover:bg-secondary/30 transition-all p-3">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<span class="flex h-8 w-10 items-center justify-center rounded-md bg-amber-500 font-bold text-xs text-slate-950">
										L04
									</span>
									<div>
										<h3 class="text-xs font-semibold">Place des Martyrs ↔ Tafourah</h3>
										<span class="text-[10px] text-muted-foreground">Fréquence : ~8 min • 14 arrêts</span>
									</div>
								</div>
								<Badge variant="success">Fluide</Badge>
							</div>
						</Card>
					</a>

					<a href="/urban" class="block">
						<Card class="hover:border-emerald-600/40 hover:bg-secondary/30 transition-all p-3">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<span class="flex h-8 w-10 items-center justify-center rounded-md bg-emerald-600 font-bold text-xs text-white">
										L12
									</span>
									<div>
										<h3 class="text-xs font-semibold">Grande Poste ↔ Bab Ezzouar</h3>
										<span class="text-[10px] text-muted-foreground">Fréquence : ~12 min • 22 arrêts</span>
									</div>
								</div>
								<Badge variant="warning">Retard 5m</Badge>
							</div>
						</Card>
					</a>
				</div>
			</div>
		</section>
	{:else}
		<!-- Intercity Transport Section -->
		<section class="space-y-3">
			<Card class="border-sky-600/30 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent">
				<CardHeader class="pb-2">
					<div class="flex items-center justify-between">
						<span class="text-xs font-medium text-sky-700 dark:text-sky-400">Voyages Interwilayas</span>
						<Badge variant="simulation">58 Wilayas</Badge>
					</div>
					<CardTitle>Recherche d'Itinéraires</CardTitle>
					<CardDescription>
						Consultez les départs, transporteurs agréés et tarifs indicatifs
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-3">
					<div class="space-y-2">
						<div class="p-2.5 rounded-lg bg-secondary/60 border border-border/50 text-xs flex items-center justify-between">
							<span class="text-muted-foreground">Origine :</span>
							<span class="font-semibold">16 - Alger (Caroubier)</span>
						</div>
						<div class="p-2.5 rounded-lg bg-secondary/60 border border-border/50 text-xs flex items-center justify-between">
							<span class="text-muted-foreground">Destination :</span>
							<span class="font-semibold">31 - Oran (El Bahia)</span>
						</div>
					</div>

					<Button variant="default" class="w-full gap-2" href="/intercity">
						<BusFront class="h-4 w-4" />
						<span>Rechercher les Trajets</span>
					</Button>
				</CardContent>
			</Card>
		</section>
	{/if}

	<!-- Tickets & Demonstrative Pass Card -->
	<section class="space-y-2">
		<a href="/tickets" class="block">
			<Card class="p-3 bg-secondary/40 hover:bg-secondary/70 transition-all border-dashed">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700/10 text-emerald-700 dark:text-emerald-400">
							<Ticket class="h-5 w-5" />
						</div>
						<div>
							<h3 class="text-xs font-semibold">Titres & Abonnements Démo</h3>
							<p class="text-[10px] text-muted-foreground">Consultez les pass urbains et billets de démonstration</p>
						</div>
					</div>
					<ArrowRight class="h-4 w-4 text-muted-foreground" />
				</div>
			</Card>
		</a>
	</section>

	<!-- Demonstration Disclosure Footer -->
	<footer class="mt-auto pt-4 border-t border-border/60 text-center space-y-1">
		<p class="text-[10px] text-muted-foreground">
			SUTRAF • Projet pédagogique et de présentation frontend.
		</p>
		<p class="text-[10px] text-muted-foreground font-mono">
			Données simulées et indicatives. Aucune opération réelle.
		</p>
	</footer>
</div>
