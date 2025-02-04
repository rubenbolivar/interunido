export enum OperationType {
    SALE = 'SALE',
    SWAP = 'SWAP'
}

// Tipos de validación para los stages
export interface StageValidation {
    isValid: boolean;
    errors: string[];
}

// Definir la interfaz OperationState
export interface OperationState {
    currentOperation: OperationType | null;
    isOperationInProgress: boolean;
    currentStage: number;
    data: Record<string, any>;
    validation: StageValidation;
}

export interface BaseOperationConfig {
    type: OperationType;
    isEnabled: boolean;
    title: string;
    description: string;
    icon: string;
    maxStages: number;
}

export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    rate: number;
    timestamp: Date;
}

export interface OperationResult {
    success: boolean;
    data: any;
    error?: string;
}