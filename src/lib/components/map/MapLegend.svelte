<script>
	import { Info, ChevronDown, ChevronUp, Layers } from '@lucide/svelte';
	import { t } from '$lib/i18n/index.js';

	let isOpen = $state(false);
</script>

<div class="relative inline-block text-xs">
	<button
		type="button"
		class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-background/90 hover:bg-background text-foreground border border-border/80 shadow-xs backdrop-blur cursor-pointer transition-colors"
		onclick={() => (isOpen = !isOpen)}
		aria-expanded={isOpen}
	>
		<Layers class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
		<span class="font-medium text-[11px]">{$t('urbanPage.legend')}</span>
		{#if isOpen}
			<ChevronUp class="h-3 w-3 text-muted-foreground" />
		{:else}
			<ChevronDown class="h-3 w-3 text-muted-foreground" />
		{/if}
	</button>

	{#if isOpen}
		<div class="absolute z-30 mt-1 start-0 w-64 p-3 rounded-xl bg-background/95 border border-border shadow-lg backdrop-blur text-xs space-y-2.5 animate-in fade-in duration-150">
			<div class="flex items-center justify-between border-b border-border/60 pb-1.5">
				<span class="font-bold text-foreground text-[11px]">{$t('urbanPage.legend')}</span>
				<span class="text-[9px] text-muted-foreground font-mono">MapLibre GL</span>
			</div>

			<!-- Line items -->
			<div class="space-y-2 text-[11px]">
				<div class="flex items-center gap-2.5">
					<span class="h-1.5 w-6 rounded-full bg-emerald-600 shrink-0"></span>
					<span class="text-foreground">{$t('urbanPage.legendRoute')}</span>
				</div>

				<div class="flex items-center gap-2.5">
					<div class="h-4 w-4 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center shrink-0">
						<div class="h-2 w-2 rounded-full bg-emerald-600"></div>
					</div>
					<span class="text-foreground">{$t('urbanPage.legendStation')}</span>
				</div>

				<div class="flex items-center gap-2.5">
					<div class="h-3 w-3 rounded-full border border-slate-900 bg-white flex items-center justify-center shrink-0">
						<div class="h-1.5 w-1.5 rounded-full bg-sky-600"></div>
					</div>
					<span class="text-foreground">{$t('urbanPage.legendStop')}</span>
				</div>

				<div class="flex items-center gap-2.5">
					<div class="h-4 w-5 rounded bg-emerald-700 text-white flex items-center justify-center text-[9px] font-bold shadow-xs shrink-0">
						BUS
					</div>
					<span class="text-foreground">{$t('urbanPage.legendBus')}</span>
				</div>
			</div>

			<!-- Honesty disclaimer -->
			<div class="pt-1.5 border-t border-border/60 text-[10px] text-muted-foreground flex items-start gap-1.5">
				<Info class="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
				<span class="leading-tight">{$t('urbanPage.simulatedNotice')}</span>
			</div>
		</div>
	{/if}
</div>
