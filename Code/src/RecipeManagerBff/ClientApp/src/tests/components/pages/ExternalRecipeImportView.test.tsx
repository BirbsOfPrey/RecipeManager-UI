import { fireEvent, queryByText, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupServer, SetupServerApi } from "msw/node"
import { RecipeImportUrl } from "../../../resources/Api"
import { rest } from "msw"
import { immerable } from "immer"
import StringResource from "../../../resources/StringResource"
import { Recipe } from "../../../models/Recipe"
import { ExternalRecipeImportView } from "../../../components/pages/ExternalRecipeImportView"
import { BrowserRouter } from "react-router-dom"

const testRecipe1Id: number = 54
const testRecipe1Name: string = "Testrezept"
const testRecipe2Id: number = 68
const testRecipe2Name: string = "Super gutes Rezept"

let handlers = [
    rest.post(RecipeImportUrl, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: Recipe[]) => any }) => {
        return res(
            ctx.json([
                { [immerable]: true, id: testRecipe1Id, name: testRecipe1Name, description: undefined, personRefAmount: 4, steps: undefined, ingredientComponents: undefined },
                { [immerable]: true, id: testRecipe2Id, name: testRecipe2Name, description: undefined, personRefAmount: 2, steps: undefined, ingredientComponents: undefined }
            ])
        )
    })
]

let emptyHandlers = [
    rest.post(RecipeImportUrl, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: Recipe[]) => any }) => {
        return res(
            ctx.json([])
        )
    })
]

let server: SetupServerApi

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("renders correct header", () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    render(<ExternalRecipeImportView />)

    // Assert
    expect(screen.getByText(StringResource.General.RecipeImportHeader)).toBeInTheDocument()
})

test("renders correct import button", () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    render(<ExternalRecipeImportView />)

    // Assert
    expect(screen.getByText(StringResource.General.RecipeImportButton)).toBeInTheDocument()
})

test("renders textfield of recipe amount", () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    const { container } = render(<ExternalRecipeImportView />)

    // Assert
    expect(screen.getByDisplayValue("1")).toBeInTheDocument()

    expect(container.getElementsByClassName("externalRecipeImportView__importAmount").length).toBe(1)
})

test("changes amount value correct after input changes", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()
    const { container } = render(<ExternalRecipeImportView />)

    // Act
    const element = container.getElementsByClassName("externalRecipeImportView__importAmount")[0].querySelector("input") ?? new Element()
    fireEvent.change(element, { target: { value: "6" }})

    // Assert
    await waitFor(() => { expect(screen.getByDisplayValue("6")).toBeInTheDocument() })
})

test("does not render helpertext if user name is valid", () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    const { container } = render(<ExternalRecipeImportView />)

    // Assert
    expect(queryByText(container, StringResource.Messages.InvalidImportAmount)).not.toBeInTheDocument
})

test("renders correct recipes after click on import button", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()
    render(<BrowserRouter><ExternalRecipeImportView /></BrowserRouter>)
    
    // Act
    userEvent.click(screen.getByText(StringResource.General.RecipeImportButton))

    // Assert
    await waitFor(() => { expect(screen.getByText(testRecipe1Name)).toBeInTheDocument() })
    await waitFor(() => { expect(screen.getByText(testRecipe2Name)).toBeInTheDocument() })
})

test("renders correct recipe list header after click on import button", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()
    render(<BrowserRouter><ExternalRecipeImportView /></BrowserRouter>)
    
    // Act
    userEvent.click(screen.getByText(StringResource.General.RecipeImportButton))

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.RecipeImportListHeader)).toBeInTheDocument() })
})

test("render as much list items as recipes are passed after click on import button", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()
    const { container } = render(<BrowserRouter><ExternalRecipeImportView /></BrowserRouter>)

    // Act
    userEvent.click(screen.getByText(StringResource.General.RecipeImportButton))
    
    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("recipeListItem__container").length).toBe(2) })
})

test("renders empty list item text after click on import button", async () => {
    // Arrange
    server = setupServer(...emptyHandlers)
    server.listen()
    render(<BrowserRouter><ExternalRecipeImportView /></BrowserRouter>)
    
    // Act
    userEvent.click(screen.getByText(StringResource.General.RecipeImportButton))

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.NoRecipesImported)).toBeInTheDocument() })
})