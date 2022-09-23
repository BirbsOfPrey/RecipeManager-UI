import { createIngredient, Ingredient } from "../../models/Ingredient"
import { calculateIngredientAmount, createIngredientComponent, IngredientComponent } from "../../models/IngredientComponent"

const ingredientComponentId: number = 87
const ingredientComponentAmount: number = 15
const ingredientComponentPhysicalQuantity: string = "g"
const ingredientComponentIngredient: Ingredient = createIngredient()

test("Ingredient component id is undefined by default", () => {
    // Arrange
    const ingredientComponent: IngredientComponent = createIngredientComponent()

    // Act

    // Assert
    expect(ingredientComponent.id).toEqual(undefined)
})

test("Ingredient component amount is undefined by default", () => {
    // Arrange
    const ingredientComponent: IngredientComponent = createIngredientComponent()

    // Act

    // Assert
    expect(ingredientComponent.amount).toEqual(undefined)
})

test("Ingredient component physical quantity is undefined by default", () => {
    // Arrange
    const ingredientComponent: IngredientComponent = createIngredientComponent()

    // Act

    // Assert
    expect(ingredientComponent.physicalQuantity).toEqual(undefined)
})

test("Ingredient component ingredient is not undefined", () => {
    // Arrange
    const ingredientComponent: IngredientComponent = createIngredientComponent()

    // Act

    // Assert
    expect(ingredientComponent.ingredient).not.toEqual(undefined)
})

test("Ingredient component amount is set correct", () => {
    // Arrange
    const ingredientComponent: IngredientComponent = createIngredientComponent()

    // Act
    ingredientComponent.amount = ingredientComponentAmount

    // Assert
    expect(ingredientComponent.amount).toEqual(ingredientComponentAmount)
})

test("Ingredient component physical quantity is set correct", () => {
    // Arrange
    const ingredientComponent: IngredientComponent = createIngredientComponent()

    // Act
    ingredientComponent.physicalQuantity = ingredientComponentPhysicalQuantity

    // Assert
    expect(ingredientComponent.physicalQuantity).toEqual(ingredientComponentPhysicalQuantity)
})

test("Ingredient component ingredient is set correct", () => {
    // Arrange
    const ingredientComponent: IngredientComponent = createIngredientComponent()

    // Act
    ingredientComponent.ingredient = ingredientComponentIngredient

    // Assert
    expect(ingredientComponent.ingredient).toEqual(ingredientComponentIngredient)
})

test("Ingredient component id is set correct", () => {
    // Arrange
    const ingredientComponent: IngredientComponent = createIngredientComponent()

    // Act
    ingredientComponent.id = ingredientComponentId

    // Assert
    expect(ingredientComponent.id).toEqual(ingredientComponentId)
})

describe("Method calculateIngredientAmount returns ", () => {
    it.each([
        [7.5, 15, 4, 2],
        [0, 15, -1, 2],
        [0, 15, 4, -1],
        [30, 15, 2, 4],
        [0.33, 1, 3, 1]
    ])("%p when invoked with amount: %p, personRefAmount: %p, personAmount: %p", (result: number, amount: number, personRefAmount: number, personAmount: number) => {
        const ingredientComponent: IngredientComponent = createIngredientComponent()
        ingredientComponent.amount = amount
        expect(calculateIngredientAmount(ingredientComponent, personRefAmount, personAmount)).toEqual(result)
    })
})