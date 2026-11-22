<script>
	import { cn } from '$lib/utils/cn.js';

	let { class: className = '', children, ...restProps } = $props();
</script>

<h3 class={cn('font-semibold leading-tight tracking-tight text-base sm:text-lg', className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</h3>
