export enum OperationType {
    SALE = 'SALE',
    SWAP = 'SWAP'
}

export interface StageValidation {
    isValid: boolean;
    errors: string[];
}

export interface BaseOperationConfig {
    type: OperationType;
    isEnabled: boolean;
    title: string;
    description: string;
    icon: string;
}

export interface OperationState {
    currentStage: number;
    data: Record<string, any>;
    type: OperationType;
} 