import { render, screen, waitFor } from "@testing-library/react"
import { immerable } from "immer"
import { rest } from "msw"
import { setupServer, SetupServerApi } from "msw/node"
import { BrowserRouter } from "react-router-dom"
import { MainView } from "../../../components/pages/MainView"
import { ScheduledRecipe } from "../../../models/ScheduledRecipe"
import { ScheduledRecipesUrl } from "../../../resources/Api"
import StringResource from "../../../resources/StringResource"

const testScheduledRecipe1Id: number = 33
const testScheduledRecipe2Id: number = 56
const testDate: Date = new Date("2022-06-21")

let handlers = [
    rest.get(ScheduledRecipesUrl, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: ScheduledRecipe[]) => any }) => {
        return res(
            ctx.json([
                { [immerable]: true, id: testScheduledRecipe1Id, date: testDate, recipe: undefined },
                { [immerable]: true, id: testScheduledRecipe2Id, date: testDate, recipe: undefined }
            ])
        )
    })
]

const server: SetupServerApi = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeAll(() => {
    jest.useFakeTimers("modern")
    jest.setSystemTime(testDate)
})

afterAll(() => {
    jest.useRealTimers()
})

test("renders text of recipes button correct", () => {
    // Arrange

    // Act
    render(<BrowserRouter><MainView /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.AdditionalRecipes)).toBeInTheDocument()
})

test("renders text of scheduled recipes title correct", () => {
    // Arrange

    // Act
    render(<BrowserRouter><MainView /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.ScheduledRecipesToday)).toBeInTheDocument()
})

test("renders text of additional recipes title correct", () => {
    // Arrange

    // Act
    render(<BrowserRouter><MainView /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.AdditionalRecipes)).toBeInTheDocument()
})

test("renders header of scheduled recipes with correct day and date", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><MainView /></BrowserRouter>)

    // Assert
    const element = container.getElementsByClassName("dailyScheduleItem__header")[0]
    expect(element.textContent).toBe("Dienstag, 21.6.2022")
})

test("renders correct amount of scheduled recipes", async () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><MainView /></BrowserRouter>)

    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("scheduledRecipeListItem__container").length).toBe(2) })
})