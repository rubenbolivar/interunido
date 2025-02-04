import { writable } from 'svelte/store';
import type { BaseOperationConfig, StageValidation, Transaction, OperationType, OperationState } from '$lib/operations/types';

// Definir la interfaz OperationState localmente
interface OperationState {
    currentStage: number;
    operationType: OperationType | null;
    amountToSell: number;
    clientRate: number;
    clientName: string;
    currencyType: string;
    transactions: Transaction[];
}

// Configuración de operaciones
export const operationsConfig: BaseOperationConfig[] = [
    {
        type: OperationType.SALE,
        isEnabled: true,
        title: 'Venta de Divisas',
        description: 'Realizar una venta de divisas',
        icon: 'dollar-sign',
    },
    {
        type: OperationType.SWAP,
        isEnabled: true,
        title: 'Intercambio de Divisas',
        description: 'Realizar un intercambio entre diferentes divisas',
        icon: 'refresh-cw',
    }
];

export interface OperationActions {
    startOperation: (operationType: OperationType) => void;
    updateOperationData: (data: Record<string, any>) => void;
    validateStage: (data: Record<string, any>) => StageValidation;
    updateStageValidation: (validation: StageValidation) => void;
    nextStage: () => void;
    previousStage: () => void;
    resetOperation: () => void;
    reset: () => void;
}

export const operationStore = writable<OperationState | null>(null);

// Estado de la operación actual
const createOperationStore = () => {
    const initialState: OperationState = {
        currentStage: 1,
        operationType: null,
        amountToSell: 0,
        clientRate: 0,
        clientName: '',
        currencyType: '',
        transactions: []
    };

    const { subscribe, set, update } = writable<OperationState | null>(null);

    const startOperation = (operationType: OperationType) => {
        set({ ...initialState, operationType });
    };

    return {
        subscribe,
        startOperation,
        updateOperationData: (data: Record<string, any>) => {
            update(state => {
                if (!state) return state;
                return { ...state, ...data };
            });
        },
        validateStage: (data: Record<string, any>) => {
            // Implementación de validación
            return { isValid: true, errors: [] } as StageValidation;
        },
        updateStageValidation: (validation: StageValidation) => {
            update(state => {
                if (!state) return state;
                return { ...state, validation };
            });
        },
        nextStage: () => {
            update(state => {
                if (!state) return state;
                return { ...state, currentStage: state.currentStage + 1 };
            });
        },
        previousStage: () => {
            update(state => {
                if (!state) return state;
                return { ...state, currentStage: state.currentStage - 1 };
            });
        },
        resetOperation: () => {
            set(null);
        },
        reset: () => set(null)
    };
};

// Crear las acciones del store
export const operationActions: OperationActions = {
    startOperation: (type) => {
        operationStore.set({
            type,
            data: {},
            currentStage: 1
        });
    },
    // ... resto de las implementaciones
}; 