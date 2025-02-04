<script lang="ts">
    import { operationStore, operationActions } from '$lib/stores/operations';
    import { OperationType } from '$lib/operations/types';
    import SaleStage1 from '$lib/operations/sale/components/SaleStage1.svelte';
    
    // Iniciar operación de venta al cargar la página
    operationActions.startOperation(OperationType.SALE);
</script>

<div class="container mx-auto p-6">
    {#if $operationStore.currentStage === 1}
        <SaleStage1 />
    {:else if $operationStore.currentStage === 2}
        <div>Stage 2 (en desarrollo)</div>
    {:else if $operationStore.currentStage === 3}
        <div>Stage 3 (en desarrollo)</div>
    {/if}
</div> 