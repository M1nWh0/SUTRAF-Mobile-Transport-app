<script>
	import '../app.css';
	import { page } from '$app/stores';
	import DemoRoleBanner from '$lib/components/navigation/DemoRoleBanner.svelte';
	import PhoneFrame from '$lib/components/navigation/PhoneFrame.svelte';
	import TopBar from '$lib/components/navigation/TopBar.svelte';
	import BottomNav from '$lib/components/navigation/BottomNav.svelte';

	let { children } = $props();

	// Passenger routes show the bottom navigation bar
	let isPassengerRoute = $derived(
		!$page.url.pathname.startsWith('/company') && !$page.url.pathname.startsWith('/admin')
	);
</script>

<div class="flex flex-col min-h-screen">
	<!-- Demo role indicator & simulation honesty banner -->
	<DemoRoleBanner />

	<!-- Layout Container (Responsive Mobile Phone frame on desktop) -->
	<PhoneFrame>
		{#if isPassengerRoute}
			<TopBar />
		{/if}

		<main class="flex-1 flex flex-col {isPassengerRoute ? 'pb-20' : ''}">
			{#if children}
				{@render children()}
			{/if}
		</main>

		{#if isPassengerRoute}
			<BottomNav />
		{/if}
	</PhoneFrame>
</div>
