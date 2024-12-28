<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { registerOperations } from '$lib/operations/register';

	onMount(() => {
		// Registrar las operaciones al montar la aplicación
		registerOperations();
	});
</script>

<slot />