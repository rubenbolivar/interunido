export interface ArbitraryCommission {
  name: string;
  percentage: number;
}

export interface Transaction {
  id: number;
  operatorName: string;
  amount: number;
  saleRate: number;
  officeRate: number | null;
  bankCommission: number;
  offices: {
    PZO: boolean;
    CCS: boolean;
  };
  arbitraryCommissions: ArbitraryCommission[];
} 