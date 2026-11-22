<script>
	import { cn } from '$lib/utils/cn.js';

	let { class: className = '', children, ...restProps } = $props();
</script>

<div class={cn('p-4 sm:p-5 pt-0 sm:pt-0', className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
