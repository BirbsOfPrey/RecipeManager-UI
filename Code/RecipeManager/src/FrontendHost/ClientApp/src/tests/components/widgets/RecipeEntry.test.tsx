import { render, screen } from '@testing-library/react'
import { RecipeEntry } from '../../../components/widgets/RecipeEntry'
import { Recipe } from '../../../models/Recipe'
import StringResource from '../../../resources/StringResource'

const testRecipeId: number = 5
const testRecipeName: string = 'Testrezept'

test('renders recipe name field', () => {
    // Arrange
    const testRecipe = getTestRecipe()

    // Act
    render(<RecipeEntry recipe={testRecipe} />)

    // Assert
    const linkElement = screen.getByText(testRecipeName)
    expect(linkElement).toBeInTheDocument()
})

test('renders recipe id field', () => {
    // Arrange
    const testRecipe = getTestRecipe()

    // Act
    render(<RecipeEntry recipe={testRecipe} />)

    // Assert
    const linkElement = screen.getByText(testRecipeId)
    expect(linkElement).toBeInTheDocument()
})

test('renders recipe name title', () => {
    // Arrange
    const testRecipe = getTestRecipe()

    // Act
    render(<RecipeEntry recipe={testRecipe} />)

    // Assert
    const linkElement = screen.getByText(StringResource.General.RecipeName)
    expect(linkElement).toBeInTheDocument()
})

test('renders recipe id title', () => {
    // Arrange
    const testRecipe = getTestRecipe()

    // Act
    render(<RecipeEntry recipe={testRecipe} />)

    // Assert
    const linkElement = screen.getByText(StringResource.General.RecipeId)
    expect(linkElement).toBeInTheDocument()
})

function getTestRecipe() {
    const testRecipe = new Recipe()

    testRecipe.id = testRecipeId
    testRecipe.name = testRecipeName

    return testRecipe
}