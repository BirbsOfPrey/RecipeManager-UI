export class IngredientComponentValidator {
    static minAmount: number = 0

    static validateAmount(amount?: number): boolean {
        if (amount) {
            return amount >= IngredientComponentValidator.minAmount
        }
        return false
    }
}