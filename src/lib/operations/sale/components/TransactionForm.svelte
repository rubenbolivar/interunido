<script lang="ts">
  import { operationStore, operationActions } from '$lib/stores/operations';
  import type { Transaction } from '$lib/operations/types';

  let transaction: Transaction = {
    id: 0,
    operatorName: '',
    amount: 0,
    rate: 0,
    saleRate: 0,
    officeRate: 0,
    bankCommission: 0,
    offices: {
      PZO: false,
      CCS: false
    },
    arbitraryCommissions: [],
    date: new Date()
  };

  function handleSubmit() {
    operationActions.updateOperationData({
      transactions: [...($operationStore?.transactions || []), transaction]
    });
    operationActions.nextStage();
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <div>
    <label for="operatorName" class="block text-sm font-medium text-gray-700">
      Nombre del Operador
    </label>
    <input
      type="text"
      id="operatorName"
      bind:value={transaction.operatorName}
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      required
    />
  </div>

  <div>
    <label for="amount" class="block text-sm font-medium text-gray-700">
      Monto
    </label>
    <input
      type="number"
      id="amount"
      bind:value={transaction.amount}
      min="0"
      step="0.01"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      required
    />
  </div>

  <div>
    <label for="saleRate" class="block text-sm font-medium text-gray-700">
      Tasa de Venta
    </label>
    <input
      type="number"
      id="saleRate"
      bind:value={transaction.saleRate}
      min="0"
      step="0.01"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      required
    />
  </div>

  <div>
    <label for="officeRate" class="block text-sm font-medium text-gray-700">
      Tasa de Oficina
    </label>
    <input
      type="number"
      id="officeRate"
      bind:value={transaction.officeRate}
      min="0"
      step="0.01"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      required
    />
  </div>

  <div>
    <label for="bankCommission" class="block text-sm font-medium text-gray-700">
      Comisión Bancaria
    </label>
    <input
      type="number"
      id="bankCommission"
      bind:value={transaction.bankCommission}
      min="0"
      step="0.01"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      required
    />
  </div>

  <div class="space-y-2">
    <span class="block text-sm font-medium text-gray-700">Oficinas</span>
    <div class="flex gap-4">
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          bind:checked={transaction.offices.PZO}
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <span class="ml-2">Puerto Ordaz</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          bind:checked={transaction.offices.CCS}
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <span class="ml-2">Caracas</span>
      </label>
    </div>
  </div>

  <div class="flex justify-end">
    <button
      type="submit"
      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Agregar Transacción
    </button>
  </div>
</form> 