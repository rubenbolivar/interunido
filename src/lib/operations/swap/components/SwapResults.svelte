<script lang="ts">
    import { operationStore, operationActions } from '$lib/stores/operations';
    import { OperationFactory } from '$lib/operations/base/OperationFactory';
    import { OperationType } from '$lib/operations/types';
    
    let loading = false;
    let error = '';
    let success = false;

    $: operationData = $operationStore.data;
    
    // Definimos un tipo para las tasas de cambio
    type ExchangeRatePair = 'USD-EUR' | 'EUR-USD';
    
    // Tipamos el objeto de tasas
    const exchangeRates: Record<ExchangeRatePair, number> = {
        'USD-EUR': 0.92,
        'EUR-USD': 1.09
    };

    // Creamos una función helper para validar el par de divisas
    function getExchangeRate(from: string, to: string): number {
        const pair = `${from}-${to}` as ExchangeRatePair;
        return exchangeRates[pair] || 0;
    }

    $: exchangeRate = getExchangeRate(operationData.fromCurrency, operationData.toCurrency);
    $: estimatedAmount = operationData.fromAmount * exchangeRate;

    async function handleConfirm() {
        loading = true;
        error = '';
        
        try {
            const operation = OperationFactory.createOperation(OperationType.SWAP);
            operation.setData({
                ...operationData,
                exchangeRate,
                estimatedAmount
            });
            
            const validationResult = operation.validate();
            if (!validationResult.success) {
                throw new Error(validationResult.error);
            }

            const saveResult = await operation.save();
            if (!saveResult.success) {
                throw new Error(saveResult.error);
            }

            success = true;
        } catch (e) {
            error = e instanceof Error ? e.message : 'Error al procesar el canje';
        } finally {
            loading = false;
        }
    }

    function handlePrevious() {
        operationActions.previousStage();
    }

    function handleFinish() {
        operationActions.resetOperation();
    }
</script>

<div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-6">Confirmar Canje</h2>
    
    {#if !success}
        <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-900">Resumen del Canje</h3>
                <dl class="mt-4 space-y-2">
                    <div class="flex justify-between">
                        <dt class="text-gray-600">Cliente:</dt>
                        <dd class="font-medium">{operationData.clientName}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-gray-600">Identificación:</dt>
                        <dd class="font-medium">{operationData.clientId}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-gray-600">Monto a Canjear:</dt>
                        <dd class="font-medium">{operationData.fromAmount} {operationData.fromCurrency}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-gray-600">Tasa de Cambio:</dt>
                        <dd class="font-medium">{exchangeRate}</dd>
                    </div>
                    <div class="flex justify-between text-lg font-semibold">
                        <dt>Monto Estimado:</dt>
                        <dd>{estimatedAmount.toFixed(2)} {operationData.toCurrency}</dd>
                    </div>
                </dl>
            </div>

            {#if error}
                <p class="text-red-500 text-sm">{error}</p>
            {/if}

            <div class="flex justify-between mt-6">
                <button
                    on:click={handlePrevious}
                    class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                    disabled={loading}
                >
                    Anterior
                </button>
                <button
                    on:click={handleConfirm}
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Procesando...' : 'Confirmar Canje'}
                </button>
            </div>
        </div>
    {:else}
        <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h3 class="mt-3 text-lg font-medium text-gray-900">Canje Exitoso</h3>
            <p class="mt-2 text-sm text-gray-500">
                El canje se ha procesado correctamente.
            </p>
            <div class="mt-4">
                <button
                    on:click={handleFinish}
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nuevo Canje
                </button>
            </div>
        </div>
    {/if}
</div>