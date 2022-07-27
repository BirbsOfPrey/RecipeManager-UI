import { Ingredient } from "./Ingredient"

export class IngredientComponent {
    id?: number
    amount?: number
    physicalQuantity?: string
    ingredient?: Ingredient
}

export function createIngredientComponent() {
    return new IngredientComponent()
}