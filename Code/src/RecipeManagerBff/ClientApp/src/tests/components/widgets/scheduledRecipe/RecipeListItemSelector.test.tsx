import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRecipe, Recipe } from "../../../../models/Recipe"
import StringResource from "../../../../resources/StringResource"
import { RecipeListItemSelector } from "../../../../components/widgets/scheduledRecipe/RecipeListItemSelector"

const testRecipe: Recipe = createRecipe()
const testRecipeName: string = "Cookie"
const testRecipeDescription: string = "Mit feinster Schokolade"
testRecipe.name = testRecipeName
testRecipe.description = testRecipeDescription
const mockSelectRecipe = jest.fn()

test("renders default text if recipe with emtpy name and description", () => {
    // Arrange

    // Act
    render(<RecipeListItemSelector recipe={createRecipe()} selectRecipe={mockSelectRecipe} />)

    // Assert
    const linkElementRecipeNameDefault = screen.getByText(StringResource.General.NoRecipeName)
    expect(linkElementRecipeNameDefault).toBeInTheDocument()
    const linkElementRecipeDescriptionDefault = screen.getByText(StringResource.General.NoRecipeDescription)
    expect(linkElementRecipeDescriptionDefault).toBeInTheDocument()
})

test("renders correct recipe name and description of recipe", () => {
    // Arrange

    // Act
    render(<RecipeListItemSelector recipe={testRecipe} selectRecipe={mockSelectRecipe} />)

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

test("calls method selectRecipe on click with correct parameter", () => {
    // Arrange
    render(<RecipeListItemSelector recipe={testRecipe} selectRecipe={mockSelectRecipe} />)

    // Act
    userEvent.click(screen.getByRole("button"))

    // Assert
    expect(mockSelectRecipe).toBeCalledTimes(1)
    expect(mockSelectRecipe).toHaveBeenCalledWith(testRecipe)
})