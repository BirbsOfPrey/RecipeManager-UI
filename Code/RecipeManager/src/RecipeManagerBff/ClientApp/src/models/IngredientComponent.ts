import { Ingredient } from "./Ingredient"

export const NO_INDEX = -1

export class IngredientComponent {
    id?: number
    amount?: number
    physicalQuantity?: string
    ingredient?: Ingredient
}

export function createIngredientComponents() {
    return [] as IngredientComponent[]
}

export function createIngredientComponent() {
    return new IngredientComponent()
}

export function calculateIngredientAmount(ingredientComponent: IngredientComponent, personRefAmount: number, personAmount: number): number {
    if (ingredientComponent.amount && personRefAmount > 0 && personAmount > 0) {
        return ingredientComponent.amount / personRefAmount * personAmount
    } else {
        return 0
    }
}