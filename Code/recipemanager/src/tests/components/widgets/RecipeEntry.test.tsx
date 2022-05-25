import { render, screen } from '@testing-library/react'
import { RecipeEntry } from '../../../components/widgets/RecipeEntry'
import { Recipe } from '../../../models/Recipe'

const testRecipeId: number = 5
const testRecipeName: string = 'Testrezept'

test('renders recipe name field', () => {
    const testRecipe = getTestRecipe()

    render(<RecipeEntry recipe={testRecipe} />)

    const linkElement = screen.getByText(testRecipeName)
    expect(linkElement).toBeInTheDocument()
})

test('renders recipe id field', () => {
    const testRecipe = getTestRecipe()

    render(<RecipeEntry recipe={testRecipe} />)

    const linkElement = screen.getByText(testRecipeId)
    expect(linkElement).toBeInTheDocument()
})

test('renders recipe name title', () => {
    const testRecipe = getTestRecipe()

    render(<RecipeEntry recipe={testRecipe} />)

    const linkElement = screen.getByText('Rezept-Name')
    expect(linkElement).toBeInTheDocument()
})

test('renders recipe id title', () => {
    const testRecipe = getTestRecipe()

    render(<RecipeEntry recipe={testRecipe} />)

    const linkElement = screen.getByText('Rezept-Id')
    expect(linkElement).toBeInTheDocument()
})

function getTestRecipe() {
    const testRecipe = new Recipe()

    testRecipe.id = testRecipeId
    testRecipe.name = testRecipeName

    return testRecipe
}