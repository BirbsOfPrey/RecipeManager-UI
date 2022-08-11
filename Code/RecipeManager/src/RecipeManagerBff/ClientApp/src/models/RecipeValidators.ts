export class RecipeValidators {
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
            return value >= RecipeValidators.minPersonRefAmount && value <= RecipeValidators.maxPersonRefAmount
        }
        return false
    }
}