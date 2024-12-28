<script lang="ts">
    import OperationSelector from '$lib/components/OperationSelector.svelte';
    import DashboardStats from '$lib/components/DashboardStats.svelte';
    import { operationStore, operationActions } from '$lib/stores/operations';
    import { currentOperationComponent } from '$lib/stores/operations';
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
        {#if $operationStore.isOperationInProgress}
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-semibold text-gray-900">
                    {$operationStore.currentOperation === 'sale' ? 'Venta de Divisas' : 'Canje de Divisas'}
                </h1>
                <button
                    on:click={() => operationActions.cancelOperation()}
                    class="text-gray-600 hover:text-gray-900"
                >
                    <span class="sr-only">Cancelar operación</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <!-- Progress Steps -->
            <div class="mt-4">
                <div class="flex items-center justify-between">
                    {#if $operationStore.currentOperation === 'sale'}
                        <div class="flex items-center space-x-4">
                            <span class={`rounded-full h-8 w-8 flex items-center justify-center ${$operationStore.currentStage >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>1</span>
                            <span class={`rounded-full h-8 w-8 flex items-center justify-center ${$operationStore.currentStage >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>2</span>
                            <span class={`rounded-full h-8 w-8 flex items-center justify-center ${$operationStore.currentStage === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>3</span>
                        </div>
                    {:else}
                        <div class="flex items-center space-x-4">
                            <span class={`rounded-full h-8 w-8 flex items-center justify-center ${$operationStore.currentStage >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>1</span>
                            <span class={`rounded-full h-8 w-8 flex items-center justify-center ${$operationStore.currentStage === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>2</span>
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <h1 class="text-2xl font-semibold text-gray-900">Panel de Operaciones</h1>
            <p class="mt-2 text-sm text-gray-500">
                Seleccione el tipo de operación que desea realizar
            </p>
        {/if}
    </div>

    <!-- Stats Section - Siempre visible cuando no hay operación en curso -->
    {#if !$operationStore.isOperationInProgress}
        <DashboardStats />
    {/if}

    <!-- Content -->
    <div class="bg-white rounded-lg shadow">
        {#if !$operationStore.isOperationInProgress}
            <OperationSelector />
        {:else if $currentOperationComponent}
            <svelte:component this={$currentOperationComponent} />
        {/if}
    </div>
</div>