<script>
	import { User, Globe, Moon, Shield, Info, MapPin, Check } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import ThemeToggle from '$lib/components/navigation/ThemeToggle.svelte';
	import { t, locale, setLocale } from '$lib/i18n/index.js';
	import { activeCity, activeCityId, setActiveCity } from '$lib/services/index.js';
</script>

<div class="flex-1 flex flex-col p-4 space-y-4">
	<div>
		<h1 class="text-lg font-bold tracking-tight">{$t('profilePage.title')}</h1>
		<p class="text-xs text-muted-foreground">{$t('profilePage.subtitle')}</p>
	</div>

	<!-- Demo User Summary -->
	<Card class="p-4">
		<div class="flex items-center gap-3">
			<div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700/10 text-emerald-700 dark:text-emerald-400 font-bold text-base shrink-0">
				KB
			</div>
			<div class="space-y-0.5">
				<h2 class="text-sm font-semibold">{$t('profilePage.demoUser')}</h2>
				<span class="text-xs text-muted-foreground block">{$t('profilePage.demoEmail')}</span>
				<div class="mt-1">
					<Badge variant="outline">{$t('profilePage.activeRole')}</Badge>
				</div>
			</div>
		</div>
	</Card>

	<!-- App Preferences: Language, Theme, City -->
	<Card>
		<CardHeader class="pb-3">
			<CardTitle class="text-sm">{$t('profilePage.preferencesTitle')}</CardTitle>
		</CardHeader>
		<CardContent class="space-y-4 text-xs">
			<!-- Language Preference -->
			<div class="space-y-2 p-3 rounded-xl bg-secondary/40 border border-border/50">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Globe class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
						<span class="font-semibold text-foreground">{$t('language.title')}</span>
					</div>
					<Badge variant="outline">
						{$locale === 'ar' ? 'العربية' : 'English'}
					</Badge>
				</div>
				<p class="text-muted-foreground text-[11px]">
					{$t('language.description')}
				</p>
				<div class="grid grid-cols-2 gap-2 pt-1">
					<button
						type="button"
						class="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer {$locale === 'en'
							? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
							: 'bg-background hover:bg-secondary text-foreground border-border'}"
						onclick={() => setLocale('en')}
					>
						<span>{$t('language.en')}</span>
						{#if $locale === 'en'}
							<Check class="h-3.5 w-3.5" />
						{/if}
					</button>
					<button
						type="button"
						class="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer {$locale === 'ar'
							? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
							: 'bg-background hover:bg-secondary text-foreground border-border'}"
						onclick={() => setLocale('ar')}
					>
						<span>{$t('language.ar')}</span>
						{#if $locale === 'ar'}
							<Check class="h-3.5 w-3.5" />
						{/if}
					</button>
				</div>
			</div>

			<!-- Theme Preference (mode-watcher) -->
			<div class="space-y-2 p-3 rounded-xl bg-secondary/40 border border-border/50">
				<div class="flex items-center gap-2">
					<Moon class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
					<span class="font-semibold text-foreground">{$t('theme.title')}</span>
				</div>
				<p class="text-muted-foreground text-[11px]">
					{$t('theme.description')}
				</p>
				<div class="pt-1">
					<ThemeToggle variant="segmented" />
				</div>
			</div>

			<!-- Default City Preference -->
			<div class="space-y-2 p-3 rounded-xl bg-secondary/40 border border-border/50">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<MapPin class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
						<span class="font-semibold text-foreground">{$t('profilePage.cityTitle')}</span>
					</div>
					<Badge variant="outline">
						{$locale === 'ar' ? $activeCity?.nameArabic : $activeCity?.name} ({$activeCity?.wilayaId})
					</Badge>
				</div>
				<p class="text-muted-foreground text-[11px]">
					{$t('profilePage.cityDesc')}
				</p>
				<div class="grid grid-cols-3 gap-1.5 pt-1">
					<button
						type="button"
						class="py-1.5 px-2 rounded-lg text-xs font-medium text-center border transition-all cursor-pointer {$activeCityId === 'city-alger'
							? 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 font-semibold'
							: 'bg-background hover:bg-secondary text-muted-foreground border-border'}"
						onclick={() => setActiveCity('city-alger')}
					>
						{$t('profilePage.algiersCity')}
					</button>
					<button
						type="button"
						class="py-1.5 px-2 rounded-lg text-xs font-medium text-center border transition-all cursor-pointer {$activeCityId === 'city-oran'
							? 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 font-semibold'
							: 'bg-background hover:bg-secondary text-muted-foreground border-border'}"
						onclick={() => setActiveCity('city-oran')}
					>
						{$t('profilePage.oranCity')}
					</button>
					<button
						type="button"
						class="py-1.5 px-2 rounded-lg text-xs font-medium text-center border transition-all cursor-pointer {$activeCityId === 'city-constantine'
							? 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 font-semibold'
							: 'bg-background hover:bg-secondary text-muted-foreground border-border'}"
						onclick={() => setActiveCity('city-constantine')}
					>
						{$t('profilePage.constantineCity')}
					</button>
				</div>
			</div>
		</CardContent>
	</Card>

	<!-- Roles Switcher Notice -->
	<div class="p-3.5 rounded-xl bg-slate-900 text-slate-300 text-xs space-y-2">
		<div class="flex items-center gap-2 text-white font-semibold">
			<Shield class="h-4 w-4 text-emerald-400" />
			<span>{$t('profilePage.demoRolesTitle')}</span>
		</div>
		<p class="text-[11px] leading-relaxed">
			{$t('profilePage.demoRolesDesc')}
		</p>
	</div>
</div>
