<script lang="ts">
    import { operationStore, operationActions } from '$lib/stores/operations';
    
    let clientName = '';
    let clientId = '';

    $: validation = operationActions.validateStage({ clientName, clientId });
    $: errors = $operationStore.validation.errors;

    function handleNext() {
        const validation = operationActions.validateStage({ clientName, clientId });
        operationActions.updateStageValidation(validation);

        if (!validation.isValid) {
            return;
        }

        operationActions.updateData({ clientName, clientId });
        operationActions.nextStage();
    }
</script>

<div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-6">Información del Cliente</h2>
    
    <div class="space-y-4">
        <div>
            <label for="clientName" class="block text-sm font-medium text-gray-700">
                Nombre del Cliente
            </label>
            <input
                type="text"
                id="clientName"
                bind:value={clientName}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        <div>
            <label for="clientId" class="block text-sm font-medium text-gray-700">
                ID del Cliente
            </label>
            <input
                type="text"
                id="clientId"
                bind:value={clientId}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        {#if errors.length > 0}
            <div class="text-red-500 text-sm mt-2">
                {#each errors as error}
                    <p>{error}</p>
                {/each}
            </div>
        {/if}

        <div class="flex justify-end mt-6">
            <button
                on:click={handleNext}
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Siguiente
            </button>
        </div>
    </div>
</div>