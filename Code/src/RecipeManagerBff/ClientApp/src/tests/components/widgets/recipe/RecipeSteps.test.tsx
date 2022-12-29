import { render, screen } from "@testing-library/react"
import { RecipeSteps } from "../../../../components/widgets/recipe/RecipeSteps"
import { createStep, Step } from "../../../../models/Step"
import StringResource from "../../../../resources/StringResource"

test("renders textfield of instruction", () => {
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

    expect(container.getElementsByClassName("recipeEditHead__descriptionField").length).toBe(1)
})

test("renders no steps text if no step present", () => {
    // Arrange

    // Act
    const { container } = render(<RecipeSteps steps={undefined} />)

    // Assert
    expect(screen.getByText(StringResource.General.NoSteps)).toBeInTheDocument()

    expect(container.getElementsByClassName("recipeEditHead__descriptionField").length).toBe(1)
})