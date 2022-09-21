import { fireEvent, queryByDisplayValue, queryByText, render, screen, waitFor } from "@testing-library/react"
import { IngredientEdit } from "../../../../components/widgets/ingredient/IngredientEdit"
import { UserEdit } from "../../../../components/widgets/user/UserEdit"
import { Ingredient } from "../../../../models/Ingredient"
import { User } from "../../../../models/security/User"
import StringResource from "../../../../resources/StringResource"

const testUserId: number = 54
const testIngredientName: string = "Aromat"
const testIngredient: Ingredient = {
    name: testIngredientName
} as Ingredient
const testExistingUser: Ingredient = {
    id: testUserId,
    name: testIngredientName
} as Ingredient

const mockSetValue = jest.fn()

test("renders fields of name when not editable", () => {
    // Arrange

    // Act
    const { container } = render(<IngredientEdit ingredient={testIngredient} setValue={mockSetValue} editable={false} />)

    // Assert
    expect(screen.getByDisplayValue(testIngredientName)).toBeInTheDocument

    expect(container.getElementsByClassName("ingredientEdit__nameField").length).toBe(1)
})

test("renders fields of name when editable", () => {
    // Arrange

    // Act
    const { container } = render(<IngredientEdit ingredient={testIngredient} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(screen.getByDisplayValue(testIngredientName)).toBeInTheDocument

    expect(container.getElementsByClassName("ingredientEdit__nameField").length).toBe(1)
})

test("does not render helpertext if ingredient name is valid", () => {
    // Arrange

    // Act
    const { container } = render(<IngredientEdit ingredient={testIngredient} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(queryByText(container, StringResource.Messages.RequiredIngredientName)).not.toBeInTheDocument
})

test("renders helpertext if user name not valid", () => {
    // Arrange
    const notValidIngredientName: string = ""
    testIngredient.name = notValidIngredientName

    // Act
    render(<IngredientEdit ingredient={testIngredient} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(screen.getByText(StringResource.Messages.RequiredIngredientName)).toBeInTheDocument
})

test("calls set value correct after name input changes", async () => {
    // Arrange
    const { container } = render(<IngredientEdit ingredient={testIngredient} setValue={mockSetValue} editable={true} />)

    // Act
    const element = container.getElementsByClassName("ingredientEdit__nameField")[0].querySelector("input") ?? new Element()
    fireEvent.change(element, { target: { value: "Fisch" }})

    // Assert
    await waitFor(() => { expect(mockSetValue).toBeCalledWith("name", "Fisch") })
})