import { render, screen } from '@testing-library/react'
import { createRecipe, Recipe } from "../../../models/Recipe"
import StringResource from "../../../resources/StringResource"
import { Copyright } from '../../../components/widgets/Copyright'

const testRecipe: Recipe = createRecipe()
const testRecipeName: string = "Cookie"
const testRecipeDescription: string = "Mit feinster Schokolade"
testRecipe.name = testRecipeName
testRecipe.description = testRecipeDescription

test('renders correct copyright text', () => {
    // Arrange

    // Act
    render(<Copyright />)

    // Assert
    const linkElementCopyright = screen.getByText(StringResource.Copyright)
    expect(linkElementCopyright).toBeInTheDocument()
})