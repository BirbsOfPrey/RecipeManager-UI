export class IngredientComponentValidators {
    static minAmount: number = 0

    static validateAmount(amount?: number): boolean {
        if (amount) {
            return amount >= IngredientComponentValidators.minAmount
        }
        return false
    }
}