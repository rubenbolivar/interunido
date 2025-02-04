// Tipos de operaciones disponibles
export const OperationType = {
    SALE: 'sale',
    SWAP: 'swap'
} as const;

export type OperationType = typeof OperationType[keyof typeof OperationType];

// Tipo para transacciones
export interface Transaction {
    id?: string;
    amount: number;
    currency: string;
    operatorName: string;
    rate: number;
    bankCommission: number;
    offices: string[];
    sourceCurrency?: string;
    targetCurrency?: string;
}

// Tipo para el estado de la operación
export interface OperationState {
    type: OperationType;
    data: Transaction;
    currentStage: number;
} 