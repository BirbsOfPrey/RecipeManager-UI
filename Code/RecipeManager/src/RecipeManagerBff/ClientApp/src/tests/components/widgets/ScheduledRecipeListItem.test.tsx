import { ScheduledRecipeListItem } from "../../../components/widgets/ScheduledRecipeListItem"
import { createScheduledRecipeWithDate, ScheduledRecipe } from "../../../models/ScheduledRecipe"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRecipe, Recipe } from "../../../models/Recipe"
import StringResource from "../../../resources/StringResource"

const testDate: Date = new Date("2022-07-20")
const testRecipe: Recipe = createRecipe()
const testRecipeName: string = "Cookie"
const testRecipeDescription: string = "Mit feinster Schokolade"
const testScheduledRecipe: ScheduledRecipe = createScheduledRecipeWithDate(testDate)
const mockDeleted = jest.fn()

test('renders default text if no recipe in the scheduled recipe', () => {
    // Arrange

    // Act
    render(<ScheduledRecipeListItem scheduledRecipe={testScheduledRecipe} scheduledRecipeDeleted={mockDeleted} />)

    // Assert
    const linkElementRecipeName = screen.getByText(StringResource.General.NoRecipeName)
    expect(linkElementRecipeName).toBeInTheDocument()
    const linkElementRecipeDescription = screen.getByText(StringResource.General.NoRecipeDescription)
    expect(linkElementRecipeDescription).toBeInTheDocument()
})

test('renders default text if recipe without name and description in the scheduled recipe', () => {
    // Arrange
    testScheduledRecipe.recipe = testRecipe
    
    // Act
    render(<ScheduledRecipeListItem scheduledRecipe={testScheduledRecipe} scheduledRecipeDeleted={mockDeleted} />)

    // Assert
    const linkElementRecipeName = screen.getByText(StringResource.General.NoRecipeName)
    expect(linkElementRecipeName).toBeInTheDocument()
    const linkElementRecipeDescription = screen.getByText(StringResource.General.NoRecipeDescription)
    expect(linkElementRecipeDescription).toBeInTheDocument()
})

test('renders correct name and description of the recipe in the scheduled recipe', () => {
    // Arrange
    testRecipe.name = testRecipeName
    testRecipe.description = testRecipeDescription
    testScheduledRecipe.recipe = testRecipe
    
    // Act
    render(<ScheduledRecipeListItem scheduledRecipe={testScheduledRecipe} scheduledRecipeDeleted={mockDeleted} />)

    // Assert
    const linkElementRecipeName = screen.getByText(testRecipeName)
    expect(linkElementRecipeName).toBeInTheDocument()
    const linkElementRecipeDescription = screen.getByText(testRecipeDescription)
    expect(linkElementRecipeDescription).toBeInTheDocument()
})

test('calls method scheduledRecipeDeleted on click with correct parameter', () => {
    // Arrange
    const testId = 66
    testScheduledRecipe.id = testId
    render(<ScheduledRecipeListItem scheduledRecipe={testScheduledRecipe} scheduledRecipeDeleted={mockDeleted} />)

    // Act
    userEvent.click(screen.getByRole("button"))

    // Assert
    expect(mockDeleted.mock.calls.length).toEqual(1)
    expect(mockDeleted).toHaveBeenCalledWith(testId)
})