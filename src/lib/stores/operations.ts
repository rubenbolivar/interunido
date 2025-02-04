import { writable, derived } from 'svelte/store';
import { OperationType } from '$lib/operations/types';
import type { StageValidation, OperationState, BaseOperationConfig } from '$lib/operations/types';

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
    const { subscribe, set, update } = writable<OperationState | null>(null);

    return {
        subscribe,
        startOperation: (type: OperationType) => {
            set({
                currentStage: 1,
                data: {},
                type
            });
        },
        updateData: (data: Record<string, any>) => {
            update(state => {
                if (!state) return state;
                return {
                    ...state,
                    data: { ...state.data, ...data }
                };
            });
        },
        nextStage: () => {
            update(state => {
                if (!state) return state;
                return {
                    ...state,
                    currentStage: state.currentStage + 1
                };
            });
        },
        reset: () => set(null)
    };
};

export const operationStore = createOperationStore();

// Acciones de operación
export const operationActions = {
    startOperation: (type: OperationType) => {
        operationStore.startOperation(type);
    },
    updateOperationData: (data: Record<string, any>) => {
        operationStore.updateData(data);
    },
    nextStage: () => {
        operationStore.nextStage();
    },
    reset: () => {
        operationStore.reset();
    }
}; 