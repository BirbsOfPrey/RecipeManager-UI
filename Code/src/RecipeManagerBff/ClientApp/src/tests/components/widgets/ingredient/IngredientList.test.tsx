import { render, screen, waitFor } from "@testing-library/react"
import { rest } from "msw"
import { setupServer, SetupServerApi } from "msw/node"
import { IngredientsUrl } from "../../../../resources/Api"
import { BrowserRouter } from "react-router-dom"
import StringResource from "../../../../resources/StringResource"
import { Ingredient } from "../../../../models/Ingredient"
import { IngredientList } from "../../../../components/widgets/ingredient/IngredientList"
import { immerable } from "immer"

const testIngredient1Id: number = 34
const testIngredient1Name: string = "Mehl"
const testIngredient2Id: number = 99
const testIngredient2Name: string = "Rahm"

let handlers = [
	rest.get(IngredientsUrl, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: Ingredient[]) => any }) => {
		return res(
			ctx.json([
				{ [immerable]: true, id: testIngredient1Id, name: testIngredient1Name },
                { [immerable]: true, id: testIngredient2Id, name: testIngredient2Name }
            ])
		)
	})
]

let emptyHandlers = [
    rest.get(IngredientsUrl, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: Ingredient[]) => any }) => {
        return res(
            ctx.json([])
        )
    })
]

let server: SetupServerApi

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("renders correct ingredients in the list", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    render(<BrowserRouter><IngredientList /></BrowserRouter>)

    // Assert
    await waitFor(() => {
        expect(screen.getByText(testIngredient1Name)).toBeInTheDocument
        expect(screen.getByText(testIngredient2Name)).toBeInTheDocument
        expect(screen.queryByText(StringResource.Messages.NoIngredientsToDisplay)).not.toBeInTheDocument
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument
    })
})

test("renders progress bar if ingredients loading", async () => {
    // Arrange

    // Act
    render(<BrowserRouter><IngredientList /></BrowserRouter>)

    // Assert
    expect(screen.getByRole("progressbar")).toBeInTheDocument
})

test("render as much list items as ingredients are passed", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    const { container } = render(<BrowserRouter><IngredientList /></BrowserRouter>)
    
    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("ingredientListItem__container").length).toBe(2) })
})

test("renders no ingredients text correct", async () => {
    // Arrange
    server = setupServer(...emptyHandlers)
    server.listen()

    // Act
    const { container } = render(<BrowserRouter><IngredientList /></BrowserRouter>)
    
    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("ingredientListItem__container").length).toBe(0) })
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.NoIngredientsToDisplay)).toBeInTheDocument })
})
