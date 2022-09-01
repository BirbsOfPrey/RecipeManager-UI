import { render } from '@testing-library/react'
import { RecipeEditSteps } from '../../../../components/widgets/recipe/RecipeEditSteps'

const mockUpdateStep = jest.fn()
const mockChangeOrderStep = jest.fn()
const mockDeleteStep = jest.fn()

test('renders component recipe steps if not editable', () => {
    // Arrange

    // Act
    const { container } = render(<RecipeEditSteps steps={[]} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} deleteStep={mockDeleteStep} editable={false} />)

    // Assert
    expect(container.getElementsByClassName("recipeSteps__container").length).toBe(1)
    expect(container.getElementsByClassName("recipeEditStepList__container").length).toBe(0)
})

test('renders component recipe edit step list if editable', () => {
    // Arrange

    // Act
    const { container } = render(<RecipeEditSteps steps={[]} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} deleteStep={mockDeleteStep} editable={true} />)

    // Assert
    expect(container.getElementsByClassName("recipeSteps__container").length).toBe(0)
    expect(container.getElementsByClassName("recipeEditStepList__container").length).toBe(1)
})