import { writable, derived, get } from 'svelte/store';
import type { OperationType, StageValidation, OperationState } from '$lib/operations/types';

// Tipos de validación para los stages
interface StageValidation {
    isValid: boolean;
    errors: string[];
}

// Definir la interfaz OperationState
interface OperationState {
    currentOperation: OperationType | null;
    isOperationInProgress: boolean;
    currentStage: number;
    data: Record<string, any>;
    validation: StageValidation;
}

// Store principal actualizado
export const operationStore = writable<OperationState>({
    currentOperation: null,
    isOperationInProgress: false,
    currentStage: 1,
    data: {},
    validation: {
        isValid: false,
        errors: []
    }
});

// Configuración de operaciones
export const operationsConfig = [
    {
        type: OperationType.SALE,
        title: 'Venta de Divisas',
        description: 'Realizar una venta de divisas',
        icon: 'dollar-sign'
    },
    {
        type: OperationType.SWAP,
        title: 'Intercambio',
        description: 'Realizar un intercambio de divisas',
        icon: 'refresh'
    }
] as const;

// Acciones del store
export const operationActions = {
    startOperation: (type: OperationType) => {
        operationStore.update(state => ({
            ...state,
            currentOperation: type,
            isOperationInProgress: true,
            currentStage: 1,
            data: {},
            validation: { isValid: false, errors: [] }
        }));
    },

    nextStage: () => {
        operationStore.update(state => ({
            ...state,
            currentStage: state.currentStage + 1
        }));
    },

    previousStage: () => {
        operationStore.update(state => ({
            ...state,
            currentStage: Math.max(1, state.currentStage - 1)
        }));
    },

    updateData: (data: Record<string, any>) => {
        operationStore.update(state => ({
            ...state,
            data: { ...state.data, ...data }
        }));
    },

    validateStage: (stageData: Record<string, any>): StageValidation => {
        const state = get(operationStore);
        if (state.currentOperation === OperationType.SALE) {
            switch (state.currentStage) {
                case 1:
                    return validateSaleStage1(stageData);
                case 2:
                    return validateSaleStage2(stageData);
                case 3:
                    return validateSaleStage3(stageData);
                default:
                    return { isValid: false, errors: ['Stage inválido'] };
            }
        }
        return { isValid: false, errors: ['Operación no soportada'] };
    },

    updateStageValidation: (validation: StageValidation) => {
        operationStore.update(state => ({
            ...state,
            validation
        }));
    },

    resetOperation: () => {
        operationStore.set({
            currentOperation: null,
            isOperationInProgress: false,
            currentStage: 1,
            data: {},
            validation: { isValid: false, errors: [] }
        });
    },

    cancelOperation: () => {
        operationStore.set({
            currentOperation: null,
            isOperationInProgress: false,
            currentStage: 1,
            data: {},
            validation: { isValid: false, errors: [] }
        });
    }
};

// Funciones de validación específicas
function validateSaleStage1(data: Record<string, any>): StageValidation {
    const errors: string[] = [];
    
    if (!data.clientName?.trim()) {
        errors.push('El nombre del cliente es requerido');
    }
    if (!data.clientId?.trim()) {
        errors.push('El ID del cliente es requerido');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

function validateSaleStage2(data: Record<string, any>): StageValidation {
    const errors: string[] = [];
    
    if (!data.amount || data.amount <= 0) {
        errors.push('El monto debe ser mayor a 0');
    }
    if (!data.currency) {
        errors.push('La moneda es requerida');
    }
    if (!data.clientRate || data.clientRate <= 0) {
        errors.push('La tasa del cliente es requerida');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

function validateSaleStage3(data: Record<string, any>): StageValidation {
    return { isValid: true, errors: [] };
}