export class RecipeValidators {
    static validateName(name?: string): boolean {
        if (name) {
            return name.length > 3
        }
        return false
    }
}