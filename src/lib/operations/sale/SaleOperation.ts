import { BaseOperation } from '../base/BaseOperation';
import type { BaseOperationConfig, OperationResult, Transaction } from '../types';
import type { OperationType } from '../types';

interface SaleData {
    clientName: string;
    amount: number;
    currencyType: string;
    clientRate: number;
}

export class SaleOperation extends BaseOperation {
    protected transactions: Transaction[] = [];
    protected operationData: SaleData | null = null;

    constructor() {
        const config: BaseOperationConfig = {
            title: 'Venta de Divisas',
            description: 'Gestionar operaciones de venta de divisas',
            icon: '💱',
            maxStages: 3,
            isEnabled: true
        };
        super(config);
    }

    validate(): OperationResult {
        const stage = this.getCurrentStage();
        const data = this.getData();
        
        switch(stage) {
            case 1:
                return this.validateStage1(data as SaleData);
            case 2:
                return this.validateStage2(data as Transaction);
            case 3:
                return this.validateStage3(data);
            default:
                return {
                    success: false,
                    message: 'Etapa inválida'
                };
        }
    }

    setData(data: Record<string, any>): void {
        if (this.getCurrentStage() === 1) {
            this.operationData = data as SaleData;
        } else if (this.getCurrentStage() === 2) {
            this.transactions.push(data as Transaction);
        }
    }

    getData(): Record<string, any> {
        switch(this.getCurrentStage()) {
            case 1:
                return this.operationData || {};
            case 2:
                return this.transactions;
            default:
                return {};
        }
    }

    protected validateStage1(data: SaleData): OperationResult {
        if (!data.clientName) {
            return {
                success: false,
                message: 'El nombre del cliente es requerido'
            };
        }

        if (!data.amount || data.amount <= 0) {
            return {
                success: false,
                message: 'El monto debe ser mayor a 0'
            };
        }

        if (!data.currencyType) {
            return {
                success: false,
                message: 'Debe seleccionar un tipo de divisa'
            };
        }

        return {
            success: true,
            message: 'Datos válidos',
            data
        };
    }

    protected validateStage2(transaction: Transaction): OperationResult {
        if (!transaction.operatorName) {
            return {
                success: false,
                message: 'El nombre del operador es requerido'
            };
        }

        const transactionId = this.transactions.length + 1;
        transaction.id = transactionId;

        const totalAmount = this.transactions.reduce((sum: number, t: Transaction) => sum + t.amount, 0) + transaction.amount;

        if (totalAmount > (this.operationData?.amount || 0)) {
            return {
                success: false,
                message: 'El monto total excede el monto a vender'
            };
        }

        return {
            success: true,
            message: 'Transacción válida',
            data: { transaction, totalAmount }
        };
    }

    protected validateStage3(data: any): OperationResult {
        try {
            return {
                success: true,
                message: 'Operación completada',
                data
            };
        } catch (err) {
            return {
                success: false,
                message: err instanceof Error ? err.message : 'Error desconocido'
            };
        }
    }

    protected getCurrentStage(): number {
        return 1; // TODO: Implementar lógica real
    }

    calculate(): OperationResult {
        if (!this.data) {
            return {
                success: false,
                data: null,
                error: 'No hay datos para calcular'
            };
        }

        const transaction: Transaction = {
            id: crypto.randomUUID(),
            amount: this.data.amount,
            currency: this.data.currencyType,
            rate: this.data.clientRate,
            timestamp: new Date()
        };

        this.addTransaction(transaction);

        return {
            success: true,
            data: {
                transaction,
                totalAmount: this.data.amount * this.data.clientRate
            }
        };
    }

    async save(): Promise<OperationResult> {
        try {
            // Aquí iría la lógica para guardar en la base de datos
            const result = await fetch('/api/operations/sale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: this.data,
                    transactions: this.getTransactions()
                })
            });

            if (!result.ok) {
                throw new Error('Error al guardar la operación');
            }

            return {
                success: true,
                data: await result.json()
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
        }
    }
}