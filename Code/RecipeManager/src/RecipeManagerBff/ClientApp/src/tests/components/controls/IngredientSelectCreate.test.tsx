import { render, screen } from '@testing-library/react'
import { IngredientSelectCreate } from '../../../components/controls/IngredientSelectCreate'
import { createIngredient, Ingredient } from '../../../models/Ingredient'

const mockSetValue = jest.fn()
const ingredient: Ingredient = createIngredient()
const ingredientName: string = "Zucker"
ingredient.name = ingredientName

test('renders textfield of ingredient name correct', () => {
    // Arrange

    // Act
    const { container } = render(<IngredientSelectCreate setValue={mockSetValue} ingredient={ingredient} />)

    // Assert
    expect(screen.getByDisplayValue(ingredientName)).toBeInTheDocument()

    const elements = container.getElementsByClassName("ingredientSelectCreate__ingredient")
    expect(elements.length).toBe(1)
})