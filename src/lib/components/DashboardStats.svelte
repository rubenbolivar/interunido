<script lang="ts">
    // Aquí irán los datos de ejemplo (luego vendrán de la API)
    const stats = [
        { name: 'Operaciones Hoy', value: '24', change: '+12%', changeType: 'increase' },
        { name: 'Volumen USD', value: '$45,231', change: '+8.2%', changeType: 'increase' },
        { name: 'Volumen EUR', value: '€12,345', change: '-3.1%', changeType: 'decrease' },
        { name: 'Tasa Promedio', value: '35.62', change: '+2.3%', changeType: 'increase' }
    ];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {#each stats as stat}
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-500">{stat.name}</h3>
                <div class={`flex items-center text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                    {#if stat.changeType === 'increase'}
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    {:else}
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                        </svg>
                    {/if}
                    {stat.change}
                </div>
            </div>
            <p class="mt-2 text-2xl font-semibold text-gray-900">{stat.value}</p>
        </div>
    {/each}
</div>