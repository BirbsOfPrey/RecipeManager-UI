export class RecipeValidator {
    static minPersonRefAmount: number = 1
    static maxPersonRefAmount: number = 1000

    static validateName(name?: string): boolean {
        if (name) {
            return name.length > 3
        }
        return false
    }

    static validatePersonRefAmount(value?: number): boolean {
        if (value) {
            return value >= RecipeValidator.minPersonRefAmount && value <= RecipeValidator.maxPersonRefAmount
        }
        return false
    }
}