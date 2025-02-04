<script lang="ts">
    import { operationStore, operationActions } from '$lib/stores/operations';
    
    let clientName = '';
    let amountToSell = '';
    let currencyType = '';
    let clientRate = '';
    let amountClientReceives = '';

    // Calcular el monto que recibe el cliente cuando cambian los valores
    $: {
        const amount = parseFloat(amountToSell) || 0;
        const rate = parseFloat(clientRate) || 0;
        amountClientReceives = formatNumber(amount * rate, true);
    }

    function formatNumber(num: number, isBs = false): string {
        if (typeof num !== 'number') return '';
        const formattedNum = num.toLocaleString('de-DE', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
        return isBs ? `Bs. ${formattedNum}` : formattedNum;
    }

    function handleSubmit() {
        if (!clientName || !amountToSell || !currencyType || !clientRate) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }

        operationActions.updateOperationData({
            clientName,
            amountToSell: parseFloat(amountToSell),
            currencyType,
            clientRate: parseFloat(clientRate),
            amountClientReceives: parseFloat(amountToSell) * parseFloat(clientRate)
        });

        operationActions.nextStage();
    }
</script>

<div class="card">
    <h2 class="text-xl font-bold mb-4">Datos de la Operación</h2>
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div class="form-group">
            <label for="clientName" class="block text-sm font-medium text-gray-700">
                Nombre del Cliente:
            </label>
            <input
                type="text"
                id="clientName"
                bind:value={clientName}
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>

        <div class="form-group">
            <label for="amountToSell" class="block text-sm font-medium text-gray-700">
                Monto que desea vender:
            </label>
            <input
                type="number"
                id="amountToSell"
                bind:value={amountToSell}
                step="any"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>

        <div class="form-group">
            <label for="currencyType" class="block text-sm font-medium text-gray-700">
                Tipo de Divisa:
            </label>
            <select
                id="currencyType"
                bind:value={currencyType}
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                <option value="">Seleccione una opción</option>
                <option value="EUR_CASH">Euros en efectivo</option>
                <option value="EUR_TRANSFER">Euro transferencia</option>
                <option value="USD_CASH">Dólares en efectivo</option>
                <option value="USD_ZELLE">Dólares Zelle</option>
                <option value="USD_INTL">Dólares en Bancos internacionales</option>
                <option value="USDT">Binance USDT</option>
            </select>
        </div>

        <div class="form-group">
            <label for="clientRate" class="block text-sm font-medium text-gray-700">
                Tasa Cliente:
            </label>
            <input
                type="number"
                id="clientRate"
                bind:value={clientRate}
                step="any"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>

        <div class="form-group">
            <label for="amountClientReceives" class="block text-sm font-medium text-gray-700">
                Monto que debe recibir el cliente:
            </label>
            <input
                type="text"
                id="amountClientReceives"
                value={amountClientReceives}
                readonly
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
            />
        </div>

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