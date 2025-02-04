import type { OperationType } from './types';
import { OperationFactory } from './base/OperationFactory';
import { SaleOperation } from './sale/SaleOperation';
import { SwapOperation } from './swap/SwapOperation';

// Registrar las operaciones disponibles
OperationFactory.register('sale', SaleOperation, {
    stage1: () => import('./sale/components/SaleStage1.svelte'),
    stage2: () => import('./sale/components/SaleStage2.svelte'),
    stage3: () => import('./sale/components/SaleStage3.svelte')
});

OperationFactory.register('swap', SwapOperation, {
    stage1: () => import('./swap/components/SwapStage1.svelte'),
    results: () => import('./swap/components/SwapResults.svelte')
});

// Obtener una operación por tipo
export function getOperation(type: OperationType) {
    return OperationFactory.createOperation(type);
}