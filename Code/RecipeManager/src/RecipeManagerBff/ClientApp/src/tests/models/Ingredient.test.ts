import { createIngredient, Ingredient } from "../../models/Ingredient"

const ingredientId: number = 37
const ingredientName: string = "Mehl"

test("Ingredient id is undefined by default", () => {
    // Arrange
    const ingredient: Ingredient = createIngredient()

    // Act

    // Assert
    expect(ingredient.id).toEqual(undefined)
})

test("Ingredient name is empty by default", () => {
    // Arrange
    const ingredient: Ingredient = createIngredient()

    // Act

    // Assert
    expect(ingredient.name).toBe("")
})

test("Ingredient name is set correct", () => {
    // Arrange
    const ingredient: Ingredient = createIngredient()

    // Act
    ingredient.name = ingredientName

    // Assert
    expect(ingredient.name).toEqual(ingredientName)
})

test("Ingredient id is set correct", () => {
    // Arrange
    const ingredient: Ingredient = createIngredient()

    // Act
    ingredient.id = ingredientId

    // Assert
    expect(ingredient.id).toEqual(ingredientId)
})