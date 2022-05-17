import { render, screen } from '@testing-library/react'
import { RecipeEntry } from '../../../components/widgets/RecipeEntry'
import { Recipe } from '../../../models/Recipe';

test('renders recipe name field', () => {
    const testRecipe = getTestRecipe();

    render(<RecipeEntry recipe={testRecipe} />)
    
    const linkElement = screen.getByText(/Testrezept/)
    expect(linkElement).toBeInTheDocument()
});

test('renders recipe id field', () => {
    const testRecipe = getTestRecipe();

    render(<RecipeEntry recipe={testRecipe} />)

    const linkElement = screen.getByText(/5/)
    expect(linkElement).toBeInTheDocument()
});

test('renders recipe name title', () => {
    const testRecipe = getTestRecipe();

    render(<RecipeEntry recipe={testRecipe} />)

    const linkElement = screen.getByText(/Rezept-Name/)
    expect(linkElement).toBeInTheDocument()
});

test('renders recipe id title', () => {
    const testRecipe = getTestRecipe();

    render(<RecipeEntry recipe={testRecipe} />)

    const linkElement = screen.getByText(/Rezept-Id/)
    expect(linkElement).toBeInTheDocument()
});

function getTestRecipe() {
    const testRecipe = new Recipe();

    testRecipe.id = 5;
    testRecipe.name = "Testrezept";

    return testRecipe;
}