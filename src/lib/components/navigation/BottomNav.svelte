<script>
	import { page } from '$app/stores';
	import { Compass, Map, BusFront, Route, Ticket } from '@lucide/svelte';
	import { t } from '$lib/i18n/index.js';

	const navItems = [
		{ href: '/', key: 'home', icon: Compass },
		{ href: '/urban', key: 'urban', icon: Map },
		{ href: '/intercity', key: 'intercity', icon: BusFront },
		{ href: '/lines', key: 'lines', icon: Route },
		{ href: '/tickets', key: 'tickets', icon: Ticket }
	];
</script>

<nav
	aria-label={$t('nav.ariaLabel')}
	class="fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 pb-safe"
>
	<div class="mx-auto flex h-16 max-w-md items-center justify-around px-1">
		{#each navItems as item}
			{@const isActive =
				item.href === '/'
					? $page.url.pathname === '/'
					: $page.url.pathname.startsWith(item.href)}
			<a
				href={item.href}
				class="relative flex flex-1 flex-col items-center justify-center py-2 min-h-[44px] transition-all duration-150 select-none {isActive
					? 'text-emerald-700 dark:text-emerald-400 font-semibold'
					: 'text-muted-foreground hover:text-foreground'}"
			>
				<svelte:component
					this={item.icon}
					class="h-5 w-5 transition-transform duration-150 {isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.75]'}"
				/>
				<span class="mt-1 text-[10px] leading-tight text-center truncate px-0.5 max-w-full">
					{$t(`nav.${item.key}`)}
				</span>
				{#if isActive}
					<span
						class="absolute -bottom-1 h-1 w-6 rounded-full bg-emerald-600 dark:bg-emerald-400"
					></span>
				{/if}
			</a>
		{/each}
	</div>
</nav>
