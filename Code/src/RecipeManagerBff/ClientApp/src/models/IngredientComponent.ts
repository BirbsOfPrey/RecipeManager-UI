import { immerable } from "immer"
import { precisionRound } from "./helper/MathHelper"
import { createIngredient, Ingredient } from "./Ingredient"

export class IngredientComponent {
    [immerable]: boolean = true

    id?: number
    amount?: number
    physicalQuantity?: string
    ingredient: Ingredient

    constructor() {
        this.ingredient = createIngredient()
    }
}

export function createIngredientComponents() {
    return [] as IngredientComponent[]
}

export function createIngredientComponent() {
    return new IngredientComponent()
}

export function calculateIngredientAmount(ingredientComponent: IngredientComponent, personRefAmount: number, personAmount: number): number {
    if (ingredientComponent.amount && personRefAmount > 0 && personAmount > 0) {
        return precisionRound(ingredientComponent.amount / personRefAmount * personAmount, 2)
    } else {
        return 0
    }
}