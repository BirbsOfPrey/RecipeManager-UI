import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { IngredientListView } from "../../../components/pages/IngredientListView"
import StringResource from "../../../resources/StringResource"

test("renders text of CreateIngredient button correct", () => {
    // Arrange

    // Act
    render(<BrowserRouter><IngredientListView /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.CreateIngredient)).toBeInTheDocument()
})