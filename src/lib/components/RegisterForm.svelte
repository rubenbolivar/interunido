<script lang="ts">
    import { register } from '$lib/auth';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';

    let name = '';
    let email = '';
    let password = '';
    let error = '';
    let loading = false;

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        error = '';
        loading = true;
        
        try {
            console.log('Sending registration data:', { name, email }); // Debug
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            console.log('Registration response:', data); // Debug

            if (!response.ok) {
                throw new Error(data.error || 'Error durante el registro');
            }

            auth.setUser(data.user);
            await goto('/dashboard');
        } catch (e) {
            console.error('Registration error:', e); // Debug
            error = e instanceof Error ? e.message : 'Error durante el registro';
        } finally {
            loading = false;
        }
    }
</script>

<form class="space-y-4" on:submit={handleSubmit}>
    {#if error}
        <div class="bg-red-50 p-4 rounded-md">
            <p class="text-sm text-red-700">{error}</p>
        </div>
    {/if}

    <div>
        <label for="name" class="block text-sm font-medium text-gray-700">
            Nombre
        </label>
        <input
            type="text"
            id="name"
            bind:value={name}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
    </div>

    <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
            Email
        </label>
        <input
            type="email"
            id="email"
            bind:value={email}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
    </div>

    <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
            Contraseña
        </label>
        <input
            type="password"
            id="password"
            bind:value={password}
            required
            autocomplete="new-password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
    </div>

    <button
        type="submit"
        disabled={loading}
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
        {loading ? 'Registrando...' : 'Registrarse'}
    </button>
</form>