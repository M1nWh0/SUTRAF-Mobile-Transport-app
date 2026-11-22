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
		success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25',
		warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25',
		destructive: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/25',
		bus: 'bg-amber-500 text-slate-950 font-semibold border-amber-600',
		simulation: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30 font-medium'
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
