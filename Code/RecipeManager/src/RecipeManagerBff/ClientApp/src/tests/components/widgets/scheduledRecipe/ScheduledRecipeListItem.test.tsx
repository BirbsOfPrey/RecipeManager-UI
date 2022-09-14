import { ScheduledRecipeListItem } from "../../../../components/widgets/scheduledRecipe/ScheduledRecipeListItem"
import { createScheduledRecipeWithDate, ScheduledRecipe } from "../../../../models/ScheduledRecipe"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { createRecipe, Recipe } from "../../../../models/Recipe"
import StringResource from "../../../../resources/StringResource"

const testDate: Date = new Date("2022-07-20")
const testRecipe: Recipe = createRecipe()
const testRecipeName: string = "Cookie"
const testRecipeDescription: string = "Mit feinster Schokolade"
const testScheduledRecipe: ScheduledRecipe = createScheduledRecipeWithDate(testDate)
const mockDeleted = jest.fn()

test("renders default text if no recipe in the scheduled recipe", () => {
    // Arrange

    // Act
    render(<BrowserRouter><ScheduledRecipeListItem editable={true} scheduledRecipe={testScheduledRecipe} scheduledRecipeDeleted={mockDeleted} /></BrowserRouter>)

    // Assert
    const linkElementRecipeNameDefault = screen.getByText(StringResource.General.NoRecipeName)
    expect(linkElementRecipeNameDefault).toBeInTheDocument()
    const linkElementRecipeDescriptionDefault = screen.getByText(StringResource.General.NoRecipeDescription)
    expect(linkElementRecipeDescriptionDefault).toBeInTheDocument()
})

test("renders default text if recipe without name and description in the scheduled recipe", () => {
    // Arrange
    testScheduledRecipe.recipe = testRecipe
    
    // Act
    render(<BrowserRouter><ScheduledRecipeListItem editable={true} scheduledRecipe={testScheduledRecipe} scheduledRecipeDeleted={mockDeleted} /></BrowserRouter>)

    // Assert
    const linkElementRecipeNameDefault = screen.getByText(StringResource.General.NoRecipeName)
    expect(linkElementRecipeNameDefault).toBeInTheDocument()
    const linkElementRecipeDescriptionDefault = screen.getByText(StringResource.General.NoRecipeDescription)
    expect(linkElementRecipeDescriptionDefault).toBeInTheDocument()
})

test("renders correct name and description of the recipe in the scheduled recipe", () => {
    // Arrange
    testRecipe.name = testRecipeName
    testRecipe.description = testRecipeDescription
    testScheduledRecipe.recipe = testRecipe
    
    // Act
    render(<BrowserRouter><ScheduledRecipeListItem editable={true} scheduledRecipe={testScheduledRecipe} scheduledRecipeDeleted={mockDeleted} /></BrowserRouter>)

    // Assert
    const linkElementRecipeName = screen.getByText(testRecipeName)
    expect(linkElementRecipeName).toBeInTheDocument()
    const linkElementRecipeDescription = screen.getByText(testRecipeDescription)
    expect(linkElementRecipeDescription).toBeInTheDocument()

    const linkElementRecipeNameDefault = screen.queryByText(StringResource.General.NoRecipeName)
    expect(linkElementRecipeNameDefault).not.toBeInTheDocument()
    const linkElementRecipeDescriptionDefault = screen.queryByText(StringResource.General.NoRecipeDescription)
    expect(linkElementRecipeDescriptionDefault).not.toBeInTheDocument()
})

test("calls method scheduledRecipeDeleted on click with correct parameter", () => {
    // Arrange
    const testId = 66
    testScheduledRecipe.id = testId
    render(<BrowserRouter><ScheduledRecipeListItem editable={true} scheduledRecipe={testScheduledRecipe} scheduledRecipeDeleted={mockDeleted} /></BrowserRouter>)

    // Act
    userEvent.click(screen.getByRole("button"))

    // Assert
    expect(mockDeleted.mock.calls.length).toBe(1)
    expect(mockDeleted).toHaveBeenCalledWith(testId)
})

test("does not render delete Button if not editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><ScheduledRecipeListItem editable={false} scheduledRecipe={testScheduledRecipe} scheduledRecipeDeleted={mockDeleted} /></BrowserRouter>)
    // Assert
    expect(container.getElementsByClassName("scheduledRecipeListItem__deleteButton").length).toBe(0)
})