import { writable, derived } from 'svelte/store';
import type { OperationState } from '../operations/types';
import { OperationType } from '../operations/types';
import { OperationFactory } from '../operations/base/OperationFactory';

// Store principal para el estado de las operaciones
export const operationStore = writable<OperationState>({
    currentOperation: null,
    isOperationInProgress: false,
    currentStage: 1,
    data: {}
});

// Configuración de las operaciones disponibles
export const operationsConfig = {
    [OperationType.SALE]: {
        isEnabled: true,
        title: 'Venta de Divisas',
        description: 'Gestionar operaciones de venta de divisas',
        icon: '💱',
        maxStages: 3
    },
    [OperationType.SWAP]: {
        isEnabled: false,
        title: 'Canje de Divisas',
        description: 'Esta función estará disponible próximamente',
        icon: '🔄',
        maxStages: 2
    }
};

// Store derivado para el componente actual
export const currentOperationComponent = derived(
    operationStore,
    ($operationStore) => {
        if (!$operationStore.currentOperation || !$operationStore.isOperationInProgress) {
            return null;
        }

        try {
            return OperationFactory.getOperationComponent(
                $operationStore.currentOperation,
                `Stage${$operationStore.currentStage}`
            );
        } catch (error) {
            console.error('Error al obtener el componente:', error);
            return null;
        }
    }
);

// Acciones del store
export const operationActions = {
    startOperation: (type: OperationType) => {
        if (!operationsConfig[type].isEnabled) {
            throw new Error('Esta operación no está disponible actualmente');
        }

        operationStore.update(state => ({
            ...state,
            currentOperation: type,
            isOperationInProgress: true,
            currentStage: 1,
            data: {}
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

    resetOperation: () => {
        operationStore.set({
            currentOperation: null,
            isOperationInProgress: false,
            currentStage: 1,
            data: {}
        });
    },

    cancelOperation: () => {
        operationStore.set({
            currentOperation: null,
            isOperationInProgress: false,
            currentStage: 1,
            data: {}
        });
    }
};