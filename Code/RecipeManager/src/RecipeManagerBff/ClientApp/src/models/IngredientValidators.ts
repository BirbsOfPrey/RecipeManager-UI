export class IngredientValidators {

    static validateName(name?: string): boolean {
        if (name) {
            return name.length > 0
        }
        return false
    }
}