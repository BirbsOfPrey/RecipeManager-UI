import { queryByText, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { immerable } from "immer"
import { rest } from "msw"
import { SetupServerApi, setupServer } from "msw/node"
import { BrowserRouter } from "react-router-dom"
import { IngredientDetailView } from "../../../../components/widgets/ingredient/IngredientDetailView"
import { Ingredient } from "../../../../models/Ingredient"
import { IngredientsUrl } from "../../../../resources/Api"
import StringResource from "../../../../resources/StringResource"

const testIngredientId: string = "25"
const testIngredientName: string = "Mehl"

let handlers = [
	rest.get(`${IngredientsUrl}/${testIngredientId}`, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: Ingredient) => any }) => {
		return res(
			ctx.json(
				{ [immerable]: true, id: parseInt(testIngredientId), name: testIngredientName }
            )
		)
	}),
    rest.delete(`${IngredientsUrl}/${testIngredientId}`, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: any) => any }) => {
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

test("does not render title if not in edit", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(queryByText(container, StringResource.General.CreateNewIngredient)).not.toBeInTheDocument
    expect(queryByText(container, StringResource.General.EditIngredient)).not.toBeInTheDocument
})

test("renders main title correct for new ingredient", () => {
    // Arrange

    // Act
    render(<BrowserRouter><IngredientDetailView editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.CreateNewIngredient)).toBeInTheDocument
})

test("renders main title correct for existing ingredient", async () => {
    // Arrange

    // Act
    render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.EditIngredient)).toBeInTheDocument })
})

test("renders editButton if not editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("ingredientDetailView__editButton").length).toBe(1)
    expect(container.getElementsByClassName("ingredientDetailView__viewButton").length).toBe(0)
    expect(container.getElementsByClassName("ingredientDetailView__deleteButton").length).toBe(0)
})

test("renders view and delete button if editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("ingredientDetailView__editButton").length).toBe(0)
    expect(container.getElementsByClassName("ingredientDetailView__viewButton").length).toBe(1)
    expect(container.getElementsByClassName("ingredientDetailView__deleteButton").length).toBe(1)
})

test("renders saveButton if editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("ingredientDetailView__saveButton").length).toBe(1)
})

test("does not render saveButton if not editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("ingredientDetailView__saveButton").length).toBe(0)
})

test("renders IngredientDetailView correct", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("ingredientDetailView__container").length).toBe(1)
})

test("renders IngredientEdit correct", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("ingredientEdit__container").length).toBe(1)
})

test("initially does not render dialog", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("ingredientDetailView__dialog").length).toBe(0)
    expect(screen.queryByText(StringResource.Messages.DeleteIngredientQuestion)).not.toBeInTheDocument
})

test("renders dialog with correct title on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("ingredientDetailView__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.DeleteIngredientQuestion)).toBeInTheDocument })
})

test("renders dialog with correct description on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("ingredientDetailView__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.DeleteIngredientContent)).toBeInTheDocument })
})

test("does not render dialog on click on delete button when it is initially disabled", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><IngredientDetailView editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    expect(container.getElementsByClassName("ingredientDetailView__deleteButton")[0]).toBeDisabled

    // Assert
})

test("renders dialog with correct cancel button on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("ingredientDetailView__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument })
})

test("renders dialog with correct delete button on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("ingredientDetailView__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.Delete)).toBeInTheDocument })
})

test("returns to DetailView after click on cancel button in the dialog", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={true} navigate={mockNavigate} /></BrowserRouter>)
    await waitFor(() => { userEvent.click(container.getElementsByClassName("ingredientDetailView__deleteButton")[0]) })
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument })

    // Act
    userEvent.click(screen.getByText(StringResource.General.Cancel))

    // Assert
    await waitFor(() => {
        expect(screen.getByText(StringResource.General.EditIngredient)).toBeInTheDocument
        expect(container.getElementsByClassName("ingredientDetailView__dialog").length).toBe(0)
    })
})

test("returns to DetailView after click on delete button in the dialog", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><IngredientDetailView ingredientId={testIngredientId} editable={true} navigate={mockNavigate} /></BrowserRouter>)
    await waitFor(() => { userEvent.click(container.getElementsByClassName("ingredientDetailView__deleteButton")[0]) })
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument })

    // Act
    userEvent.click(screen.getByText(StringResource.General.Delete))

    // Assert
    await waitFor(() => {
        expect(screen.getByText(StringResource.General.EditIngredient)).toBeInTheDocument
        expect(container.getElementsByClassName("ingredientDetailView__dialog").length).toBe(0)
    })
})