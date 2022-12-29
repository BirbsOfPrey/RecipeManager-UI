import { render, screen } from "@testing-library/react"
import { RecipeEditIngredients } from "../../../../components/widgets/recipe/RecipeEditIngredients"
import { createIngredientComponent, IngredientComponent } from "../../../../models/IngredientComponent"
import StringResource from "../../../../resources/StringResource"

const ingredientComponent: IngredientComponent = createIngredientComponent()
const amount: number = 5
const physicalQuantity: string = "ml"
ingredientComponent.amount = amount
ingredientComponent.physicalQuantity = physicalQuantity

const mockSetValue = jest.fn()
const mockUpdateIngredientComponent = jest.fn()
const mockDeleteIngredientComponent = jest.fn()

test("renders PersonAmountField correct", () => {
    // Arrange

    // Act
    const { container } = render(<RecipeEditIngredients personRefAmount={6} ingredientComponents={undefined} setValue={mockSetValue} updateIngredientComponent={mockUpdateIngredientComponent} deleteIngredientComponent={mockDeleteIngredientComponent} editable={false} />)

    // Assert
    expect(container.getElementsByClassName("personAmountField__refAmount").length).toBe(1)
})

test("renders no ingredients text if no ingredient components present", () => {
    // Arrange

    // Act
    render(<RecipeEditIngredients personRefAmount={6} ingredientComponents={undefined} setValue={mockSetValue} updateIngredientComponent={mockUpdateIngredientComponent} deleteIngredientComponent={mockDeleteIngredientComponent} editable={false} />)

    // Assert
    expect(screen.getByText(StringResource.General.NoIngredients)).toBeInTheDocument
})

test("does not render AddAnotherIngredient if not editable", () => {
    // Arrange

    // Act
    render(<RecipeEditIngredients personRefAmount={6} ingredientComponents={undefined} setValue={mockSetValue} updateIngredientComponent={mockUpdateIngredientComponent} deleteIngredientComponent={mockDeleteIngredientComponent} editable={false} />)

    // Assert
    expect(screen.queryByText(StringResource.General.AddAnotherIngredient)).not.toBeInTheDocument
})

test("does render AddAnotherIngredient if editable", () => {
    // Arrange

    // Act
    render(<RecipeEditIngredients personRefAmount={6} ingredientComponents={undefined} setValue={mockSetValue} updateIngredientComponent={mockUpdateIngredientComponent} deleteIngredientComponent={mockDeleteIngredientComponent} editable={true} />)

    // Assert
    expect(screen.getByText(StringResource.General.AddAnotherIngredient)).toBeInTheDocument
})

test("render as much list items as ingredient components are passed", () => {
    // Arrange

    // Act
    const { container } = render(<RecipeEditIngredients personRefAmount={6} ingredientComponents={[ingredientComponent, ingredientComponent]} setValue={mockSetValue} updateIngredientComponent={mockUpdateIngredientComponent} deleteIngredientComponent={mockDeleteIngredientComponent} editable={true} />)

    // Assert
    expect(container.getElementsByClassName("ingredientComponentListItem__container").length).toBe(2)
    expect(screen.queryByText(StringResource.General.NoIngredients)).not.toBeInTheDocument
})