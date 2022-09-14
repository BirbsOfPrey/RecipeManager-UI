import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { IngredientComponentDialog } from "../../../components/dialogs/IngredientComponentDialog"
import { NO_INDEX } from "../../../models/helper/ArrayHelper"
import { createIngredientComponent, IngredientComponent } from "../../../models/IngredientComponent"
import StringResource from "../../../resources/StringResource"

const ingredientComponent: IngredientComponent = createIngredientComponent()
const amount: number = 7
const physicalQuantity: string = "kg"
ingredientComponent.amount = amount
ingredientComponent.physicalQuantity = physicalQuantity
const reference: number = 11

const mockHandleCancel = jest.fn()
const mockHandleOk = jest.fn()

test("does not render dialog if not open", () => {
    // Arrange

    // Act
    render(<IngredientComponentDialog open={false} handleCancel={mockHandleCancel} handleOk={mockHandleOk} ingredientComponent={undefined} reference={1} />)

    // Assert
    expect(screen.queryByText(StringResource.General.AddIngredient)).not.toBeInTheDocument()
    expect(screen.queryByText(StringResource.General.DefineIngredientComponent)).not.toBeInTheDocument()
})

test("renders dialog title correct", () => {
    // Arrange

    // Act
    render(<IngredientComponentDialog open={true} handleCancel={mockHandleCancel} handleOk={mockHandleOk} ingredientComponent={undefined} reference={1} />)

    // Assert
    expect(screen.getByText(StringResource.General.AddIngredient)).toBeInTheDocument()
})

test("renders dialog content text correct", () => {
    // Arrange

    // Act
    render(<IngredientComponentDialog open={true} handleCancel={mockHandleCancel} handleOk={mockHandleOk} ingredientComponent={undefined} reference={1} />)

    // Assert
    expect(screen.getByText(StringResource.General.DefineIngredientComponent)).toBeInTheDocument()
})

test("renders textfield with correct amount", () => {
    // Arrange

    // Act
    render(<IngredientComponentDialog open={true} handleCancel={mockHandleCancel} handleOk={mockHandleOk} ingredientComponent={ingredientComponent} reference={1} />)

    // Assert
    expect(screen.getByDisplayValue(amount)).toBeInTheDocument()
})

test("renders textfield with correct physical Quantity", () => {
    // Arrange

    // Act
    render(<IngredientComponentDialog open={true} handleCancel={mockHandleCancel} handleOk={mockHandleOk} ingredientComponent={ingredientComponent} reference={1} />)

    // Assert
    expect(screen.getByDisplayValue(physicalQuantity)).toBeInTheDocument()
})

test("renders cancel button with correct text", () => {
    // Arrange

    // Act
    render(<IngredientComponentDialog open={true} handleCancel={mockHandleCancel} handleOk={mockHandleOk} ingredientComponent={undefined} reference={1} />)

    // Assert
    const buttons = screen.getAllByRole("button")
    expect(buttons[1].textContent).toBe(StringResource.General.Cancel)
})

test("calls method handleCancel on click", () => {
    // Arrange
    render(<IngredientComponentDialog open={true} handleCancel={mockHandleCancel} handleOk={mockHandleOk} ingredientComponent={undefined} reference={1} />)

    // Act
    userEvent.click(screen.getByText(StringResource.General.Cancel))

    // Assert
    expect(mockHandleCancel.mock.calls.length).toBe(1)
})

test("renders ok button with correct change text", () => {
    // Arrange

    // Act
    render(<IngredientComponentDialog open={true} handleCancel={mockHandleCancel} handleOk={mockHandleOk} ingredientComponent={undefined} reference={1} />)

    // Assert
    const buttons = screen.getAllByRole("button")
    expect(buttons[2].textContent).toBe(StringResource.General.Change)
})

test("renders ok button with correct add text", () => {
    // Arrange

    // Act
    render(<IngredientComponentDialog open={true} handleCancel={mockHandleCancel} handleOk={mockHandleOk} ingredientComponent={undefined} reference={NO_INDEX} />)

    // Assert
    const buttons = screen.getAllByRole("button")
    expect(buttons[2].textContent).toBe(StringResource.General.Add)
})

test("calls method handleOk on click with correct parameter", () => {
    // Arrange
    render(<IngredientComponentDialog open={true} handleCancel={mockHandleCancel} handleOk={mockHandleOk} ingredientComponent={ingredientComponent} reference={reference} />)

    // Act
    userEvent.click(screen.getByText(StringResource.General.Change))

    // Assert
    expect(mockHandleOk.mock.calls.length).toBe(1)
    expect(mockHandleOk).toHaveBeenCalledWith(reference, ingredientComponent)
})