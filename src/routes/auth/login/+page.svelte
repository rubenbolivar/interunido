<script lang="ts">
    import LoginForm from '$lib/components/LoginForm.svelte';
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Iniciar Sesión
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                ¿No tienes una cuenta?
                <a href="/auth/register" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Regístrate
                </a>
            </p>
        </div>
        <LoginForm />
    </div>
</div>