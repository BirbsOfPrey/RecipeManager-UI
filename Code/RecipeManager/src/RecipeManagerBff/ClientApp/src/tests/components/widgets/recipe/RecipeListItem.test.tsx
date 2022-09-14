import { render, screen } from "@testing-library/react"
import { createRecipe, Recipe } from "../../../../models/Recipe"
import StringResource from "../../../../resources/StringResource"
import { RecipeListItem } from "../../../../components/widgets/recipe/RecipeListItem"
import { BrowserRouter } from "react-router-dom"

const testRecipe: Recipe = createRecipe()
const testRecipeName: string = "Cookie"
const testRecipeDescription: string = "Mit feinster Schokolade"
testRecipe.name = testRecipeName
testRecipe.description = testRecipeDescription

test("renders default text if recipe with emtpy name and description", () => {
    // Arrange

    // Act
    render(<BrowserRouter><RecipeListItem recipe={createRecipe()} /></BrowserRouter>)

    // Assert
    const linkElementRecipeNameDefault = screen.getByText(StringResource.General.NoRecipeName)
    expect(linkElementRecipeNameDefault).toBeInTheDocument()
    const linkElementRecipeDescriptionDefault = screen.getByText(StringResource.General.NoRecipeDescription)
    expect(linkElementRecipeDescriptionDefault).toBeInTheDocument()
})

test("renders correct recipe name and description of recipe", () => {
    // Arrange

    // Act
    render(<BrowserRouter><RecipeListItem recipe={testRecipe} /></BrowserRouter>)

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