import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { IngredientView } from "../../../components/pages/IngredientView"

test("renders IngredientDetailView correct", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><IngredientView /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("ingredientDetailView__container").length).toBe(1)
})