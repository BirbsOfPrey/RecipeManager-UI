import { Recipe } from "../../models/Recipe"

const recipeId: number = 99
const recipeName: string = "Testrezept"

test("Recipe id is undefined by default", () => {
    // Arrange
    const recipe: Recipe = new Recipe()

    // Act

    // Assert
    expect(recipe.id).toEqual(undefined)
})

test("Recipe name is undefined by default", () => {
    // Arrange
    const recipe: Recipe = new Recipe()

    // Act

    // Assert
    expect(recipe.name).toEqual(undefined)
})

test("Recipe name is set correct", () => {
    // Arrange
    const recipe: Recipe = new Recipe()

    // Act
    recipe.name = recipeName

    // Assert
    expect(recipe.name).toEqual(recipeName)
})

test("Recipe id is set correct", () => {
    // Arrange
    const recipe: Recipe = new Recipe()

    // Act
    recipe.id = recipeId

    // Assert
    expect(recipe.id).toEqual(recipeId)
})