<script lang="ts">
    import { page } from '$app/stores';
    import { fly } from 'svelte/transition';
    import { auth } from '$lib/stores/auth';
    import NotificationPanel from '$lib/components/NotificationPanel.svelte';
    import { goto } from '$app/navigation';
    
    export let isOpen = false;
    
    const menuItems = [
        {
            title: 'Dashboards',
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
            items: [
                { name: 'Dashboard', href: '/dashboard' },
                { name: 'Alternative', href: '/dashboard/alternative' }
            ]
        },
        {
            title: 'Examples',
            icon: 'M4 6h16M4 12h16M4 18h16',
            href: '/examples'
        },
        {
            title: 'Components',
            icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
            href: '/components'
        },
        {
            title: 'Forms',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
            href: '/forms'
        }
    ];

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            isOpen = false;
        }
    }

    function handleLogout() {
        auth.logout();
        goto('/auth/login');
    }
</script>

<!-- Overlay para móviles -->
{#if isOpen}
    <button 
        type="button"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity md:hidden"
        on:click={() => isOpen = false}
        on:keydown={handleKeydown}
        aria-label="Cerrar menú"
    ></button>
{/if}

<!-- Sidebar -->
<aside
    class="fixed inset-y-0 left-0 z-40 transform md:translate-x-0 transition-transform duration-200 ease-in-out
    {isOpen ? 'translate-x-0' : '-translate-x-full'}
    bg-white w-64 border-r border-gray-200 flex flex-col h-full"
>
    <div class="flex items-center justify-center h-auto px-4 border-b border-gray-200">
        <img 
            src="/logo.jpg" 
            alt="InterUnido Logo" 
            class="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain my-2 rounded-lg"
        />
    </div>

    <!-- Search bar -->
    <div class="px-4 py-3 border-b border-gray-200">
        <div class="relative">
            <input
                type="search"
                placeholder="Buscar..."
                class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    </div>
    
    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-4 py-4">
        {#each menuItems as item}
            <div class="mb-4">
                <div class="flex items-center mb-2">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
                    </svg>
                    <span class="ml-3 text-sm font-medium text-gray-900">{item.title}</span>
                </div>
                
                {#if item.items}
                    <div class="space-y-1 ml-8">
                        {#each item.items as subItem}
                            <a
                                href={subItem.href}
                                class="flex items-center px-3 py-2 text-sm rounded-md {$page.url.pathname === subItem.href ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}"
                            >
                                {subItem.name}
                            </a>
                        {/each}
                    </div>
                {:else}
                    <a
                        href={item.href}
                        class="flex items-center px-3 py-2 text-sm rounded-md ml-8 {$page.url.pathname === item.href ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}"
                    >
                        {item.title}
                    </a>
                {/if}
            </div>
        {/each}
    </nav>

    <!-- Logout button - visible en todas las versiones -->
    <div class="border-t border-gray-200 p-4">
        <button 
            on:click={handleLogout}
            class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
        </button>
    </div>
</aside> 