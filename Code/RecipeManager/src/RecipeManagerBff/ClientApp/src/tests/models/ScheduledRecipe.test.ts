import { Recipe } from '../../models/Recipe'
import { createScheduledRecipe, createScheduledRecipeWithDate, ScheduledRecipe } from '../../models/ScheduledRecipe'

const testScheduledRecipeId: number = 54
const testRecipeName: string = "Testrezept"
const testDate: Date = new Date("2022-08-01")

test('ScheduledRecipes id is undefined by default', () => {
    // Arrange
    const scheduledRecipe: ScheduledRecipe = createScheduledRecipe()

    // Act

    // Assert
    expect(scheduledRecipe.id).toEqual(undefined)
})

test('ScheduledRecipes recipe is undefined by default', () => {
    // Arrange
    const scheduledRecipe: ScheduledRecipe = createScheduledRecipe()

    // Act

    // Assert
    expect(scheduledRecipe.recipe).toEqual(undefined)
})

test('ScheduledRecipes id is set correct', () => {
    // Arrange
    const scheduledRecipe: ScheduledRecipe = createScheduledRecipe()

    // Act
    scheduledRecipe.id = testScheduledRecipeId

    // Assert
    expect(scheduledRecipe.id).toEqual(testScheduledRecipeId)
})

test('ScheduledRecipes recipe is set correct', () => {
    // Arrange
    
    const scheduledRecipe: ScheduledRecipe = createScheduledRecipe()
    const recipe: Recipe = new Recipe()
    recipe.name = testRecipeName

    // Act
    scheduledRecipe.recipe = recipe

    // Assert
    expect(scheduledRecipe.recipe.name).toEqual(testRecipeName)
})

test('ScheduledRecipes date is set correct', () => {
    // Arrange
    const scheduledRecipe: ScheduledRecipe = createScheduledRecipe()

    // Act
    scheduledRecipe.date = testDate

    // Assert
    expect(scheduledRecipe.date).toEqual(testDate)
})

test('Method createScheduledRecipeWithDate sets correct date', () => {
    // Arrange

    // Act
    const scheduledRecipe: ScheduledRecipe = createScheduledRecipeWithDate(testDate)

    // Assert
    expect(scheduledRecipe.date).toEqual(testDate)
})