<script>
	import { cn } from '$lib/utils/cn.js';

	let { class: className = '', children, ...restProps } = $props();
</script>

<div
	class={cn(
		'rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm transition-all',
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>
