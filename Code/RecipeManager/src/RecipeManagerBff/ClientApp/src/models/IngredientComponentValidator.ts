export class IngredientComponentValidator {
    static minAmount: number = 0

    static validateAmount(amount?: number): boolean {
        if (amount === undefined || amount < 0) {
            return false
        }
        return amount >= IngredientComponentValidator.minAmount
    }
}