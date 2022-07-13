import { IngredientComponent } from "./IngredientComponent"
import { Step } from "./Step"

export class Recipe{
    id?: number
    name?: string
    steps?: Step[]
    ingredientComponents?: IngredientComponent[]
}