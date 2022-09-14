import { createScheduledRecipe, ScheduledRecipe } from "../../../../models/ScheduledRecipe"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import StringResource from "../../../../resources/StringResource"
import { ScheduledRecipeList } from "../../../../components/widgets/scheduledRecipe/ScheduledRecipeList"

const testScheduledRecipe: ScheduledRecipe = createScheduledRecipe()
const mockDelete = jest.fn()

test("renders default text if no scheduled recipes in the list", () => {
    // Arrange

    // Act
    render(<BrowserRouter><ScheduledRecipeList editable={true} scheduledRecipes={[]} deleteScheduledRecipe={mockDelete} /></BrowserRouter>)

    // Assert
    const linkElementNoScheduledRecipesDefault = screen.getByText(StringResource.General.NoScheduledRecipes)
    expect(linkElementNoScheduledRecipesDefault).toBeInTheDocument()
})

test("does not render default text if any scheduled recipe is in the list", () => {
    // Arrange

    // Act
    render(<BrowserRouter><ScheduledRecipeList editable={true} scheduledRecipes={[testScheduledRecipe]} deleteScheduledRecipe={mockDelete} /></BrowserRouter>)

    // Assert
    const linkElementNoScheduledRecipes = screen.queryByText(StringResource.General.NoScheduledRecipes)
    expect(linkElementNoScheduledRecipes).not.toBeInTheDocument()
})

test("render as much list items as scheduled recipes are passed", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><ScheduledRecipeList editable={true} scheduledRecipes={[testScheduledRecipe, testScheduledRecipe]} deleteScheduledRecipe={mockDelete} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("scheduledRecipeListItem__container").length).toBe(2)
})

test("calls method deleteScheduledRecipe on click in ScheduledRecipeListItem with correct parameter", () => {
    // Arrange
    const testId = 66
    testScheduledRecipe.id = testId
    render(<BrowserRouter><ScheduledRecipeList editable={true} scheduledRecipes={[testScheduledRecipe]} deleteScheduledRecipe={mockDelete} /></BrowserRouter>)
    
    // Act
    userEvent.click(screen.getByRole("button"))

    // Assert
    expect(mockDelete).toBeCalledTimes(1)
    expect(mockDelete).toHaveBeenCalledWith(testId)
})