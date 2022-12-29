import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { RecipeListView } from "../../../components/pages/RecipeListView"
import StringResource from "../../../resources/StringResource"

test("renders text of CreateRecipe button correct", () => {
    // Arrange

    // Act
    render(<BrowserRouter><RecipeListView /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.CreateRecipe)).toBeInTheDocument()
})