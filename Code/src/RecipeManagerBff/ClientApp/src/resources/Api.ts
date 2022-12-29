export const RecipeManagerAPIEndpoint: string = "/remote/api"
export const AuthenticationAPIEndpoint: string = "/auth/api"

export const RecipesUrl: string = `${RecipeManagerAPIEndpoint}/recipe`
export const IngredientsUrl: string = `${RecipeManagerAPIEndpoint}/ingredient`
export const ScheduledRecipesUrl: string = `${RecipeManagerAPIEndpoint}/scheduledrecipe`
export const RecipeImportUrl: string = `${RecipeManagerAPIEndpoint}/dataexchange`
export const UsersUrl: string = `${AuthenticationAPIEndpoint}/user`

export function createDefaultHeader(): Headers {
    return new Headers({
        "X-CSRF": "1",
        "Content-Type": "application/json"
    })
}

export function scheduledRecipeFromToQuery(from: Date, to: Date): string {
    return `${ScheduledRecipesUrl}?from=${from.toISOString()}&to=${to.toISOString()}`
}

export function recipeImportAmountQuery(amount: number): string {
    return `${RecipeImportUrl}?quantity=${amount}`
}