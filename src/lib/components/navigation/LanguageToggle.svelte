<script>
	import { locale, toggleLocale, t } from '$lib/i18n/index.js';
	import { Languages } from '@lucide/svelte';

	let { class: className = '', showLabel = true } = $props();
</script>

<button
	type="button"
	class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary/85 hover:bg-secondary text-secondary-foreground border border-border/60 transition-all select-none cursor-pointer justify-center touch-target {className}"
	onclick={toggleLocale}
	aria-label={$t('topBar.languageSwitchAria')}
	title={$locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
>
	<Languages class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
	{#if showLabel}
		<span class="font-medium text-[11px] leading-none">
			{$locale === 'ar' ? 'EN' : 'العربية'}
		</span>
	{/if}
</button>
