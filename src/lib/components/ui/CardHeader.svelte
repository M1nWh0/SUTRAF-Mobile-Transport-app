<script>
	import { cn } from '$lib/utils/cn.js';

	let { class: className = '', children, ...restProps } = $props();
</script>

<div class={cn('flex flex-col space-y-1.5 p-4 sm:p-5', className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
