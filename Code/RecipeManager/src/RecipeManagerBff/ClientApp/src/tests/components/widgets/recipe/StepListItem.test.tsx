import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StepListItem } from '../../../../components/widgets/recipe/StepListItem'
import { createStep, Step } from '../../../../models/Step'

const step: Step = createStep()
const stepNumber: number = 3
const stepInstruction: string = "Testbeschreibung"
step.stepNumber = stepNumber
step.instruction = stepInstruction

const mockUpdateStep = jest.fn()
const mockChangeOrderStep = jest.fn()
const mockStepDeleted = jest.fn()

test('renders textfield of instruction correct', () => {
    // Arrange

    // Act
    const { container } = render(<StepListItem step={step} length={5} editable={false} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} stepDeleted={mockStepDeleted} />)

    // Assert
    expect(screen.getByDisplayValue(stepInstruction)).toBeInTheDocument()

    const elements = container.getElementsByClassName("stepListItem__instructionField")
    expect(elements.length).toBe(1)
})

test('renders no button if not editable', () => {
    // Arrange

    // Act
    render(<StepListItem step={step} length={5} editable={false} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} stepDeleted={mockStepDeleted} />)

    // Assert
    expect(screen.queryAllByRole("button").length).toBe(0)
})

test('renders all buttons if editable', () => {
    // Arrange

    // Act
    render(<StepListItem step={step} length={5} editable={true} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} stepDeleted={mockStepDeleted} />)

    // Assert
    expect(screen.queryAllByRole("button").length).toBe(3)
})

test('calls method changeOrderStep on click with correct parameter to move up', () => {
    // Arrange
    const { container } = render(<StepListItem step={step} length={5} editable={true} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} stepDeleted={mockStepDeleted} />)

    // Act
    userEvent.click(container.getElementsByClassName("stepListItem__moveUpButton")[0])

    // Assert
    expect(mockChangeOrderStep.mock.calls.length).toBe(1)
    expect(mockChangeOrderStep).toBeCalledWith(false, step)
})

test('calls method changeOrderStep on click with correct parameter to move down', () => {
    // Arrange
    const { container } = render(<StepListItem step={step} length={5} editable={true} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} stepDeleted={mockStepDeleted} />)

    // Act
    userEvent.click(container.getElementsByClassName("stepListItem__moveDownButton")[0])

    // Assert
    expect(mockChangeOrderStep.mock.calls.length).toBe(1)
    expect(mockChangeOrderStep).toBeCalledWith(true, step)
})

test('does not call method changeOrderStep on click to move up when step is first in order', () => {
    // Arrange
    const firstStep: Step = createStep()
    firstStep.stepNumber = 1
    const { container } = render(<StepListItem step={firstStep} length={5} editable={true} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} stepDeleted={mockStepDeleted} />)

    // Act
    userEvent.click(container.getElementsByClassName("stepListItem__moveUpButton")[0], undefined, {skipPointerEventsCheck: true})

    // Assert
    expect(mockChangeOrderStep).not.toHaveBeenCalled()
})

test('does not call method changeOrderStep on click to move down when step is last in order', () => {
    // Arrange
    const lastStep: Step = createStep()
    lastStep.stepNumber = 5
    const { container } = render(<StepListItem step={lastStep} length={5} editable={true} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} stepDeleted={mockStepDeleted} />)

    // Act
    userEvent.click(container.getElementsByClassName("stepListItem__moveDownButton")[0], undefined, {skipPointerEventsCheck: true})

    // Assert
    expect(mockChangeOrderStep).not.toHaveBeenCalled()
})

test('calls method stepDeleted on click with correct parameter', () => {
    // Arrange
    const { container } = render(<StepListItem step={step} length={5} editable={true} updateStep={mockUpdateStep} changeStepOrder={mockChangeOrderStep} stepDeleted={mockStepDeleted} />)

    // Act
    userEvent.click(container.getElementsByClassName("stepListItem__deleteButton")[0])

    // Assert
    expect(mockStepDeleted.mock.calls.length).toBe(1)
    expect(mockStepDeleted).toBeCalledWith(step)
})