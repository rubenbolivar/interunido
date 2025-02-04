<script lang="ts">
    import SaleStage1 from '$lib/operations/sale/components/SaleStage1.svelte';
    import { operationStore } from '$lib/stores/operations';
    import { OperationType } from '$lib/operations/types';
    import { onMount } from 'svelte';

    onMount(() => {
        // Inicializar la operación de venta cuando se monta el componente
        operationStore.startOperation(OperationType.SALE);
    });

    $: currentStage = $operationStore?.currentStage || 1;
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Venta de Divisas</h1>

    <div class="bg-white rounded-lg shadow p-6">
        {#if currentStage === 1}
            <SaleStage1 />
        {:else if currentStage === 2}
            <!-- Agregar más etapas según sea necesario -->
            <p>Etapa 2 en construcción...</p>
        {/if}
    </div>
</div> 