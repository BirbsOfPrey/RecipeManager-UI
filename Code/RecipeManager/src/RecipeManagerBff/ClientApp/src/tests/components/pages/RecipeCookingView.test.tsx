import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { RecipeCookingView } from '../../../components/pages/RecipeCookingView'
import { IngredientComponent, createIngredientComponent } from '../../../models/IngredientComponent'
import StringResource from '../../../resources/StringResource'

const mockNavigate = jest.fn()

test('renders main title correct', () => {
    // Arrange

    // Act
    render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.CreateNewRecipe)).toBeInTheDocument
})

test('renders editButton if not editable', () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeCreateAssistant__editButton").length).toBe(1)
    expect(container.getElementsByClassName("recipeCreateAssistant__viewButton").length).toBe(0)
    expect(container.getElementsByClassName("recipeCreateAssistant__deleteButton").length).toBe(0)
})

test('renders view and delete button if editable', () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeCreateAssistant__editButton").length).toBe(0)
    expect(container.getElementsByClassName("recipeCreateAssistant__viewButton").length).toBe(1)
    expect(container.getElementsByClassName("recipeCreateAssistant__deleteButton").length).toBe(1)
})

test('renders saveButton if editable', () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeCreateAssistant__saveButton").length).toBe(1)
})

test('does not render saveButton if not editable', () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeCreateAssistant__saveButton").length).toBe(0)
})

test('renders RecipeEditHead correct', () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeEditHead__container").length).toBe(1)
})

test('renders RecipeEditSteps correct', () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeSteps__container").length).toBe(1)
})

test('renders RecipeEditIngredients correct', () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("recipeEditIngredients__container").length).toBe(1)
})

test('initially does not render dialog', () => {
    // Arrange

    // Act
    render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(screen.queryByText(StringResource.Messages.DeleteRecipeQuestion)).not.toBeInTheDocument()
})

test('renders dialog with correct title on click on delete button', async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0])

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.DeleteRecipeQuestion)).toBeInTheDocument() })
})

test('renders dialog with correct description on click on delete button', async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0])

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.DeleteRecipeContent)).toBeInTheDocument() })
})

test('renders dialog with correct cancel button on click on delete button', async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0])

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument() })
})

test('renders dialog with correct delete button on click on delete button', async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0])

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.Delete)).toBeInTheDocument() })
})

test('does not render dialog after click on cancel button in the dialog', async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={true} navigate={mockNavigate} /></BrowserRouter>)
    userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0])
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument() })

    // Act
    userEvent.click(screen.getByText(StringResource.General.Cancel))

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.CreateNewRecipe)).toBeInTheDocument })
})

test('returns to CookingView after click on delete button in the dialog', async () => {
    // Arrange
    const { container } = render(<BrowserRouter><RecipeCookingView recipeId={"1"} editable={true} navigate={mockNavigate} /></BrowserRouter>)
    userEvent.click(container.getElementsByClassName("recipeCreateAssistant__deleteButton")[0])
    await waitFor(() => { expect(screen.getByText(StringResource.General.Delete)).toBeInTheDocument() })

    // Act
    userEvent.click(screen.getByText(StringResource.General.Delete))

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.CreateNewRecipe)).toBeInTheDocument })
})