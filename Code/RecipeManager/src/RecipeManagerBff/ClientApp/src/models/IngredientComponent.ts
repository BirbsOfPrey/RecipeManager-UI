import { Ingredient } from "./Ingredient"

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