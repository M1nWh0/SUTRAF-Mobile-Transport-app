<script>
	import { cn } from '$lib/utils/cn.js';

	let { class: className = '', children, ...restProps } = $props();
</script>

<p class={cn('text-xs sm:text-sm text-muted-foreground', className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</p>
