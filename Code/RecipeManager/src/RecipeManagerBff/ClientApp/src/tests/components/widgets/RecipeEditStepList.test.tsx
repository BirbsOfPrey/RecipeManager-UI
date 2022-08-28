import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecipeEditStepList } from '../../../components/widgets/RecipeEditStepList'
import { StepListItem } from '../../../components/widgets/StepListItem'
import { createStep, Step } from '../../../models/Step'
import StringResource from '../../../resources/StringResource'

const step1: Step = createStep()
const stepNumber1: number = 1
step1.stepNumber = stepNumber1
const step2: Step = createStep()
const stepNumber2: number = 2
step1.stepNumber = stepNumber2

const mockUpdateStep = jest.fn()
const mockChangeOrderStep = jest.fn()
const mockDeleteStep = jest.fn()

test('renders no steps if no step present', () => {
    // Arrange

    // Act
    render(<RecipeEditStepList steps={[]} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} deleteStep={mockDeleteStep} />)

    // Assert
    expect(screen.getByText(StringResource.General.NoSteps)).toBeInTheDocument()
})

test('renders as much step items as steps are passed', () => {
    // Arrange

    // Act
    const { container } = render(<RecipeEditStepList steps={[step1, step2]} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} deleteStep={mockDeleteStep} />)

    // Assert
    expect(container.getElementsByClassName("stepListItem__container").length).toBe(2)
})

test('renders add step list item', () => {
    // Arrange

    // Act
    render(<RecipeEditStepList steps={[]} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} deleteStep={mockDeleteStep} />)

    // Assert
    expect(screen.getByText(StringResource.General.AddStep)).toBeInTheDocument()
})

test('calls method addStep on click with correct parameter', () => {
    // Arrange
    const step3: Step = createStep()
    const stepNumber3: number = 3
    step3.stepNumber = stepNumber3
    const { container } = render(<RecipeEditStepList steps={[step1, step2]} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} deleteStep={mockDeleteStep} />)

    // Act
    userEvent.click(container.getElementsByClassName("recipeEditStepList__addStepButton")[0])

    // Assert
    expect(mockUpdateStep.mock.calls.length).toBe(1)
    expect(mockUpdateStep).toBeCalledWith(step3)
})