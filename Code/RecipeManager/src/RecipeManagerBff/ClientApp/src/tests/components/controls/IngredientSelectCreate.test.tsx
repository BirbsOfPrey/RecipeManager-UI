import { render, screen } from '@testing-library/react'
import { IngredientSelectCreate } from '../../../components/controls/IngredientSelectCreate'
import { createIngredient, Ingredient } from '../../../models/Ingredient'

const ingredient: Ingredient = createIngredient()
const ingredientName: string = "Zucker"
ingredient.name = ingredientName

const mockSetValue = jest.fn()

test('renders textfield of ingredient name correct', () => {
    // Arrange

    // Act
    const { container } = render(<IngredientSelectCreate setValue={mockSetValue} ingredient={ingredient} />)

    // Assert
    expect(screen.getByDisplayValue(ingredientName)).toBeInTheDocument()

    expect(container.getElementsByClassName("ingredientSelectCreate__ingredient").length).toBe(1)
})