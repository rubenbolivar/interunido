import { writable } from 'svelte/store';
import type { BaseOperationConfig, StageValidation, Transaction, OperationType } from '$lib/operations/types';

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
        reset: () => set(null)
    };
};

export const operationStore = createOperationStore();

// Acciones de operación
export const operationActions = {
    startOperation: operationStore.startOperation,
    updateOperationData: operationStore.updateOperationData,
    validateStage: operationStore.validateStage,
    updateStageValidation: operationStore.updateStageValidation,
    nextStage: operationStore.nextStage,
    reset: operationStore.reset
}; 