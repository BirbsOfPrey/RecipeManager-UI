import { render, screen } from '@testing-library/react'
import { RecipeSteps } from '../../../components/widgets/RecipeSteps'
import { createStep, Step } from '../../../models/Step'

test('renders textfield of description', () => {
    // Arrange
    const step: Step = createStep()
    const stepNumber: number = 1
    const stepInstruction: string = "Testbeschreibung"
    step.instruction = stepInstruction
    step.stepNumber = stepNumber

    // Act
    const { container } = render(<RecipeSteps steps={[step]} />)

    // Assert
    expect(screen.getByDisplayValue(stepInstruction)).toBeInTheDocument()

    const elements = container.getElementsByClassName("recipeEditHead__descriptionField")
    expect(elements.length).toBe(1)
})