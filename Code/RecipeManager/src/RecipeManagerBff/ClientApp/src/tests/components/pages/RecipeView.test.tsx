import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecipeView } from '../../../components/pages/RecipeView'

test('renders RecipeCookingView correct', () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><RecipeView /></BrowserRouter>)

    // Assert
    const linkElementRecipeCookingView = container.getElementsByClassName("recipeCreateAssistant__container")[0]
    expect(linkElementRecipeCookingView).toBeInTheDocument()
})