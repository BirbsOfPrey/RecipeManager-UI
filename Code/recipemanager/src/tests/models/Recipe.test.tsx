import { Recipe } from '../../models/Recipe'

const recipeId: number = 99
const recipeName: string = 'Testrezept'

test('Recipe id is undefined by default', () => {
    const recipe: Recipe = new Recipe()

    expect(recipe.id).toEqual(undefined)
})

test('Recipe name is undefined by default', () => {
    const recipe: Recipe = new Recipe()

    expect(recipe.name).toEqual(undefined)
})

test('Recipe name is set correct', () => {
    const recipe: Recipe = new Recipe()
    recipe.name = recipeName

    expect(recipe.name).toEqual(recipeName)
})

test('Recipe id is set correct', () => {
    const recipe: Recipe = new Recipe()
    recipe.id = recipeId

    expect(recipe.id).toEqual(recipeId)
})