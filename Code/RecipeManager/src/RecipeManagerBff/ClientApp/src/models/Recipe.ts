import { IngredientComponent } from "./IngredientComponent"
import { Step } from "./Step"

export class Recipe{
    id?: number
    name?: string
    personRefAmount: number
    steps?: Step[]
    ingredientComponents?: IngredientComponent[]

    constructor() {
        this.personRefAmount = 4
    }
}

export function createRecipe() {
    return new Recipe()
}