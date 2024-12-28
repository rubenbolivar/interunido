<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { auth } from '$lib/stores/auth';

    onMount(() => {
        if ($auth.user) {
            goto('/dashboard');
        } else {
            goto('/auth/login');
        }
    });
</script>

<div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-2xl font-semibold mb-4">Cargando...</h1>
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
    </div>
</div>