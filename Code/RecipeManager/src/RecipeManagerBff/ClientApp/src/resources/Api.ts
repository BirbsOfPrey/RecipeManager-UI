export const RecipeManagerAPIEndpoint: string = '/remote/api'

export const RecipesUrl: string = `${RecipeManagerAPIEndpoint}/recipe`
export const IngredientsUrl: string = `${RecipeManagerAPIEndpoint}/ingredient`

export function createDefaultHeader(): Headers {
    return new Headers({
        'X-CSRF': '1',
        'Content-Type': 'application/json'
    })
}