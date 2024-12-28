import type { OperationType } from '../types';
import type { BaseOperation } from './BaseOperation';

type OperationConstructor = new () => BaseOperation;

export class OperationFactory {
    private static operations = new Map<OperationType, OperationConstructor>();
    private static components = new Map<OperationType, Record<string, any>>();

    static register(
        type: OperationType, 
        operation: OperationConstructor,
        components: Record<string, any>
    ) {
        this.operations.set(type, operation);
        this.components.set(type, components);
    }

    static createOperation(type: OperationType): BaseOperation {
        const OperationClass = this.operations.get(type);
        if (!OperationClass) {
            throw new Error(`Operation type ${type} not registered`);
        }
        return new OperationClass();
    }

    static getOperationComponent(type: OperationType, stage: string): any {
        const components = this.components.get(type);
        if (!components || !components[stage]) {
            throw new Error(`Component not found for operation ${type} and stage ${stage}`);
        }
        return components[stage];
    }
}