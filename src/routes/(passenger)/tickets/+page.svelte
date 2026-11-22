<script>
	import { Ticket, QrCode, CreditCard, CheckCircle2, AlertCircle } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let activeTab = $state('subscription'); // 'subscription' | 'tickets'
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<div>
		<h1 class="text-lg font-bold tracking-tight">Titres & Abonnements</h1>
		<p class="text-xs text-muted-foreground">Espace démonstration pour pass urbains et billets</p>
	</div>

	<!-- Demo Disclaimer Alert -->
	<div class="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300">
		<AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
		<div>
			<span class="font-semibold block">Affichage de démonstration</span>
			<span>Cette section simule des pass de voyage. Aucun paiement réel, émission bancaire ou validation QR de billetterie n'est intégré.</span>
		</div>
	</div>

	<!-- Pass Card Sample -->
	<Card class="bg-gradient-to-br from-emerald-800 to-slate-900 text-white border-0 shadow-lg p-5 space-y-4">
		<div class="flex items-center justify-between">
			<span class="text-xs font-semibold tracking-wider uppercase text-emerald-200">Pass Urbain SUTRAF</span>
			<Badge variant="outline" class="text-white border-white/30 bg-white/10">Actif Démo</Badge>
		</div>

		<div class="space-y-1">
			<h2 class="text-lg font-bold">Abonnement Mensuel Réseau Alger</h2>
			<p class="text-xs text-slate-300">Validité : 01 Nov 2026 au 30 Nov 2026</p>
		</div>

		<div class="flex items-center justify-between pt-2 border-t border-white/20">
			<div class="text-xs">
				<span class="block text-slate-400 text-[10px]">Titulaire</span>
				<span class="font-medium">Karim Benali (Démo)</span>
			</div>
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 border border-white/20">
				<QrCode class="h-6 w-6 text-white" />
			</div>
		</div>
	</Card>

	<!-- Intercity Ticket Sample -->
	<Card class="p-4 space-y-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Ticket class="h-4 w-4 text-emerald-600" />
				<h3 class="text-xs font-bold">Billet Interwilayas Démo</h3>
			</div>
			<Badge variant="outline">#DZ-2026-8819</Badge>
		</div>

		<div class="grid grid-cols-2 gap-2 text-xs border-y border-border/50 py-2.5">
			<div>
				<span class="text-[10px] text-muted-foreground block">Trajet</span>
				<span class="font-semibold">Alger → Oran</span>
			</div>
			<div>
				<span class="text-[10px] text-muted-foreground block">Départ</span>
				<span class="font-semibold">25 Nov 2026 - 07:30</span>
			</div>
		</div>

		<div class="flex items-center justify-between text-xs">
			<span class="text-muted-foreground">Siège réservé : <strong class="text-foreground">N° 14</strong></span>
			<span class="font-bold text-emerald-700 dark:text-emerald-400">1 200 DZD</span>
		</div>
	</Card>
</div>
