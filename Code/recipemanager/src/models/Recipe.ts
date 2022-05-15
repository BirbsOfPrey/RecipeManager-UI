import { RecipeManagerAPIEndpoint } from "../api"

export const RecipesUrl: string = `${RecipeManagerAPIEndpoint}/recipe`

export class Recipe{
    id?: number
    name?: string
}