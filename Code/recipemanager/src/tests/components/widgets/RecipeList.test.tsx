import { render } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { RecipeList } from '../../../components/widgets/RecipeList'
import { RecipesUrl } from '../../../models/Recipe'

let handlers = [
	rest.get(RecipesUrl, (req: any, res: (arg0: any) => any, ctx: { json: (arg0: { id: number; name: string; }[]) => any }) => {
		return res(
			ctx.json([
				{id: 54, name: 'Testrezept'},
				{id: 68, name: 'Super gutes Rezept'}
			])
		)
	})
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())



test('fetches and renders all recipe names and id\'s', async () => {
    const { findByText } = render(<RecipeList />)

    expect(await findByText(/54/)).toBeInTheDocument
    expect(await findByText(/Testrezept/)).toBeInTheDocument
    expect(await findByText(/68/)).toBeInTheDocument
    expect(await findByText(/Super gutes Rezept/)).toBeInTheDocument
})