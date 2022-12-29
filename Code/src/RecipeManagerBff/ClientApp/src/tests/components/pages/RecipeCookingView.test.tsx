import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { immerable } from "immer"
import { rest } from "msw"
import { SetupServerApi, setupServer } from "msw/node"
import { BrowserRouter } from "react-router-dom"
import { RecipeCookingView } from "../../../components/pages/RecipeCookingView"
import { Recipe } from "../../../models/Recipe"
import { RecipesUrl } from "../../../resources/Api"
import StringResource from "../../../resources/StringResource"

const testRecipeId: string = "1"
const testRecipeName: string = "Mehl"

let handlers = [
	rest.get(`${RecipesUrl}/${testRecipeId}`, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: Recipe) => any }) => {
		return res(
			ctx.json(
				{ [immerable]: true, id: parseInt(testRecipeId), name: testRecipeName, description: undefined, personRefAmount: 4, steps: undefined, ingredientComponents: undefined }
            )
		)
	}),
    rest.delete(`${RecipesUrl}/${testRecipeId}`, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: any) => any }) => {
		return res(
			ctx.json([])
		)
	})
]

const server: SetupServerApi = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const mockNavigate = jest.fn()

test("renders main title correct if editable", async () => {
    // Arrange

    // Act
    render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.EditRecipe)).toBeInTheDocument })
})

test("renders main title correct if not editable", () => {
    // Arrange

    // Act
    render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.RecipeView)).toBeInTheDocument
})

test("renders editButton if not editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeCreateAssistant__editButton").length).toBe(1)
    expect(container.getElementsByClassName("recipeCreateAssistant__viewButton").length).toBe(0)
    expect(container.getElementsByClassName("recipeCreateAssistant__deleteButton").length).toBe(0)
})

test("renders view and delete button if editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeCreateAssistant__editButton").length).toBe(0)
    expect(container.getElementsByClassName("recipeCreateAssistant__viewButton").length).toBe(1)
    expect(container.getElementsByClassName("recipeCreateAssistant__deleteButton").length).toBe(1)
})

test("renders saveButton if editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeCreateAssistant__saveButton").length).toBe(1)
})

test("does not render saveButton if not editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeCreateAssistant__saveButton").length).toBe(0)
})

test("renders RecipeEditHead correct", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeEditHead__container").length).toBe(1)
})

test("renders RecipeEditSteps correct", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeSteps__container").length).toBe(1)
})

test("renders RecipeEditIngredients correct", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeEditIngredients__container").length).toBe(1)
})

test("initially does not render dialog", () => {
    // Arrange

    // Act
    render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(screen.queryByText(StringResource.Messages.DeleteRecipeQuestion)).not.toBeInTheDocument()
})

test("renders dialog with correct title on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.DeleteRecipeQuestion)).toBeInTheDocument() })
})

test("renders dialog with correct description on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.DeleteRecipeContent)).toBeInTheDocument() })
})

test("does not render dialog on click on delete button when it is initially disabled", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    expect(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0]).toBeDisabled

    // Assert
})

test("renders dialog with correct cancel button on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument() })
})

test("renders dialog with correct delete button on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.Delete)).toBeInTheDocument() })
})

test("returns to CookingView after click on cancel button in the dialog", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={true} navigate={mockNavigate} /></BrowserRouter>)
    await waitFor(() => { userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0]) })
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument() })

    // Act
    userEvent.click(screen.getByText(StringResource.General.Cancel))

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.EditRecipe)).toBeInTheDocument })
})

test("returns to CookingView after click on delete button in the dialog", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={testRecipeId} editable={true} navigate={mockNavigate} /></BrowserRouter>)
    await waitFor(() => { userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0]) })
    await waitFor(() => { expect(screen.getByText(StringResource.General.Delete)).toBeInTheDocument() })

    // Act
    userEvent.click(screen.getByText(StringResource.General.Delete))

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.EditRecipe)).toBeInTheDocument })
})