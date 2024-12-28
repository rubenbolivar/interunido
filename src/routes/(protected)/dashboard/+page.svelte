<script lang="ts">
    import OperationSelector from '$lib/components/OperationSelector.svelte';
    import DashboardStats from '$lib/components/DashboardStats.svelte';
    import { operationStore } from '$lib/stores/operations';
    import { currentOperationComponent } from '$lib/stores/operations';
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

    let operationsChartCanvas: HTMLCanvasElement;
    let volumeChartCanvas: HTMLCanvasElement;

    onMount(() => {
        // Solo inicializar los gráficos si no hay operación en curso
        if (!$operationStore.isOperationInProgress) {
            // Gráfico de Tasas (Líneas múltiples)
            new Chart(operationsChartCanvas, {
                type: 'line',
                data: {
                    labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
                    datasets: [
                        {
                            label: 'Tasa Máxima',
                            data: [35.80, 36.10, 36.50, 36.40, 36.80, 36.90, 37.00],
                            borderColor: 'rgb(34, 197, 94)',
                            borderWidth: 2,
                            pointRadius: 4
                        },
                        {
                            label: 'Tasa Promedio',
                            data: [35.45, 35.75, 36.15, 36.15, 36.40, 36.60, 36.80],
                            borderColor: 'rgb(59, 130, 246)',
                            borderWidth: 2,
                            pointRadius: 4
                        },
                        {
                            label: 'Tasa Mínima',
                            data: [35.10, 35.40, 35.80, 35.90, 36.00, 36.30, 36.60],
                            borderColor: 'rgb(239, 68, 68)',
                            borderWidth: 2,
                            pointRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Tasa USD/VES'
                            },
                            ticks: {
                                precision: 2
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });

            // Gráfico de Ganancias Diarias
            new Chart(volumeChartCanvas, {
                type: 'line',
                data: {
                    labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
                    datasets: [{
                        label: 'Ganancias Diarias (USD)',
                        data: [1250, 1480, 1890, 1654, 1820, 1340, 980],
                        borderColor: 'rgb(16, 185, 129)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `$ ${context.parsed.y.toFixed(2)}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$ ' + value;
                                }
                            }
                        }
                    }
                }
            });
        }
    });
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if $operationStore.isOperationInProgress}
        <!-- Mostrar el componente de operación actual -->
        <svelte:component this={$currentOperationComponent} />
    {:else}
        <!-- Vista normal del dashboard -->
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-gray-900">Panel de Operaciones</h1>
            <p class="mt-2 text-sm text-gray-500">
                Seleccione el tipo de operación que desea realizar
            </p>
        </div>

        <!-- Operation Selector -->
        <div class="mb-8">
            <OperationSelector />
        </div>

        <!-- Stats Section -->
        <div class="mb-8">
            <DashboardStats />
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Tasas USD/VES</h3>
                <div class="h-64">
                    <canvas bind:this={operationsChartCanvas}></canvas>
                </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Ganancias Diarias</h3>
                <div class="h-64">
                    <canvas bind:this={volumeChartCanvas}></canvas>
                </div>
            </div>
        </div>
    {/if}
</div>