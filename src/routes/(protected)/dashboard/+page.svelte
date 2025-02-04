<script lang="ts">
    import DashboardStats from '$lib/components/DashboardStats.svelte';
    import { operationStore } from '$lib/stores/operations';
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    import OperationSelector from '$lib/components/OperationSelector.svelte';
    
    let operationsChartCanvas: HTMLCanvasElement;
    let volumeChartCanvas: HTMLCanvasElement;

    onMount(() => {
        if (operationsChartCanvas) {
            new Chart(operationsChartCanvas, {
                type: 'bar',
                data: {
                    labels: ['Enero', 'Febrero', 'Marzo'],
                    datasets: [{
                        label: 'Operaciones',
                        data: [12, 19, 3]
                    }]
                }
            });
        }

        if (volumeChartCanvas) {
            new Chart(volumeChartCanvas, {
                type: 'line',
                data: {
                    labels: ['Enero', 'Febrero', 'Marzo'],
                    datasets: [{
                        label: 'Volumen',
                        data: [65, 59, 80]
                    }]
                }
            });
        }
    });
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    
    <!-- Selector de Operaciones -->
    <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Operaciones Disponibles</h2>
        <OperationSelector />
    </div>

    <DashboardStats />
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-4">Operaciones por Mes</h3>
            <canvas bind:this={operationsChartCanvas}></canvas>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-4">Volumen de Transacciones</h3>
            <canvas bind:this={volumeChartCanvas}></canvas>
        </div>
    </div>
</div>