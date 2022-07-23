export const RecipeManagerAPIEndpoint: string = '/remote/api'

export const RecipesUrl: string = `${RecipeManagerAPIEndpoint}/recipe`

export function getDefaultHeader(): Headers {
    return new Headers({
        'X-CSRF': '1',
        'Content-Type': 'application/json'
    })
}