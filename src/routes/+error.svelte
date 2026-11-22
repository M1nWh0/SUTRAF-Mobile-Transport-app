<script>
	import { page } from '$app/stores';
	import { AlertTriangle, ArrowLeft, Home } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<div class="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 max-w-md mx-auto">
	<div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
		<AlertTriangle class="h-9 w-9" />
	</div>

	<div class="space-y-1">
		<h1 class="text-xl font-bold tracking-tight text-foreground">
			Page Introuvable ({$page.status || 404})
		</h1>
		<p class="text-xs text-muted-foreground">
			La destination demandée n'existe pas ou fait partie d'une phase ultérieure.
		</p>
	</div>

	<div class="pt-2">
		<Button variant="default" class="gap-2" href="/">
			<Home class="h-4 w-4" />
			<span>Retour à l'accueil SUTRAF</span>
		</Button>
	</div>
</div>
