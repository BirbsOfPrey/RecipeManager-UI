import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRecipe, Recipe } from "../../../models/Recipe"
import { BrowserRouter } from "react-router-dom"
import { DailyScheduleItem } from '../../../components/widgets/DailyScheduleItem'
import { createScheduledRecipeWithDate, ScheduledRecipe } from '../../../models/ScheduledRecipe'

const testDate: Date = new Date("2022-08-15")
const mockDeleteScheduledRecipe = jest.fn()
const mockAddScheduledRecipe = jest.fn()

const testRecipe1Id: number = 54
const testRecipe1Name: string = 'Testrezept'
const testRecipe2Id: number = 68
const testRecipe2Name: string = 'Super gutes Rezept'

const testRecipe1: Recipe = createRecipe()
testRecipe1.id = testRecipe1Id
testRecipe1.name = testRecipe1Name
const testRecipe2: Recipe = createRecipe()
testRecipe2.id = testRecipe2Id
testRecipe2.name = testRecipe2Name

const testScheduledRecipe1: ScheduledRecipe = createScheduledRecipeWithDate(testDate)
testScheduledRecipe1.recipe = testRecipe1
const testScheduledRecipe2: ScheduledRecipe = createScheduledRecipeWithDate(testDate)
testScheduledRecipe2.recipe = testRecipe2

const testScheduledRecipes: ScheduledRecipe[] = [testScheduledRecipe1, testScheduledRecipe2]

test('renders header with correct day and date', () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><DailyScheduleItem date={testDate} scheduledRecipes={testScheduledRecipes} deleteScheduledRecipe={mockDeleteScheduledRecipe} addScheduledRecipe={mockAddScheduledRecipe} /></BrowserRouter>)

    // Assert
    const element = container.getElementsByClassName('dailyScheduleItem__header')[0]
    expect(element.textContent).toBe("Montag, 15.8.2022")
})

test('calls method addScheduledRecipe on click', async () => {
    // Arrange
    const { container } = render(<BrowserRouter><DailyScheduleItem date={testDate} scheduledRecipes={testScheduledRecipes} deleteScheduledRecipe={mockDeleteScheduledRecipe} addScheduledRecipe={mockAddScheduledRecipe} /></BrowserRouter>)

    // Act
    userEvent.click(container.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeLarge dailyScheduleItem__addButton css-mf1cb5-MuiButtonBase-root-MuiIconButton-root")[0])

    // Assert
    expect(mockAddScheduledRecipe.mock.calls.length).toBe(1)
    expect(mockAddScheduledRecipe).toHaveBeenCalledWith(testDate)
})
