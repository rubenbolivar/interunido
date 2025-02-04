import type { BaseOperationConfig, OperationResult, Transaction } from '../types';

export abstract class BaseOperation<T = any> {
    protected transactions: Transaction[] = [];
    protected data: T | null = null;
    private config: BaseOperationConfig;
    
    constructor(config: BaseOperationConfig) {
        this.config = config;
    }

    getConfig(): BaseOperationConfig {
        return this.config;
    }

    abstract validate(): OperationResult;
    abstract calculate(): OperationResult;
    abstract save(): Promise<OperationResult>;
    abstract setData(data: T): void;
    
    getData(): T | null {
        return this.data;
    }

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

    abstract validateStage(stage: number): OperationResult;
}