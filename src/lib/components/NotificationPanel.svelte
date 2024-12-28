<script lang="ts">
    import { notifications } from '$lib/stores/notifications';
    import { slide } from 'svelte/transition';

    let showPanel = false;

    function handleKeydown(event: KeyboardEvent, notificationId: string) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            notifications.markAsRead(notificationId);
        }
    }

    function removeNotification(event: Event, id: string) {
        event.stopPropagation();
        notifications.remove(id);
    }
</script>

<div class="relative">
    <!-- Notification Bell -->
    <button
        class="relative p-2 text-gray-600 hover:text-gray-900"
        on:click={() => showPanel = !showPanel}
        aria-label="Toggle notifications panel"
    >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
        {#if $notifications.some(n => !n.read)}
            <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        {/if}
    </button>

    <!-- Notification Panel -->
    {#if showPanel}
        <div
            transition:slide
            class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50"
            role="menu"
        >
            <div class="px-4 py-2 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Notificaciones</h3>
            </div>
            
            {#if $notifications.length === 0}
                <div class="px-4 py-3 text-sm text-gray-500">
                    No hay notificaciones
                </div>
            {:else}
                <div class="max-h-96 overflow-y-auto">
                    {#each $notifications as notification}
                        <div
                            class="group px-4 py-3 hover:bg-gray-50"
                            class:bg-gray-50={notification.read}
                            role="menuitem"
                            tabindex="0"
                            on:click={() => notifications.markAsRead(notification.id)}
                            on:keydown={(e) => handleKeydown(e, notification.id)}
                        >
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    {#if notification.type === 'success'}
                                        <span class="text-green-400" aria-label="success">✓</span>
                                    {:else if notification.type === 'error'}
                                        <span class="text-red-400" aria-label="error">✗</span>
                                    {:else if notification.type === 'warning'}
                                        <span class="text-yellow-400" aria-label="warning">⚠</span>
                                    {:else}
                                        <span class="text-blue-400" aria-label="info">ℹ</span>
                                    {/if}
                                </div>
                                <div class="ml-3 w-0 flex-1">
                                    <p class="text-sm text-gray-900">
                                        {notification.message}
                                    </p>
                                    <p class="mt-1 text-xs text-gray-500">
                                        {new Date(notification.timestamp).toLocaleString()}
                                    </p>
                                </div>
                                <span
                                    class="ml-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                                    role="button"
                                    tabindex="0"
                                    on:click={(e) => removeNotification(e, notification.id)}
                                    on:keydown={(e) => e.key === 'Enter' && removeNotification(e, notification.id)}
                                    aria-label="Remove notification"
                                >
                                    ×
                                </span>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>