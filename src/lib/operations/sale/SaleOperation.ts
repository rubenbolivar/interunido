import { BaseOperation } from '../base/BaseOperation';
import type { BaseOperationConfig, OperationResult, Transaction } from '../types';
import { OperationType } from '../types';

interface SaleData {
    amount: number;
    currency: string;
    clientRate: number;
    clientName: string;
    clientId: string;
}

export class SaleOperation extends BaseOperation {
    private data: SaleData | null = null;

    constructor() {
        const config: BaseOperationConfig = {
            type: OperationType.SALE,
            isEnabled: true,
            title: 'Venta de Divisas',
            description: 'Gestionar operaciones de venta de divisas',
            icon: '💱',
            maxStages: 3
        };
        super(config);
    }

    setData(data: SaleData) {
        this.data = data;
    }

    validate(): OperationResult {
        if (!this.data) {
            return {
                success: false,
                data: null,
                error: 'No hay datos para validar'
            };
        }

        if (this.data.amount <= 0) {
            return {
                success: false,
                data: null,
                error: 'El monto debe ser mayor a 0'
            };
        }

        return {
            success: true,
            data: this.data
        };
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
            currency: this.data.currency,
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