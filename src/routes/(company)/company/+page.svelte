<script>
	import { Building2, Bus, Calendar, Plus, Users, ArrowLeft, ShieldAlert } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t, locale } from '$lib/i18n/index.js';
	import { getCompanyById, getCompanyBuses, getFleetStats, getCompanyRoutes } from '$lib/services/index.js';

	const activeCompany = getCompanyById('comp-etusa');
	const companyBuses = getCompanyBuses('comp-etusa');
	const fleetStats = getFleetStats('comp-etusa');
	const operatedRoutes = getCompanyRoutes('comp-etusa');
</script>

<div class="flex-1 flex flex-col p-4 sm:p-6 space-y-5">
	<!-- Company Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
		<div>
			<div class="flex items-center gap-2">
				<a href="/" class="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground">
					<ArrowLeft class="h-4 w-4 rtl:rotate-180 transition-transform" />
				</a>
				<h1 class="text-xl font-bold tracking-tight">{$t('companyPage.title')}</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-0.5">
				{$t('companyPage.operatorLabel')} <strong class="text-foreground">{$locale === 'ar' ? activeCompany?.nameArabic : activeCompany?.name}</strong>
			</p>
		</div>

		<div class="flex items-center gap-2">
			<Badge variant="simulation">{$t('companyPage.scopingBadge')}</Badge>
			<Badge variant="outline">{$t('companyPage.demoBadge')}</Badge>
		</div>
	</div>

	<!-- Demo Scoping Notice -->
	<div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
		<ShieldAlert class="h-4 w-4 shrink-0 mt-0.5" />
		<div>
			<strong class="block">{$t('companyPage.scopingNoticeTitle')}</strong>
			<span>{$t('companyPage.scopingNoticeDesc')}</span>
		</div>
	</div>

	<!-- Operator Fleet Overview Stats from Domain Service -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
		<Card class="p-4">
			<div class="flex items-center justify-between">
				<span class="text-xs text-muted-foreground">{$t('companyPage.activeFleet')}</span>
				<Bus class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
			</div>
			<div class="mt-2 text-2xl font-bold">{fleetStats.total} Buses</div>
			<span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
				{fleetStats.enRoute} en route • {fleetStats.atDepot} at depot
			</span>
		</Card>

		<Card class="p-4">
			<div class="flex items-center justify-between">
				<span class="text-xs text-muted-foreground">{$t('companyPage.operatedLines')}</span>
				<Calendar class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
			</div>
			<div class="mt-2 text-2xl font-bold">{operatedRoutes.length} Lines</div>
			<span class="text-[10px] text-muted-foreground">
				{operatedRoutes.map((r) => r.code).join(', ')}
			</span>
		</Card>

		<Card class="p-4">
			<div class="flex items-center justify-between">
				<span class="text-xs text-muted-foreground">{$t('companyPage.driversCount')}</span>
				<Users class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
			</div>
			<div class="mt-2 text-2xl font-bold">1 Driver Demo</div>
			<span class="text-[10px] text-muted-foreground">Ahmed Mansouri (BUS-16-042)</span>
		</Card>
	</div>

	<!-- Fleet List from Structured Mock Data -->
	<Card>
		<CardHeader class="flex flex-row items-center justify-between pb-3">
			<div>
				<CardTitle class="text-base">{$t('companyPage.vehiclesTitle')}</CardTitle>
				<CardDescription>{$t('companyPage.vehiclesDesc')}</CardDescription>
			</div>
			<Button variant="default" size="sm" class="gap-1.5 opacity-80 cursor-not-allowed">
				<Plus class="h-3.5 w-3.5" />
				<span>{$t('companyPage.addBusBtn')}</span>
			</Button>
		</CardHeader>
		<CardContent>
			<div class="space-y-2 text-xs">
				{#each companyBuses as bus}
					<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
						<div class="flex items-center gap-3">
							<span class="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs">
								{bus.label}
							</span>
							<div>
								<h4 class="font-semibold text-foreground">{bus.model}</h4>
								<span class="text-muted-foreground text-[11px]">
									Route: {bus.routeId || 'Unassigned'} • Capacity: {bus.capacity}
								</span>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<Badge variant={bus.status === 'en_route' ? 'success' : bus.status === 'delayed' ? 'warning' : 'outline'}>
								{bus.status === 'en_route' ? $t('companyPage.enRoute') : bus.status}
							</Badge>
						</div>
					</div>
				{/each}
			</div>
		</CardContent>
	</Card>
</div>
