<script>
	import { cn } from '$lib/utils/cn.js';

	let {
		variant = 'default',
		size = 'default',
		class: className = '',
		type = 'button',
		disabled = false,
		children,
		...restProps
	} = $props();

	const variants = {
		default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm active:scale-[0.98]',
		secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]',
		outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
		ghost: 'hover:bg-accent hover:text-accent-foreground',
		destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]',
		transit: 'bg-emerald-700 text-white hover:bg-emerald-800 active:scale-[0.98] shadow-sm'
	};

	const sizes = {
		default: 'h-10 px-4 py-2 text-sm',
		sm: 'h-8 px-3 text-xs rounded-md',
		lg: 'h-12 px-6 text-base rounded-lg',
		icon: 'h-10 w-10 p-0 justify-center'
	};
</script>

<button
	{type}
	{disabled}
	class={cn(
		'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
		variants[variant] || variants.default,
		sizes[size] || sizes.default,
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</button>
