<script>
	import { cn } from '$lib/utils/cn.js';

	let {
		variant = 'default',
		class: className = '',
		children,
		...restProps
	} = $props();

	const variants = {
		default: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
		secondary: 'bg-secondary text-secondary-foreground border-border',
		outline: 'text-foreground border border-border',
		success: 'bg-success/15 text-success border-success/30 font-medium',
		warning: 'bg-warning/15 text-warning border-warning/30 font-medium',
		destructive: 'bg-destructive/15 text-destructive border-destructive/30 font-medium',
		bus: 'bg-warning text-warning-foreground font-semibold border-warning/80',
		simulation: 'bg-info/15 text-info border-info/30 font-medium'
	};
</script>

<span
	class={cn(
		'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors select-none',
		variants[variant] || variants.default,
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</span>
