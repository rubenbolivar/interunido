import { OperationType } from './types';
import { OperationFactory } from './base/OperationFactory';
import { SaleOperation } from './sale/SaleOperation';
import { SwapOperation } from './swap/SwapOperation';

// Importar componentes de venta
import SaleStage1 from './sale/components/SaleStage1.svelte';
import SaleStage2 from './sale/components/SaleStage2.svelte';
import SaleStage3 from './sale/components/SaleStage3.svelte';

// Importar componentes de canje
import SwapStage1 from './swap/components/SwapStage1.svelte';
import SwapResults from './swap/components/SwapResults.svelte';

// Registrar operación de venta
OperationFactory.register(
    OperationType.SALE,
    SaleOperation,
    {
        Stage1: SaleStage1,
        Stage2: SaleStage2,
        Stage3: SaleStage3
    }
);

// Registrar operación de canje
OperationFactory.register(
    OperationType.SWAP,
    SwapOperation,
    {
        Stage1: SwapStage1,
        Stage2: SwapResults
    }
);

// Exportar para asegurar que el registro se ejecute
export const registerOperations = () => {
    // El registro ya se ha realizado al importar este módulo
    console.log('Operaciones registradas correctamente');
};