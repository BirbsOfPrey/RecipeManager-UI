export class IngredientValidator {

    static validateName(name: string): boolean {
        return name.length > 0
    }
}