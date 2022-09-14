import { createStep, Step } from "../../models/Step"

const stepId: number = 48
const stepNumber: number = 1
const stepInstruction: string = "Rühren"

test("Step id is undefined by default", () => {
    // Arrange
    const step: Step = createStep()

    // Act

    // Assert
    expect(step.id).toEqual(undefined)
})

test("Step number is undefined by default", () => {
    // Arrange
    const step: Step = createStep()

    // Act

    // Assert
    expect(step.stepNumber).toBe(undefined)
})

test("Step instruction is empty by default", () => {
    // Arrange
    const step: Step = createStep()

    // Act

    // Assert
    expect(step.instruction).toBe("")
})

test("Step number is set correct", () => {
    // Arrange
    const step: Step = createStep()

    // Act
    step.stepNumber = stepNumber

    // Assert
    expect(step.stepNumber).toEqual(stepNumber)
})

test("Step instruction is set correct", () => {
    // Arrange
    const step: Step = createStep()

    // Act
    step.instruction = stepInstruction

    // Assert
    expect(step.instruction).toEqual(stepInstruction)
})

test("Step id is set correct", () => {
    // Arrange
    const step: Step = createStep()

    // Act
    step.id = stepId

    // Assert
    expect(step.id).toEqual(stepId)
})