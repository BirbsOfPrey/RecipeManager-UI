import { render, screen, waitFor } from "@testing-library/react"
import { rest } from "msw"
import { setupServer, SetupServerApi } from "msw/node"
import { RecipesUrl } from "../../../../resources/Api"
import { RecipeList } from "../../../../components/widgets/recipe/RecipeList"
import { Recipe } from "../../../../models/Recipe"
import { BrowserRouter } from "react-router-dom"
import { immerable } from "immer"
import StringResource from "../../../../resources/StringResource"

const testRecipe1Id: number = 54
const testRecipe1Name: string = "Testrezept"
const testRecipe2Id: number = 68
const testRecipe2Name: string = "Super gutes Rezept"

let handlers = [
	rest.get(RecipesUrl, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: Recipe[]) => any }) => {
		return res(
			ctx.json([
				{ [immerable]: true, id: testRecipe1Id, name: testRecipe1Name, description: undefined, personRefAmount: 4, steps: undefined, ingredientComponents: undefined },
                { [immerable]: true, id: testRecipe2Id, name: testRecipe2Name, description: undefined, personRefAmount: 2, steps: undefined, ingredientComponents: undefined }
            ])
		)
	})
]

let emptyHandlers = [
    rest.get(RecipesUrl, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: Recipe[]) => any }) => {
        return res(
            ctx.json([])
        )
    })
]

let server: SetupServerApi

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("renders correct recipes in the list", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    render(<BrowserRouter><RecipeList /></BrowserRouter>)

    // Assert
    await waitFor(() => {
        expect(screen.getByText(testRecipe1Name)).toBeInTheDocument
        expect(screen.getByText(testRecipe2Name)).toBeInTheDocument
        expect(screen.queryByText(StringResource.Messages.NoRecipesToDisplay)).not.toBeInTheDocument()
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument
    })
})

test("renders progress bar if recipes loading", async () => {
    // Arrange

    // Act
    render(<BrowserRouter><RecipeList /></BrowserRouter>)

    // Assert
    const linkElementProgressBar = screen.getByRole("progressbar")
    expect(linkElementProgressBar).toBeInTheDocument
})

test("renders correct list title", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    render(<BrowserRouter><RecipeList /></BrowserRouter>)

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.SelectRecipe)).toBeInTheDocument })
})

test("render as much list items as recipes are passed", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    const { container } = render(<BrowserRouter><RecipeList /></BrowserRouter>)
    
    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("recipeListItem__container").length).toBe(2) })
})

test("renders search field correct", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    const { container } = render(<BrowserRouter><RecipeList /></BrowserRouter>)
    
    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("searchField__container").length).toBeInTheDocument })
})

test("renders no recipes text correct", async () => {
    // Arrange
    server = setupServer(...emptyHandlers)
    server.listen()

    // Act
    render(<BrowserRouter><RecipeList /></BrowserRouter>)
    
    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.NoRecipesToDisplay)).toBeInTheDocument })
})