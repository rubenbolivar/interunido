<script lang="ts">
    import { login } from '$lib/auth';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';

    let email = '';
    let password = '';
    let error = '';
    let loading = false;

    const errorMessages = {
        'invalid_credentials': 'Email o contraseña incorrectos',
        'user_not_found': 'No existe una cuenta con este email',
        'invalid_password': 'La contraseña es incorrecta',
        'server_error': 'Error en el servidor, intente más tarde',
        'default': 'Error durante el inicio de sesión'
    };

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        error = '';
        loading = true;
        
        try {
            const response = await login(email, password);
            auth.setUser(response.user);
            window.location.href = '/dashboard';
        } catch (e) {
            console.error('Login error:', e);
            const errorKey = e instanceof Error ? e.message : 'default';
            error = errorMessages[errorKey as keyof typeof errorMessages] || errorMessages.default;
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
            autocomplete="current-password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
    </div>

    <button
        type="submit"
        disabled={loading}
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
    </button>
</form>