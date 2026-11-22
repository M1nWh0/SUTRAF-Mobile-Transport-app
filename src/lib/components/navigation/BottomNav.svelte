<script>
	import { page } from '$app/stores';
	import { Compass, Map, BusFront, Route, Ticket } from '@lucide/svelte';

	const navItems = [
		{ href: '/', label: 'Home', labelAr: 'الرئيسية', icon: Compass },
		{ href: '/urban', label: 'Urban', labelAr: 'الحضري', icon: Map },
		{ href: '/intercity', label: 'Intercity', labelAr: 'بين الولايات', icon: BusFront },
		{ href: '/lines', label: 'Lines', labelAr: 'الخطوط', icon: Route },
		{ href: '/tickets', label: 'Tickets', labelAr: 'التذاكر', icon: Ticket }
	];
</script>

<nav
	aria-label="Primary Navigation"
	class="fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 pb-safe"
>
	<div class="mx-auto flex h-16 max-w-md items-center justify-around px-2">
		{#each navItems as item}
			{@const isActive =
				item.href === '/'
					? $page.url.pathname === '/'
					: $page.url.pathname.startsWith(item.href)}
			<a
				href={item.href}
				class="relative flex flex-1 flex-col items-center justify-center py-1 transition-all duration-150 select-none {isActive
					? 'text-emerald-700 dark:text-emerald-400 font-semibold'
					: 'text-muted-foreground hover:text-foreground'}"
			>
				<svelte:component
					this={item.icon}
					class="h-5 w-5 transition-transform duration-150 {isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.75]'}"
				/>
				<span class="mt-1 text-[10px] leading-none">
					{item.label}
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
