import { writable, derived } from 'svelte/store';
import { OperationType } from '$lib/operations/types';
import type { StageValidation, BaseOperationConfig } from '$lib/operations/types';

// Definir la interfaz OperationState localmente
interface OperationState {
    currentStage: number;
    data: Record<string, any>;
    type: OperationType;
    validation: StageValidation;
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
    const { subscribe, set, update } = writable<OperationState | null>(null);

    return {
        subscribe,
        startOperation: (type: OperationType) => {
            set({
                currentStage: 1,
                data: {},
                type,
                validation: { isValid: false, errors: [] }
            });
        },
        updateOperationData: (data: Record<string, any>) => {
            update(state => {
                if (!state) return state;
                return {
                    ...state,
                    data: { ...state.data, ...data }
                };
            });
        },
        validateStage: (data: Record<string, any>) => {
            // Implementar lógica de validación según los datos
            const isValid = data.clientName && data.clientId;
            return { 
                isValid, 
                errors: isValid ? [] : ['Datos del cliente incompletos'] 
            };
        },
        updateStageValidation: (validation: StageValidation) => {
            update(state => {
                if (!state) return state;
                return {
                    ...state,
                    validation
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
    startOperation: operationStore.startOperation,
    updateOperationData: operationStore.updateOperationData,
    validateStage: operationStore.validateStage,
    updateStageValidation: operationStore.updateStageValidation,
    nextStage: operationStore.nextStage,
    reset: operationStore.reset
}; 