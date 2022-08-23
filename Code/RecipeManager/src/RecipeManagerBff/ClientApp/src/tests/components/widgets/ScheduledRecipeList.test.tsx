import { createScheduledRecipe, ScheduledRecipe } from "../../../models/ScheduledRecipe"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StringResource from "../../../resources/StringResource"
import { ScheduledRecipeList } from "../../../components/widgets/ScheduledRecipeList"

const testScheduledRecipe: ScheduledRecipe = createScheduledRecipe()
const mockDelete = jest.fn()

test('renders default text if no scheduled recipes in the list', () => {
    // Arrange

    // Act
    render(<ScheduledRecipeList scheduledRecipes={[]} deleteScheduledRecipe={mockDelete} />)

    // Assert
    const linkElementNoScheduledRecipes = screen.getByText(StringResource.General.NoScheduledRecipes)
    expect(linkElementNoScheduledRecipes).toBeInTheDocument()
})

test('does not render default text if any scheduled recipe is in the list', () => {
    // Arrange

    // Act
    render(<ScheduledRecipeList scheduledRecipes={[testScheduledRecipe]} deleteScheduledRecipe={mockDelete} />)

    // Assert
    const linkElementNoScheduledRecipes = screen.queryByText(StringResource.General.NoScheduledRecipes)
    expect(linkElementNoScheduledRecipes).not.toBeInTheDocument()
})

test('render as much list items as scheduled recipes are passed', () => {
    // Arrange

    // Act
    const { container } = render(<ScheduledRecipeList scheduledRecipes={[testScheduledRecipe, testScheduledRecipe]} deleteScheduledRecipe={mockDelete} />)

    // Assert
    expect(container.getElementsByClassName('scheduledRecipeListItem__container').length).toBe(2);
})

test('calls method deleteScheduledRecipe on click in ScheduledRecipeListItem with correct parameter', () => {
    // Arrange
    const testId = 66
    testScheduledRecipe.id = testId

    // Act
    render(<ScheduledRecipeList scheduledRecipes={[testScheduledRecipe]} deleteScheduledRecipe={mockDelete} />)
    userEvent.click(screen.getByRole("button"))

    // Assert
    expect(mockDelete.mock.calls.length).toBe(1)
    expect(mockDelete).toHaveBeenCalledWith(testId)
})