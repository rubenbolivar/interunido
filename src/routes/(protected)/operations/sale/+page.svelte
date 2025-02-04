<script lang="ts">
    import { onMount } from 'svelte';
    import { operationStore, operationActions } from '$lib/stores/operations';
    import type { OperationType } from '$lib/operations/types';
    import SaleStage1 from '$lib/operations/sale/components/SaleStage1.svelte';
    import SaleStage2 from '$lib/operations/sale/components/SaleStage2.svelte';
    import SaleStage3 from '$lib/operations/sale/components/SaleStage3.svelte';

    onMount(() => {
        operationActions.startOperation('sale' as OperationType);
    });
</script>

<div class="container">
    {#if $operationStore}
        {#if $operationStore.currentStage === 1}
            <SaleStage1 />
        {:else if $operationStore.currentStage === 2}
            <SaleStage2 />
        {:else if $operationStore.currentStage === 3}
            <SaleStage3 />
        {/if}
    {/if}
</div> 