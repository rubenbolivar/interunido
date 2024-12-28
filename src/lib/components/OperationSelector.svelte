<script lang="ts">
    import { operationsConfig } from '$lib/stores/operations';
    import { operationActions } from '$lib/stores/operations';
    import { OperationType } from '$lib/operations/types';

    function handleOperationSelect(type: OperationType) {
        if (!operationsConfig[type].isEnabled) {
            alert('Esta función estará disponible próximamente');
            return;
        }
        operationActions.startOperation(type);
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each Object.entries(operationsConfig) as [type, config]}
        <div 
            class="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl 
                   {config.isEnabled ? 'cursor-pointer hover:scale-105' : 'opacity-90'}"
            on:click={() => handleOperationSelect(type as OperationType)}
            on:keydown={(e) => e.key === 'Enter' && handleOperationSelect(type as OperationType)}
            role="button"
            tabindex="0"
        >
            <div class="bg-gradient-to-br {config.gradientColors} p-6">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                        <div class="rounded-full p-3 {config.bgColor} bg-opacity-90">
                            <svg class="h-6 w-6 text-white" 
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {@html config.icon}
                            </svg>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold text-white mb-2">
                            {config.title}
                        </h3>
                        <p class="text-white text-opacity-90">
                            {config.description}
                        </p>
                        {#if config.isEnabled}
                            <div class="mt-4">
                                <span class="inline-flex items-center text-sm font-medium text-white">
                                    Iniciar operación
                                    <svg class="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        {:else}
                            <div class="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                Próximamente
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>