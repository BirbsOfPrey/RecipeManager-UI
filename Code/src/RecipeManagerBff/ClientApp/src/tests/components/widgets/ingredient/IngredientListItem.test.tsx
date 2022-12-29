import { render, screen } from "@testing-library/react"
import StringResource from "../../../../resources/StringResource"
import { BrowserRouter } from "react-router-dom"
import { createIngredient, Ingredient } from "../../../../models/Ingredient"
import { IngredientListItem } from "../../../../components/widgets/ingredient/IngredientListItem"

const testIngredient: Ingredient = createIngredient()
const testIngredientName: string = "Muskatnuss"
testIngredient.name = testIngredientName

test("renders default text if ingredient with emtpy name", () => {
    // Arrange

    // Act
    render(<BrowserRouter><IngredientListItem ingredient={createIngredient()} /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.NoIngredientName)).toBeInTheDocument
})

test("renders correct ingredient name", () => {
    // Arrange

    // Act
    render(<BrowserRouter><IngredientListItem ingredient={testIngredient} /></BrowserRouter>)

    // Assert
    expect(screen.getByText(testIngredientName)).toBeInTheDocument

    expect(screen.queryByText(StringResource.General.NoIngredientName)).not.toBeInTheDocument
})