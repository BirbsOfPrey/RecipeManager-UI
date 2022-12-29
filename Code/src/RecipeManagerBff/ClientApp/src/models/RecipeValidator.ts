import { Recipe } from "./Recipe"

export class RecipeValidator {
    static minPersonRefAmount: number = 1
    static maxPersonRefAmount: number = 1000
    static maxDescriptionLength: number = 200

    static validate(recipe: Recipe): boolean {
        return this.validateName(recipe.name)
            && this.validateDescription(recipe.description)
            && this.validatePersonRefAmount(recipe.personRefAmount)
    }

    static validateName(name?: string): boolean {
        if (name) {
            return name.length > 3
        }
        return false
    }

    static validateDescription(description?: string): boolean {
        if (description) {
            return description.length < RecipeValidator.maxDescriptionLength
        }
        return true
    }

    static validatePersonRefAmount(value?: number): boolean {
        if (value) {
            return value >= RecipeValidator.minPersonRefAmount && value <= RecipeValidator.maxPersonRefAmount
        }
        return false
    }
}