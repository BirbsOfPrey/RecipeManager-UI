import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StringResource from "../../../../resources/StringResource"
import { ScheduledRecipeCreate } from "../../../../components/widgets/scheduledRecipe/ScheduledRecipeCreate"
import { RecipesUrl } from "../../../../resources/Api"
import { immerable } from "immer"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { Recipe } from "../../../../models/Recipe"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const testDate: Date = new Date("2022-02-01")
const mockHandleCancel = jest.fn()
const mockHandleAdd = jest.fn()

const testRecipe1Id: number = 54
const testRecipe1Name: string = 'Testrezept'
const testRecipe2Id: number = 68
const testRecipe2Name: string = 'Super gutes Rezept'

let handlers = [
    rest.get(RecipesUrl, (req: any, res: (arg0: any) => any, ctx: { json: (arg0: Recipe[]) => any }) => {
        return res(
            ctx.json([
                { [immerable]: true, id: testRecipe1Id, name: testRecipe1Name, description: undefined, personRefAmount: 4, steps: undefined, ingredientComponents: undefined },
                { [immerable]: true, id: testRecipe2Id, name: testRecipe2Name, description: undefined, personRefAmount: 2, steps: undefined, ingredientComponents: undefined }
            ])
        )
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('renders header of selected recipe and default text if no recipe selected', () => {
    // Arrange

    // Act
    render(<ScheduledRecipeCreate date={testDate} handleCancel={mockHandleCancel} handleAdd={mockHandleAdd} />)

    // Assert
    const linkElementSelectedRecipe = screen.getByText(StringResource.General.SelectedRecipe)
    expect(linkElementSelectedRecipe).toBeInTheDocument()
    const linkElementNoRecipeSelected = screen.getByText(StringResource.Messages.NoRecipeSelected)
    expect(linkElementNoRecipeSelected).toBeInTheDocument()
})

test('renders button text correct', () => {
    // Arrange

    // Act
    render(<ScheduledRecipeCreate date={testDate} handleCancel={mockHandleCancel} handleAdd={mockHandleAdd} />)

    // Assert
    const linkElementCancelButton = screen.getByText(StringResource.General.Cancel)
    expect(linkElementCancelButton).toBeInTheDocument()
    const linkElementAddButton = screen.getByText(StringResource.General.Add)
    expect(linkElementAddButton).toBeInTheDocument()
})

test('calls method handleCancel on click', () => {
    // Arrange
    render(<ScheduledRecipeCreate date={testDate} handleCancel={mockHandleCancel} handleAdd={mockHandleAdd} />)
    
    // Act
    userEvent.click(screen.getByText(StringResource.General.Cancel))

    // Assert
    expect(mockHandleCancel.mock.calls.length).toBe(1)
})

test('does not call method handleAdd on click when no recipe is selcted', () => {
    // Arrange
    render(<BrowserRouter><Routes><Route path='/' element={<ScheduledRecipeCreate date={testDate} handleCancel={mockHandleCancel} handleAdd={mockHandleAdd} />} /></Routes></BrowserRouter>)

    // Act
    expect(userEvent.click(screen.getByText(StringResource.General.Add), undefined, {skipPointerEventsCheck: true}))

    // Assert
    expect(mockHandleAdd).not.toHaveBeenCalled()
})

test('calls method handleAdd on click when recipe is selcted', async () => {
    // Arrange
    const { findByText } = render(<BrowserRouter><Routes><Route path='/' element={<ScheduledRecipeCreate date={testDate} handleCancel={mockHandleCancel} handleAdd={mockHandleAdd} />} /></Routes></BrowserRouter>)
    userEvent.click(await findByText(testRecipe1Name))

    // Act
    userEvent.click(screen.getByText(StringResource.General.Add))

    // Assert
    expect(mockHandleAdd.mock.calls.length).toBe(1)
})

test('renders selected recipe name if a recipe was selected', async () => {
    // Arrange
    const { container, findByText } = render(<BrowserRouter><Routes><Route path='/' element={<ScheduledRecipeCreate date={testDate} handleCancel={mockHandleCancel} handleAdd={mockHandleAdd} />} /></Routes></BrowserRouter>)
    

    // Act
    userEvent.click(await findByText(testRecipe1Name))

    // Assert
    const element = container.getElementsByClassName("scheduledRecipeCreate__selectedRecipeName")[0]
    expect(element.textContent).toBe(testRecipe1Name)
    const linkElementNoRecipeSelected = screen.queryByText(StringResource.Messages.NoRecipeSelected)
    expect(linkElementNoRecipeSelected).not.toBeInTheDocument()
})