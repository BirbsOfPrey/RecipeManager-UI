import { ScheduledRecipe } from "../../../models/ScheduledRecipe"
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { WeeklyScheduleView } from "../../../components/pages/WeeklyScheduleView"
import { setupServer } from "msw/node"
import { ScheduledRecipesUrl } from "../../../resources/Api"
import { rest } from "msw"
import { immerable } from "immer"

const testScheduledRecipe1Id: number = 33
const testScheduledRecipe2Id: number = 56
const testScheduledRecipe3Id: number = 78
const testDate: Date = new Date("2022-08-24")

let handlers = [
    rest.get(ScheduledRecipesUrl, (req: any, res: (arg0: any) => any, ctx: { json: (arg0: ScheduledRecipe[]) => any }) => {
        return res(
            ctx.json([
                { [immerable]: true, id: testScheduledRecipe1Id, date: testDate, recipe: undefined },
                { [immerable]: true, id: testScheduledRecipe2Id, date: testDate, recipe: undefined },
                { [immerable]: true, id: testScheduledRecipe3Id, date: new Date("2022-08-01"), recipe: undefined },

            ])
        )
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date("2022-08-24"))
})

afterAll(() => {
    jest.useRealTimers()
})

test('renders correct header', () => {
    // Arrange

    // Act
    const { container } = render(<WeeklyScheduleView />)

    // Assert
    expect(container.getElementsByClassName("weeklyScheduleView__header")[0].textContent).toBe("Woche vom 22.8.2022 - 28.8.2022")
})

test('renders correct header with click on previous week', () => {
    // Arrange
    const { container } = render(<WeeklyScheduleView />)

    // Act
    userEvent.click(container.getElementsByClassName("weeklyScheduleView__buttonPrevious")[0])

    // Assert
    expect(container.getElementsByClassName("weeklyScheduleView__header")[0].textContent).toBe("Woche vom 15.8.2022 - 21.8.2022")
})

test('renders correct header with click on next week', () => {
    // Arrange
    const { container } = render(<WeeklyScheduleView />)

    // Act
    userEvent.click(container.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium weeklyScheduleView__buttonNext css-78trlr-MuiButtonBase-root-MuiIconButton-root")[0])

    // Assert
    expect(container.getElementsByClassName("weeklyScheduleView__header")[0].textContent).toBe("Woche vom 29.8.2022 - 4.9.2022")
})

test('renders correct amount of scheduled recipes', async () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><WeeklyScheduleView /></BrowserRouter>)

    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("scheduledRecipeListItem__container").length).toBe(2) })
})