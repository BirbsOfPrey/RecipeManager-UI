export class IngredientValidator {

    static validateName(name?: string): boolean {
        if (name) {
            return name.length > 0
        }
        return false
    }
}