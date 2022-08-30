import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createIngredientComponent, IngredientComponent } from "../../../models/IngredientComponent"
import { createIngredient, Ingredient } from "../../../models/Ingredient"
import { IngredientComponentListItem } from "../../../components/widgets/IngredientComponentListItem"

const ingredientComponent: IngredientComponent = createIngredientComponent()
const ingredient: Ingredient = createIngredient()
const ingredientName: string = "Zucker"
ingredient.name = ingredientName
ingredientComponent.ingredient = ingredient
const index: number = 1
const mockIngredientComponentSelected = jest.fn()
const mockIngredientComponentDeleted = jest.fn()

test('renders ingredient component properties correct', () => {
    // Arrange
    ingredientComponent.amount = 15
    ingredientComponent.physicalQuantity = "g"

    // Act
    render(<IngredientComponentListItem ingredientComponent={ingredientComponent} index={index} editable={false} personRefAmount={4} personAmount={2} ingredientComponentSelected={mockIngredientComponentSelected} ingredientComponentDeleted={mockIngredientComponentDeleted} />)

    // Assert
    const linkElementIngredientName = screen.getByText(ingredientName)
    expect(linkElementIngredientName).toBeInTheDocument()
    const linkElementAmount = screen.getByText("7.5 g")
    expect(linkElementAmount).toBeInTheDocument()
})

test('renders ingredient component properties correct when amount is 0', () => {
    // Arrange
    ingredientComponent.amount = 0
    ingredientComponent.physicalQuantity = "Stück"

    // Act
    render(<IngredientComponentListItem ingredientComponent={ingredientComponent} index={index} editable={false} personRefAmount={4} personAmount={2} ingredientComponentSelected={mockIngredientComponentSelected} ingredientComponentDeleted={mockIngredientComponentDeleted} />)

    // Assert
    const linkElementIngredientName = screen.getByText(ingredientName)
    expect(linkElementIngredientName).toBeInTheDocument()
    const linkElementAmount = screen.getByText("Stück")
    expect(linkElementAmount).toBeInTheDocument()
})

test('renders no button when item is not editable', () => {
    // Arrange
    ingredientComponent.amount = 0
    ingredientComponent.physicalQuantity = "Stück"

    // Act
    render(<IngredientComponentListItem ingredientComponent={ingredientComponent} index={index} editable={false} personRefAmount={4} personAmount={2} ingredientComponentSelected={mockIngredientComponentSelected} ingredientComponentDeleted={mockIngredientComponentDeleted} />)

    // Assert
    const buttons = screen.queryAllByRole("button")
    expect(buttons.length).toBe(0)
})

test('calls method scheduledRecipeDeleted on click with correct parameter', () => {
    // Arrange
    const { container } = render(<IngredientComponentListItem ingredientComponent={ingredientComponent} index={index} editable={true} personRefAmount={4} personAmount={2} ingredientComponentSelected={mockIngredientComponentSelected} ingredientComponentDeleted={mockIngredientComponentDeleted} />)

    // Act
    userEvent.click(container.getElementsByClassName("recipeListItem__editButton")[0])

    // Assert
    expect(mockIngredientComponentSelected.mock.calls.length).toBe(1)
    expect(mockIngredientComponentSelected).toHaveBeenCalledWith(index, ingredientComponent)
})

test('calls method scheduledRecipeDeleted on click with correct parameter', () => {
    // Arrange
    const { container } = render(<IngredientComponentListItem ingredientComponent={ingredientComponent} index={index} editable={true} personRefAmount={4} personAmount={2} ingredientComponentSelected={mockIngredientComponentSelected} ingredientComponentDeleted={mockIngredientComponentDeleted} />)

    // Act
    userEvent.click(container.getElementsByClassName("recipeListItem__deleteButton")[0])

    // Assert
    expect(mockIngredientComponentDeleted.mock.calls.length).toBe(1)
    expect(mockIngredientComponentDeleted).toHaveBeenCalledWith(index, ingredientComponent)
})