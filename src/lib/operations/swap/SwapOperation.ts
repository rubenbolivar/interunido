import { BaseOperation } from '../base/BaseOperation';
import type { BaseOperationConfig, OperationResult } from '../types';
import { OperationType } from '../types';

interface SwapData {
    fromAmount: number;
    fromCurrency: string;
    toCurrency: string;
    clientName: string;
    clientId: string;
}

export class SwapOperation extends BaseOperation {
    private data: SwapData | null = null;

    constructor() {
        const config: BaseOperationConfig = {
            type: OperationType.SWAP,
            isEnabled: false, // Inicialmente deshabilitado
            title: 'Canje de Divisas',
            description: 'Esta función estará disponible próximamente',
            icon: '🔄',
            maxStages: 2
        };
        super(config);
    }

    setData(data: SwapData) {
        this.data = data;
    }

    validate(): OperationResult {
        return {
            success: false,
            data: null,
            error: 'Operación no disponible actualmente'
        };
    }

    calculate(): OperationResult {
        return {
            success: false,
            data: null,
            error: 'Operación no disponible actualmente'
        };
    }

    async save(): Promise<OperationResult> {
        return {
            success: false,
            data: null,
            error: 'Operación no disponible actualmente'
        };
    }
}