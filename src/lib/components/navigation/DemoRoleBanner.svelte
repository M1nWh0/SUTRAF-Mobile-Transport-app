<script>
	import { page } from '$app/stores';
	import { Users, Building2, Shield, Info } from '@lucide/svelte';

	const roles = [
		{ id: 'passenger', label: 'Passenger', href: '/', icon: Users },
		{ id: 'company', label: 'Company / Driver', href: '/company', icon: Building2 },
		{ id: 'admin', label: 'Global Admin', href: '/admin', icon: Shield }
	];
</script>

<aside aria-label="Demo Role & Simulation Status" class="w-full bg-slate-900 text-slate-100 text-xs py-1.5 px-3 border-b border-slate-800">
	<div class="mx-auto max-w-5xl flex flex-wrap items-center justify-between gap-2">
		<!-- Role Switcher -->
		<div class="flex items-center gap-1.5">
			<span class="text-slate-400 font-medium text-[11px] hidden sm:inline">Role preview:</span>
			<div class="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
				{#each roles as role}
					{@const isActive =
						role.id === 'passenger'
							? !$page.url.pathname.startsWith('/company') && !$page.url.pathname.startsWith('/admin')
							: $page.url.pathname.startsWith(role.href)}
					<a
						href={role.href}
						class="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] transition-colors {isActive
							? 'bg-emerald-600 text-white font-semibold shadow-xs'
							: 'text-slate-300 hover:text-white hover:bg-slate-700/60'}"
					>
						<svelte:component this={role.icon} class="h-3 w-3" />
						<span>{role.label}</span>
					</a>
				{/each}
			</div>
		</div>

		<!-- Honesty notice -->
		<div class="flex items-center gap-1 text-[11px] text-amber-300/90 font-mono">
			<Info class="h-3 w-3 shrink-0" />
			<span>Simulated Demo • No Live GPS / Backend</span>
		</div>
	</div>
</aside>
