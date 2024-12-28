<script lang="ts">
    import { operationsConfig } from '$lib/stores/operations';
    import { operationActions } from '$lib/stores/operations';
    import { OperationType } from '$lib/operations/types';

    function handleOperationSelect(type: OperationType) {
        if (!operationsConfig[type].isEnabled) {
            // TODO: Implementar sistema de notificaciones
            alert('Esta función estará disponible próximamente');
            return;
        }
        operationActions.startOperation(type);
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    {#each Object.entries(operationsConfig) as [type, config]}
        <div 
            class="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 cursor-pointer border border-gray-200"
            class:opacity-75={!config.isEnabled}
            class:cursor-not-allowed={!config.isEnabled}
            on:click={() => handleOperationSelect(type as OperationType)}
            on:keydown={(e) => e.key === 'Enter' && handleOperationSelect(type as OperationType)}
            role="button"
            tabindex="0"
        >
            <div class="flex items-start space-x-4">
                <div class="text-3xl">{config.icon}</div>
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">
                        {config.title}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                        {config.description}
                    </p>
                </div>
            </div>

            {#if !config.isEnabled}
                <div class="absolute top-4 right-4 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                    Próximamente
                </div>
            {/if}
        </div>
    {/each}
</div>