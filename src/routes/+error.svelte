<script>
	import { page } from '$app/stores';
	import { AlertTriangle, Home } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t } from '$lib/i18n/index.js';
</script>

<div class="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 max-w-md mx-auto">
	<div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
		<AlertTriangle class="h-9 w-9" />
	</div>

	<div class="space-y-1">
		<h1 class="text-xl font-bold tracking-tight text-foreground">
			{$t('error.title')} ({$page.status || 404})
		</h1>
		<p class="text-xs text-muted-foreground">
			{$t('error.desc')}
		</p>
	</div>

	<div class="pt-2">
		<Button variant="default" class="gap-2" href="/">
			<Home class="h-4 w-4" />
			<span>{$t('error.backHome')}</span>
		</Button>
	</div>
</div>
