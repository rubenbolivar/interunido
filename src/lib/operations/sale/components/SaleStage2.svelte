<script lang="ts">
    import { operationStore, operationActions } from '$lib/stores/operations';
    import TransactionForm from './TransactionForm.svelte';
    import type { Transaction } from '$lib/operations/types';
    
    $: transactions = $operationStore?.transactions || [];
    $: totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    $: remainingAmount = ($operationStore?.amountToSell || 0) - totalAmount;
</script>

<div class="space-y-6">
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Transacciones</h3>
                <p class="mt-1 text-sm text-gray-500">
                    Agregue las transacciones necesarias para completar la venta.
                </p>
                <div class="mt-4 space-y-2">
                    <p class="text-sm text-gray-500">
                        Monto total a vender: ${$operationStore?.amountToSell || 0}
                    </p>
                    <p class="text-sm text-gray-500">
                        Monto restante: ${remainingAmount}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <TransactionForm />
            </div>
        </div>
    </div>

    {#if transactions.length > 0}
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
                {#each transactions as transaction}
                    <li>
                        <div class="px-4 py-4 sm:px-6">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-indigo-600 truncate">
                                    {transaction.operatorName}
                                </p>
                                <div class="ml-2 flex-shrink-0 flex">
                                    <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        ${transaction.amount}
                                    </p>
                                </div>
                            </div>
                            <div class="mt-2 sm:flex sm:justify-between">
                                <div class="sm:flex">
                                    <p class="flex items-center text-sm text-gray-500">
                                        Tasa: {transaction.rate}
                                    </p>
                                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                        Comisión: {transaction.bankCommission}
                                    </p>
                                </div>
                                <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <p>
                                        Oficinas: {Object.entries(transaction.offices)
                                            .filter(([_, value]) => value)
                                            .map(([key]) => key)
                                            .join(', ')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>