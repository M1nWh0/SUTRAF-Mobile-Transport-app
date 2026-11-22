<script>
	import { User, Globe, Moon, Shield, Info, MapPin } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<div>
		<h1 class="text-lg font-bold tracking-tight">Profil & Préférences</h1>
		<p class="text-xs text-muted-foreground">Paramètres de démonstration et compte passager</p>
	</div>

	<!-- Demo User Summary -->
	<Card class="p-4">
		<div class="flex items-center gap-3">
			<div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700/10 text-emerald-700 dark:text-emerald-400 font-bold text-base">
				KB
			</div>
			<div>
				<h2 class="text-sm font-semibold">Karim Benali (Passager Démo)</h2>
				<span class="text-xs text-muted-foreground">karim.demo@sutraf.dz</span>
				<div class="mt-1">
					<Badge variant="outline">Rôle Actif : Passager</Badge>
				</div>
			</div>
		</div>
	</Card>

	<!-- Settings Placeholders (Phase 2 Preview) -->
	<Card>
		<CardHeader class="pb-2">
			<CardTitle class="text-sm">Préférences de l'application</CardTitle>
		</CardHeader>
		<CardContent class="space-y-3 text-xs">
			<div class="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border/50">
				<div class="flex items-center gap-2">
					<Globe class="h-4 w-4 text-emerald-600" />
					<span>Langue de l'interface (Phase 2)</span>
				</div>
				<Badge variant="outline">العربية / English</Badge>
			</div>

			<div class="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border/50">
				<div class="flex items-center gap-2">
					<Moon class="h-4 w-4 text-emerald-600" />
					<span>Thème d'affichage (Phase 2)</span>
				</div>
				<Badge variant="outline">Système / Sombre / Clair</Badge>
			</div>

			<div class="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border/50">
				<div class="flex items-center gap-2">
					<MapPin class="h-4 w-4 text-emerald-600" />
					<span>Ville sélectionnée</span>
				</div>
				<Badge variant="outline">Alger (16)</Badge>
			</div>
		</CardContent>
	</Card>

	<!-- Roles Switcher Notice -->
	<div class="p-3 rounded-xl bg-slate-900 text-slate-300 text-xs space-y-2">
		<div class="flex items-center gap-2 text-white font-semibold">
			<Shield class="h-4 w-4 text-emerald-400" />
			<span>Rôles de démonstration SUTRAF</span>
		</div>
		<p class="text-[11px] leading-relaxed">
			Cette application propose 3 perspectives distinctes : Passager, Entreprise/Chauffeur et Administrateur Global. Utilisez la bannière en haut pour basculer.
		</p>
	</div>
</div>
