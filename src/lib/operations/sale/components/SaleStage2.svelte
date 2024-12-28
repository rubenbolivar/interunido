<script lang="ts">
    import { operationStore, operationActions } from '$lib/stores/operations';
    
    let amount = 0;
    let currency = 'USD';
    let clientRate = 0;
    let error = '';

    const currencies = [
        { value: 'USD', label: 'Dólares Americanos' },
        { value: 'EUR', label: 'Euros' }
    ];

    function handleNext() {
        if (amount <= 0 || !currency || clientRate <= 0) {
            error = 'Por favor complete todos los campos correctamente';
            return;
        }

        operationActions.updateData({ amount, currency, clientRate });
        operationActions.nextStage();
    }

    function handlePrevious() {
        operationActions.previousStage();
    }
</script>

<div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-6">Detalles de la Operación</h2>
    
    <div class="space-y-4">
        <div>
            <label for="amount" class="block text-sm font-medium text-gray-700">
                Monto
            </label>
            <input
                type="number"
                id="amount"
                bind:value={amount}
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        <div>
            <label for="currency" class="block text-sm font-medium text-gray-700">
                Moneda
            </label>
            <select
                id="currency"
                bind:value={currency}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
                {#each currencies as curr}
                    <option value={curr.value}>{curr.label}</option>
                {/each}
            </select>
        </div>

        <div>
            <label for="clientRate" class="block text-sm font-medium text-gray-700">
                Tasa del Cliente
            </label>
            <input
                type="number"
                id="clientRate"
                bind:value={clientRate}
                min="0"
                step="0.0001"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>

        {#if error}
            <p class="text-red-500 text-sm">{error}</p>
        {/if}

        <div class="flex justify-between mt-6">
            <button
                on:click={handlePrevious}
                class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
                Anterior
            </button>
            <button
                on:click={handleNext}
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Siguiente
            </button>
        </div>
    </div>
</div>