export class RecipeImportValidator {
    static minImportAmount: number = 1
    static maxImportAmount: number = 10

    static validateImportAmount(value?: number): boolean {
        if (value) {
            return value >= RecipeImportValidator.minImportAmount && value <= RecipeImportValidator.maxImportAmount
        }
        return false
    }
}