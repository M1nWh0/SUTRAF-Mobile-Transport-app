<script>
	import { page } from '$app/stores';

	let { children } = $props();

	// Check if current route is company or admin to allow wider desktop layout
	let isWideLayout = $derived(
		$page.url.pathname.startsWith('/company') || $page.url.pathname.startsWith('/admin')
	);
</script>

<div class="min-h-screen w-full flex flex-col items-center justify-start bg-slate-200/60 dark:bg-slate-950">
	{#if isWideLayout}
		<!-- Wide Workspace layout for Company & Admin -->
		<div class="w-full max-w-6xl min-h-[calc(100vh-32px)] bg-background border-x border-border/50 shadow-sm flex flex-col">
			{#if children}
				{@render children()}
			{/if}
		</div>
	{:else}
		<!-- Mobile-first Passenger Phone Container -->
		<div class="w-full max-w-md min-h-[calc(100vh-32px)] bg-background sm:my-3 sm:rounded-2xl sm:border sm:border-border sm:shadow-xl relative flex flex-col overflow-hidden">
			{#if children}
				{@render children()}
			{/if}
		</div>
	{/if}
</div>
