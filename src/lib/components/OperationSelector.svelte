<script lang="ts">
    import { operationsConfig, operationActions } from '$lib/stores/operations';
    import type { OperationType } from '$lib/operations/types';

    function handleKeyDown(event: KeyboardEvent, operation: (typeof operationsConfig)[number]) {
        if (event.key === 'Enter' || event.key === ' ') {
            operationActions.startOperation(operation.type);
        }
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each operationsConfig as operation}
        <button
            type="button"
            class="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            on:click={() => operationActions.startOperation(operation.type)}
            on:keydown={(e) => handleKeyDown(e, operation)}
            aria-label={`Seleccionar operación: ${operation.title}`}
        >
            <div class="p-6 bg-white">
                <h3 class="text-xl font-semibold mb-2">{operation.title}</h3>
                <p class="text-gray-600">{operation.description}</p>
            </div>
        </button>
    {/each}
</div>