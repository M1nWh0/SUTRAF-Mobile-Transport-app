<script>
	import { Shield, Database, MapPin, Route, Bus, AlertTriangle, ArrowLeft, Activity } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t } from '$lib/i18n/index.js';
</script>

<div class="flex-1 flex flex-col p-4 sm:p-6 space-y-5">
	<!-- Admin Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
		<div>
			<div class="flex items-center gap-2">
				<a href="/" class="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground">
					<ArrowLeft class="h-4 w-4 rtl:rotate-180 transition-transform" />
				</a>
				<h1 class="text-xl font-bold tracking-tight">{$t('adminPage.title')}</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-0.5">
				{$t('adminPage.subtitle')}
			</p>
		</div>

		<div class="flex items-center gap-2">
			<Badge variant="destructive">{$t('adminPage.adminBadge')}</Badge>
			<Badge variant="simulation">{$t('adminPage.simBadge')}</Badge>
		</div>
	</div>

	<!-- System Overview Grid -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
		<Card class="p-3.5">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>{$t('adminPage.wilayasTitle')}</span>
				<MapPin class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
			</div>
			<div class="mt-2 text-xl font-bold">{$t('adminPage.wilayasCount')}</div>
			<span class="text-[10px] text-muted-foreground">{$t('adminPage.wilayasDesc')}</span>
		</Card>

		<Card class="p-3.5">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>{$t('adminPage.linesTitle')}</span>
				<Route class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
			</div>
			<div class="mt-2 text-xl font-bold">{$t('adminPage.linesCount')}</div>
			<span class="text-[10px] text-muted-foreground">{$t('adminPage.linesDesc')}</span>
		</Card>

		<Card class="p-3.5">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>{$t('adminPage.fleetTitle')}</span>
				<Bus class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
			</div>
			<div class="mt-2 text-xl font-bold">{$t('adminPage.fleetCount')}</div>
			<span class="text-[10px] text-muted-foreground">{$t('adminPage.fleetDesc')}</span>
		</Card>

		<Card class="p-3.5">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>{$t('adminPage.incidentsTitle')}</span>
				<AlertTriangle class="h-4 w-4 text-amber-600 dark:text-amber-400" />
			</div>
			<div class="mt-2 text-xl font-bold">{$t('adminPage.incidentsCount')}</div>
			<span class="text-[10px] text-amber-600 dark:text-amber-400 font-medium">{$t('adminPage.incidentsDesc')}</span>
		</Card>
	</div>

	<!-- Management Sections -->
	<Card>
		<CardHeader>
			<CardTitle class="text-base">{$t('adminPage.modulesTitle')}</CardTitle>
			<CardDescription>
				{$t('adminPage.modulesDesc')}
			</CardDescription>
		</CardHeader>
		<CardContent class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
			<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 space-y-1">
				<span class="font-semibold block text-foreground">{$t('adminPage.citiesMod')}</span>
				<p class="text-muted-foreground text-[11px]">{$t('adminPage.citiesModDesc')}</p>
			</div>
			<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 space-y-1">
				<span class="font-semibold block text-foreground">{$t('adminPage.routesMod')}</span>
				<p class="text-muted-foreground text-[11px]">{$t('adminPage.routesModDesc')}</p>
			</div>
			<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 space-y-1">
				<span class="font-semibold block text-foreground">{$t('adminPage.companiesMod')}</span>
				<p class="text-muted-foreground text-[11px]">{$t('adminPage.companiesModDesc')}</p>
			</div>
			<div class="p-3 rounded-lg bg-secondary/50 border border-border/50 space-y-1">
				<span class="font-semibold block text-foreground">{$t('adminPage.incidentsMod')}</span>
				<p class="text-muted-foreground text-[11px]">{$t('adminPage.incidentsModDesc')}</p>
			</div>
		</CardContent>
	</Card>
</div>
