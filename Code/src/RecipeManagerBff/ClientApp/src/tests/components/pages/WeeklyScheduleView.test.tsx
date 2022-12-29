import { ScheduledRecipe } from "../../../models/ScheduledRecipe"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { WeeklyScheduleView } from "../../../components/pages/WeeklyScheduleView"
import { setupServer, SetupServerApi } from "msw/node"
import { ScheduledRecipesUrl } from "../../../resources/Api"
import { rest } from "msw"
import { immerable } from "immer"
import StringResource from "../../../resources/StringResource"

const testScheduledRecipe1Id: number = 33
const testScheduledRecipe2Id: number = 56
const testScheduledRecipe3Id: number = 78
const testDate: Date = new Date("2022-08-24")

let handlers = [
    rest.get(ScheduledRecipesUrl, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: ScheduledRecipe[]) => any }) => {
        return res(
            ctx.json([
                { [immerable]: true, id: testScheduledRecipe1Id, date: testDate, recipe: undefined },
                { [immerable]: true, id: testScheduledRecipe2Id, date: testDate, recipe: undefined },
                { [immerable]: true, id: testScheduledRecipe3Id, date: new Date("2022-08-01"), recipe: undefined },

            ])
        )
    }),
    rest.delete("/remote/api/scheduledrecipe/33", (_: any, res: any, __: any ) => {
        return res()
    })
]

const server: SetupServerApi = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeAll(() => {
    jest.useFakeTimers("modern")
    jest.setSystemTime(new Date("2022-08-24"))
})

afterAll(() => {
    jest.useRealTimers()
})

test("renders correct header", () => {
    // Arrange

    // Act
    const { container } = render(<WeeklyScheduleView />)

    // Assert
    expect(container.getElementsByClassName("weeklyScheduleView__header")[0].textContent).toBe("Woche vom 22.8.2022 - 28.8.2022")
})

test("renders correct header with click on previous week", () => {
    // Arrange
    const { container } = render(<WeeklyScheduleView />)

    // Act
    userEvent.click(container.getElementsByClassName("weeklyScheduleView__buttonPrevious")[0])

    // Assert
    expect(container.getElementsByClassName("weeklyScheduleView__header")[0].textContent).toBe("Woche vom 15.8.2022 - 21.8.2022")
})

test("renders correct header with click on next week", () => {
    // Arrange
    const { container } = render(<WeeklyScheduleView />)

    // Act
    userEvent.click(container.getElementsByClassName("weeklyScheduleView__buttonNext")[0])

    // Assert
    expect(container.getElementsByClassName("weeklyScheduleView__header")[0].textContent).toBe("Woche vom 29.8.2022 - 4.9.2022")
})

test("renders correct amount of scheduled recipes", async () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><WeeklyScheduleView /></BrowserRouter>)

    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("scheduledRecipeListItem__container").length).toBe(2) })
})

test("initially does not render dialog", () => {
    // Arrange

    // Act
    render(<BrowserRouter><WeeklyScheduleView /></BrowserRouter>)

    // Assert
    expect(screen.queryByText(StringResource.Messages.DeleteScheduledRecipeQuestion)).not.toBeInTheDocument()
})

test("renders dialog with correct title on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><WeeklyScheduleView /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("scheduledRecipeListItem__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.DeleteScheduledRecipeQuestion)).toBeInTheDocument() })
})

test("renders dialog with correct description on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><WeeklyScheduleView /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("scheduledRecipeListItem__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.DeleteScheduledRecipeContent)).toBeInTheDocument() })
})

test("renders dialog with correct cancel button on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><WeeklyScheduleView /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("scheduledRecipeListItem__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument() })
})

test("renders dialog with correct delete button on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><WeeklyScheduleView /></BrowserRouter>)

    // Act
    await waitFor(() => { userEvent.click(container.getElementsByClassName("scheduledRecipeListItem__deleteButton")[0]) })

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.Delete)).toBeInTheDocument() })
})

test("returns to WeeklyScheduleView after click on cancel button in the dialog", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><WeeklyScheduleView /></BrowserRouter>)
    await waitFor(() => { userEvent.click(container.getElementsByClassName("scheduledRecipeListItem__deleteButton")[0]) })
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument() })

    // Act
    userEvent.click(screen.getByText(StringResource.General.Cancel))

    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("weeklyScheduleView__header")[0].textContent).toBe("Woche vom 22.8.2022 - 28.8.2022") })
})

test("returns to WeeklyScheduleView after click on delete button in the dialog", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><WeeklyScheduleView /></BrowserRouter>)
    await waitFor(() => { userEvent.click(container.getElementsByClassName("scheduledRecipeListItem__deleteButton")[0]) })
    await waitFor(() => { expect(screen.getByText(StringResource.General.Delete)).toBeInTheDocument() })

    // Act
    userEvent.click(screen.getByText(StringResource.General.Delete))

    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("weeklyScheduleView__header")[0].textContent).toBe("Woche vom 22.8.2022 - 28.8.2022") })
})