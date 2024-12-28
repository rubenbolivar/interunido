<script lang="ts">
    import { operationStore, operationActions } from '$lib/stores/operations';
    
    let fromAmount = 0;
    let fromCurrency = 'USD';
    let toCurrency = 'EUR';
    let clientName = '';
    let clientId = '';
    let error = '';

    const currencies = [
        { value: 'USD', label: 'Dólares Americanos' },
        { value: 'EUR', label: 'Euros' }
    ];

    function handleNext() {
        if (fromAmount <= 0 || !fromCurrency || !toCurrency || !clientName || !clientId) {
            error = 'Por favor complete todos los campos correctamente';
            return;
        }

        if (fromCurrency === toCurrency) {
            error = 'Las monedas deben ser diferentes';
            return;
        }

        operationActions.updateData({
            fromAmount,
            fromCurrency,
            toCurrency,
            clientName,
            clientId
        });
        operationActions.nextStage();
    }
</script>

<div class="p-6 bg-white rounded-lg shadow">
    <div class="mb-6">
        <h2 class="text-2xl font-semibold">Canje de Divisas</h2>
        <p class="text-gray-500">Ingrese los detalles del canje</p>
    </div>
    
    <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Identificación
                </label>
                <input
                    type="text"
                    id="clientId"
                    bind:value={clientId}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label for="fromAmount" class="block text-sm font-medium text-gray-700">
                    Monto a Canjear
                </label>
                <input
                    type="number"
                    id="fromAmount"
                    bind:value={fromAmount}
                    min="0"
                    step="0.01"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label for="fromCurrency" class="block text-sm font-medium text-gray-700">
                    De Moneda
                </label>
                <select
                    id="fromCurrency"
                    bind:value={fromCurrency}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    {#each currencies as curr}
                        <option value={curr.value}>{curr.label}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label for="toCurrency" class="block text-sm font-medium text-gray-700">
                    A Moneda
                </label>
                <select
                    id="toCurrency"
                    bind:value={toCurrency}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    {#each currencies as curr}
                        <option value={curr.value}>{curr.label}</option>
                    {/each}
                </select>
            </div>
        </div>

        {#if error}
            <p class="text-red-500 text-sm">{error}</p>
        {/if}

        <div class="flex justify-between mt-6">
            <button
                on:click={() => operationActions.cancelOperation()}
                class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
                Cancelar
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