<script lang="ts">
    import { operationStore, operationActions } from '$lib/stores/operations';
    import { OperationFactory } from '$lib/operations/base/OperationFactory';
    import { OperationType } from '$lib/operations/types';
    
    let loading = false;
    let error = '';
    let success = false;

    $: operationData = $operationStore.data;
    $: totalAmount = operationData.amount * operationData.clientRate;

    async function handleConfirm() {
        loading = true;
        error = '';
        
        try {
            const operation = OperationFactory.createOperation(OperationType.SALE);
            operation.setData(operationData);
            
            const validationResult = operation.validate();
            if (!validationResult.success) {
                throw new Error(validationResult.error);
            }

            const calculationResult = operation.calculate();
            if (!calculationResult.success) {
                throw new Error(calculationResult.error);
            }

            const saveResult = await operation.save();
            if (!saveResult.success) {
                throw new Error(saveResult.error);
            }

            success = true;
        } catch (e) {
            error = e instanceof Error ? e.message : 'Error al procesar la operación';
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
    <h2 class="text-2xl font-semibold mb-6">Confirmar Operación</h2>
    
    {#if !success}
        <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-900">Resumen de la Operación</h3>
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
                        <dt class="text-gray-600">Monto:</dt>
                        <dd class="font-medium">{operationData.amount} {operationData.currency}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-gray-600">Tasa:</dt>
                        <dd class="font-medium">{operationData.clientRate}</dd>
                    </div>
                    <div class="flex justify-between text-lg font-semibold">
                        <dt>Total:</dt>
                        <dd>{totalAmount.toFixed(2)} VES</dd>
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
                    {loading ? 'Procesando...' : 'Confirmar Operación'}
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
            <h3 class="mt-3 text-lg font-medium text-gray-900">Operación Exitosa</h3>
            <p class="mt-2 text-sm text-gray-500">
                La operación se ha procesado correctamente.
            </p>
            <div class="mt-4">
                <button
                    on:click={handleFinish}
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nueva Operación
                </button>
            </div>
        </div>
    {/if}
</div>