import { render } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { RecipesUrl } from '../../../resources/Api'
import { RecipeList } from '../../../components/widgets/RecipeList'
import { Recipe } from '../../../models/Recipe'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const testRecipe1Id: number = 54
const testRecipe1Name: string = 'Testrezept'
const testRecipe2Id: number = 68
const testRecipe2Name: string = 'Super gutes Rezept'

let handlers = [
	rest.get(RecipesUrl, (req: any, res: (arg0: any) => any, ctx: { json: (arg0: Recipe[]) => any }) => {
		return res(
			ctx.json([
				{id: testRecipe1Id, name: testRecipe1Name, personRefAmount: 4, steps: [], ingredientComponents: []},
				{id: testRecipe2Id, name: testRecipe2Name, personRefAmount: 2, steps: [], ingredientComponents: []}
			])
		)
	})
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())



test('fetches and renders all recipe names and id\'s', async () => {
    // Arrange
	
	// Act
	const { findByText } = render(<BrowserRouter><Routes><Route path='/' element={<RecipeList />} /></Routes></BrowserRouter>)

	// Assert
    expect(await findByText(testRecipe1Name)).toBeInTheDocument
    expect(await findByText(testRecipe2Name)).toBeInTheDocument
})