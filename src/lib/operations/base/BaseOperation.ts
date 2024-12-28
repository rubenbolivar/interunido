import type { BaseOperationConfig, OperationResult, Transaction } from '../types';

export abstract class BaseOperation {
    protected transactions: Transaction[] = [];
    
    protected constructor(protected config: BaseOperationConfig) {}

    abstract validate(): OperationResult;
    abstract calculate(): OperationResult;
    abstract save(): Promise<OperationResult>;
    abstract setData(data: Record<string, any>): void;
    
    getMetadata() {
        return {
            title: this.config.title,
            description: this.config.description,
            icon: this.config.icon,
            maxStages: this.config.maxStages
        };
    }

    isEnabled(): boolean {
        return this.config.isEnabled;
    }

    getTransactions(): Transaction[] {
        return this.transactions;
    }

    protected addTransaction(transaction: Transaction) {
        this.transactions.push(transaction);
    }
}