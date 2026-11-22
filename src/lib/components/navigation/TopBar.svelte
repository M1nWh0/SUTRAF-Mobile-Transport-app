<script>
	import { MapPin, SlidersHorizontal } from '@lucide/svelte';
	import LanguageToggle from '$lib/components/navigation/LanguageToggle.svelte';
	import ThemeToggle from '$lib/components/navigation/ThemeToggle.svelte';
	import { t } from '$lib/i18n/index.js';

	let { activeCity = null } = $props();

	let displayCity = $derived(activeCity || $t('topBar.activeCity'));
</script>

<header class="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 pt-safe">
	<div class="flex h-14 items-center justify-between px-3 sm:px-4 max-w-md mx-auto md:max-w-none">
		<!-- Brand & Logo -->
		<a href="/" class="flex items-center gap-2 group shrink-0">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-sm tracking-wider shadow-sm group-hover:bg-emerald-800 transition-colors">
				S
			</div>
			<div class="flex flex-col">
				<div class="flex items-center gap-1.5">
					<span class="font-bold text-base tracking-tight text-foreground">SUTRAF</span>
					<span class="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">ستراف</span>
				</div>
				<span class="text-[10px] text-muted-foreground -mt-1 hidden xs:inline leading-none">
					{$t('app.shortTagline')}
				</span>
			</div>
		</a>

		<!-- Quick controls: City, Language, Theme, Settings -->
		<div class="flex items-center gap-1.5 sm:gap-2">
			<!-- Active City Pill -->
			<a
				href="/urban"
				class="inline-flex items-center gap-1 rounded-full bg-secondary/85 hover:bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground transition-colors border border-border/60 max-w-[120px] sm:max-w-[150px]"
				title={$t('topBar.activeCityTitle')}
			>
				<MapPin class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
				<span class="truncate text-[11px]">{displayCity}</span>
			</a>

			<!-- Language Switcher Pill -->
			<LanguageToggle />

			<!-- Theme Quick Toggle -->
			<ThemeToggle />

			<!-- Settings / Profile Link -->
			<a
				href="/profile"
				class="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground border border-border/60 transition-colors touch-target"
				aria-label={$t('topBar.preferences')}
				title={$t('topBar.preferences')}
			>
				<SlidersHorizontal class="h-4 w-4" />
			</a>
		</div>
	</div>
</header>
