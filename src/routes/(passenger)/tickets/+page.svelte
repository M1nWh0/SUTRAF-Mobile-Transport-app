<script>
	import { Ticket, QrCode, AlertCircle } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { t } from '$lib/i18n/index.js';
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<div>
		<h1 class="text-lg font-bold tracking-tight">{$t('ticketsPage.title')}</h1>
		<p class="text-xs text-muted-foreground">{$t('ticketsPage.subtitle')}</p>
	</div>

	<!-- Demo Disclaimer Alert -->
	<div class="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300">
		<AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
		<div>
			<span class="font-semibold block">{$t('ticketsPage.demoNoticeTitle')}</span>
			<span>{$t('ticketsPage.demoNoticeDesc')}</span>
		</div>
	</div>

	<!-- Pass Card Sample -->
	<Card class="bg-gradient-to-br from-emerald-800 to-slate-900 text-white border-0 shadow-lg p-5 space-y-4">
		<div class="flex items-center justify-between">
			<span class="text-xs font-semibold tracking-wider uppercase text-emerald-200">
				{$t('ticketsPage.urbanPassTitle')}
			</span>
			<Badge variant="outline" class="text-white border-white/30 bg-white/10">
				{$t('ticketsPage.activeDemoBadge')}
			</Badge>
		</div>

		<div class="space-y-1">
			<h2 class="text-lg font-bold">{$t('ticketsPage.monthlyPassName')}</h2>
			<p class="text-xs text-slate-300">{$t('ticketsPage.validityLabel')}</p>
		</div>

		<div class="flex items-center justify-between pt-2 border-t border-white/20">
			<div class="text-xs">
				<span class="block text-slate-400 text-[10px]">{$t('ticketsPage.holderLabel')}</span>
				<span class="font-medium">{$t('ticketsPage.holderName')}</span>
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
				<Ticket class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
				<h3 class="text-xs font-bold">{$t('ticketsPage.intercityTicketTitle')}</h3>
			</div>
			<Badge variant="outline">{$t('ticketsPage.ticketRef')}</Badge>
		</div>

		<div class="grid grid-cols-2 gap-2 text-xs border-y border-border/50 py-2.5">
			<div>
				<span class="text-[10px] text-muted-foreground block">{$t('ticketsPage.tripLabel')}</span>
				<span class="font-semibold">Algiers → Oran / الجزائر ↔ وهران</span>
			</div>
			<div>
				<span class="text-[10px] text-muted-foreground block">{$t('ticketsPage.departureLabel')}</span>
				<span class="font-semibold">25 Nov 2026 - 07:30</span>
			</div>
		</div>

		<div class="flex items-center justify-between text-xs">
			<span class="text-muted-foreground">{$t('ticketsPage.seatLabel')} : <strong class="text-foreground">{$t('ticketsPage.seatNum')}</strong></span>
			<span class="font-bold text-emerald-700 dark:text-emerald-400">1 200 DZD</span>
		</div>
	</Card>
</div>
