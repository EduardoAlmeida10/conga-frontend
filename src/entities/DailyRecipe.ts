import type { DailyProduction } from "@/api/productions/productions";
import type { SalePrice } from "@/api/sale-price/salePrice";

export interface DailyRecipe {
  id: string;
  total: number;
  tanque: number;
  precoLeite: number;
  date: Date;
}

export function mapDailyProductionToRecipe(
    productionData: DailyProduction[], 
    salePrice: SalePrice | null,
): DailyRecipe[] {
    
    const currentPrice = salePrice ? salePrice.value : 0; 
    
    return productionData.map(item => {
        const totalLiters = parseFloat(item.totalQuantity.toString()) + parseFloat(item.totalProducers.toString());
        const calculatedTotal = totalLiters * currentPrice;

        return {
            id: item.date,
            total: calculatedTotal,
            tanque: totalLiters,
            precoLeite: currentPrice,
            date: new Date(item.date),
        };
    });
}