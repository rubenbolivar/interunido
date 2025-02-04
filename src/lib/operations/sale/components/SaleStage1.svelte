<script lang="ts">
    import { operationStore, operationActions } from '$lib/stores/operations';
    
    let clientName = '';
    let clientId = '';

    $: validation = operationActions.validateStage({ clientName, clientId });
    $: if ($operationStore) {
        operationActions.updateStageValidation(validation);
    }

    function handleSubmit() {
        operationActions.updateOperationData({ clientName, clientId });
        if (validation.isValid) {
            operationActions.nextStage();
        }
    }
</script>

<div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-6">Información del Cliente</h2>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
            <label for="clientName" class="block text-sm font-medium text-gray-700">
                Nombre del Cliente
            </label>
            <input
                type="text"
                id="clientName"
                bind:value={clientName}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>

        <div>
            <label for="clientId" class="block text-sm font-medium text-gray-700">
                Identificación
            </label>
            <input
                type="text"
                id="clientId"
                bind:value={clientId}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>

        {#if validation.errors.length > 0}
            <div class="text-red-500 text-sm">
                {#each validation.errors as error}
                    <p>{error}</p>
                {/each}
            </div>
        {/if}

        <div class="flex justify-end">
            <button
                type="submit"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Continuar
            </button>
        </div>
    </form>
</div>