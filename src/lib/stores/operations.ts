import { writable, derived, get } from 'svelte/store';
import type { OperationState } from '../operations/types';
import { OperationType } from '../operations/types';
import { OperationFactory } from '../operations/base/OperationFactory';

// Tipos de validación para los stages
interface StageValidation {
    isValid: boolean;
    errors: string[];
}

// Extender OperationState para incluir validaciones
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

// Configuración de las operaciones disponibles
export const operationsConfig = {
    [OperationType.SALE]: {
        title: 'Venta de Divisas',
        description: 'Gestionar operaciones de venta de divisas',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
        isEnabled: true,
        bgColor: 'bg-blue-500',
        textColor: 'text-blue-500',
        gradientColors: 'from-blue-500 to-blue-600'
    },
    [OperationType.SWAP]: {
        title: 'Canje de Divisas',
        description: 'Esta función estará disponible próximamente',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />',
        isEnabled: false,
        bgColor: 'bg-emerald-500',
        textColor: 'text-emerald-500',
        gradientColors: 'from-emerald-500 to-emerald-600'
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
    },

    validateStage: (stageData: Record<string, any>): StageValidation => {
        const currentOperation = get(operationStore).currentOperation;
        const currentStage = get(operationStore).currentStage;

        if (currentOperation === OperationType.SALE) {
            switch (currentStage) {
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
    // Validaciones para el stage 3 si son necesarias
    return { isValid: true, errors: [] };
}