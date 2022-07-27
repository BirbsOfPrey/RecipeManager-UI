export class Ingredient {
    id?: number
    name?: string
}

export function createIngredient() {
    return new Ingredient()
}