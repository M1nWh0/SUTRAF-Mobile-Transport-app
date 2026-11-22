<script>
	import { mode, userPrefersMode, setMode, resetMode } from 'mode-watcher';
	import { Sun, Moon, Monitor } from '@lucide/svelte';
	import { t } from '$lib/i18n/index.js';

	let { class: className = '', variant = 'icon' } = $props();

	function cycleTheme() {
		const currentPref = userPrefersMode.current;
		if (currentPref === 'light') {
			setMode('dark');
		} else if (currentPref === 'dark') {
			resetMode(); // system
		} else {
			setMode('light');
		}
	}
</script>

{#if variant === 'icon'}
	<button
		type="button"
		class="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground border border-border/60 transition-all cursor-pointer touch-target {className}"
		onclick={cycleTheme}
		aria-label={$t('topBar.themeAria')}
		title="{$t('theme.title')}: {userPrefersMode.current || 'system'}"
	>
		{#if mode.current === 'dark'}
			<Moon class="h-4 w-4 text-emerald-400" />
		{:else}
			<Sun class="h-4 w-4 text-amber-600" />
		{/if}
	</button>
{:else}
	<!-- Segmented buttons for Settings & Profile page -->
	<div class="inline-flex rounded-xl bg-secondary/80 p-1 border border-border/60 w-full {className}">
		<button
			type="button"
			class="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer {userPrefersMode.current === 'light'
				? 'bg-background text-foreground shadow-xs'
				: 'text-muted-foreground hover:text-foreground'}"
			onclick={() => setMode('light')}
		>
			<Sun class="h-3.5 w-3.5 text-amber-500" />
			<span>{$t('theme.light')}</span>
		</button>
		<button
			type="button"
			class="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer {userPrefersMode.current === 'dark'
				? 'bg-background text-foreground shadow-xs'
				: 'text-muted-foreground hover:text-foreground'}"
			onclick={() => setMode('dark')}
		>
			<Moon class="h-3.5 w-3.5 text-emerald-400" />
			<span>{$t('theme.dark')}</span>
		</button>
		<button
			type="button"
			class="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer {!userPrefersMode.current || userPrefersMode.current === 'system'
				? 'bg-background text-foreground shadow-xs'
				: 'text-muted-foreground hover:text-foreground'}"
			onclick={() => resetMode()}
		>
			<Monitor class="h-3.5 w-3.5 text-sky-500" />
			<span>{$t('theme.system')}</span>
		</button>
	</div>
{/if}
