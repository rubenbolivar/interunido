<script lang="ts">
    import Sidebar from '$lib/components/Sidebar.svelte';
    import { auth } from '$lib/stores/auth';
    import NotificationPanel from '$lib/components/NotificationPanel.svelte';
    
    let isOpen = false;
</script>

<div class="min-h-screen bg-gray-100 overflow-x-hidden">
    <!-- Botón de menú móvil -->
    <button
        type="button"
        class="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md"
        on:click={() => isOpen = !isOpen}
        aria-label="Abrir menú de navegación"
        aria-expanded={isOpen}
    >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>

    <Sidebar {isOpen} />
    
    <div class="md:pl-64 w-full">
        <!-- Top Navigation - Solo visible en desktop -->
        <header class="bg-white shadow-sm hidden md:block">
            <div class="flex justify-end items-center px-4 py-4">
                <div class="flex items-center space-x-4">
                    <NotificationPanel />
                    <span class="text-sm text-gray-700">{$auth.user?.name}</span>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="p-4">
            <slot />
        </main>
    </div>
</div>