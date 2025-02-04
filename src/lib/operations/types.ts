// Definir como enum o const object para poder usarlo como valor
export const OperationType = {
    SALE: 'sale' as const,
    SWAP: 'swap' as const
};

// Tipo derivado del objeto
export type OperationTypeValue = typeof OperationType[keyof typeof OperationType];

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
    type: OperationTypeValue;
    data: Record<string, any>;
    currentStage: number;
} 