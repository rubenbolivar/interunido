export interface BaseOperationConfig {
    maxStages: number;
    title: string;
    description: string;
    icon: string;
    isEnabled: boolean;
    operationType?: OperationType;
}

export interface OperationState {
    currentStage: number;
    type: OperationType | null;
    amountToSell: number;
    clientRate: number;
    clientName: string;
    currencyType: string;
    transactions: Transaction[];
}

export type OperationType = 'sale' | 'purchase' | 'swap';

export interface OperationResult {
    success: boolean;
    message: string;
    data?: any;
}

export interface Transaction {
    id: number;
    operatorName: string;
    amount: number;
    rate: number;  // Tasa general
    saleRate: number;  // Tasa de venta específica
    officeRate: number;
    bankCommission: number;
    offices: {
        PZO: boolean;
        CCS: boolean;
    };
    arbitraryCommissions: any[];
    date: Date;
}

export interface ArbitraryCommission {
    name: string;
    percentage: number;
}

export interface StageValidation {
    isValid: boolean;
    errors: string[];
} 