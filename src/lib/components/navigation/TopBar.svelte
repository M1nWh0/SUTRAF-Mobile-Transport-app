<script>
	import { MapPin, User, SlidersHorizontal } from '@lucide/svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let { activeCity = 'Alger / الجزائر' } = $props();
</script>

<header class="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 pt-safe">
	<div class="flex h-14 items-center justify-between px-4 sm:px-6 max-w-md mx-auto md:max-w-none">
		<!-- Brand & Logo -->
		<a href="/" class="flex items-center gap-2.5 group">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-sm tracking-wider shadow-sm group-hover:bg-emerald-800 transition-colors">
				S
			</div>
			<div class="flex flex-col">
				<div class="flex items-center gap-1.5">
					<span class="font-bold text-base tracking-tight text-foreground">SUTRAF</span>
					<span class="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">ستراف</span>
				</div>
				<span class="text-[10px] text-muted-foreground -mt-1 hidden xs:inline">Transport Algérie</span>
			</div>
		</a>

		<!-- Active City Pill & Profile -->
		<div class="flex items-center gap-2">
			<a
				href="/urban"
				class="inline-flex items-center gap-1.5 rounded-full bg-secondary/85 hover:bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors border border-border/60"
				title="Active City - Algerian transport network"
			>
				<MapPin class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
				<span class="truncate max-w-[110px] sm:max-w-[140px]">{activeCity}</span>
			</a>

			<a
				href="/profile"
				class="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground border border-border/60 transition-colors"
				aria-label="Profile and preferences"
			>
				<SlidersHorizontal class="h-4 w-4" />
			</a>
		</div>
	</div>
</header>
