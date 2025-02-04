<script lang="ts">
    import { operationsConfig, operationActions } from '$lib/stores/operations';
    import type { OperationType } from '$lib/operations/types';

    function handleOperationSelect(type: OperationType) {
        operationActions.startOperation(type);
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each operationsConfig as operation}
        {#if operation.isEnabled}
            <a 
                href="/operations/{operation.type.toLowerCase()}"
                class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
                <div class="flex items-center space-x-4">
                    <span class="text-2xl">
                        <i class={operation.icon}></i>
                    </span>
                    <div>
                        <h3 class="text-lg font-semibold">{operation.title}</h3>
                        <p class="text-gray-600">{operation.description}</p>
                    </div>
                </div>
            </a>
        {/if}
    {/each}
</div>