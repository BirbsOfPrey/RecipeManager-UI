import { Component } from 'react'
import { Recipe } from '../../models/Recipe'
import { createDefaultHeader, RecipesUrl } from '../../resources/Api'
import './RecipeList.css'
import StringResource from '../../resources/StringResource'
import { List } from '@mui/material'
import { RecipeListItemSelector } from './RecipeListItemSelector'

interface IProps {
    selectRecipe: (recipe: Recipe) => void
}

interface IState {
    recipes: Recipe[]
    loading: boolean
}

export class RecipeListSelector extends Component<IProps, IState> {

    state: IState = {
        recipes: [],
        loading: true
    }

    async componentDidMount() {
        const response = await fetch(`${RecipesUrl}`, {
            headers: createDefaultHeader()
        })
        const recipes = await response.json()
        this.setState({ recipes: recipes, loading: false })
    }

    render() {
        const { recipes } = this.state

        if (this.state.loading) {
            return <p>Loading...</p>
        } else {
            if (recipes.length !== 0) {
                return (
                    <div className="recipeListContentSelector__container">
                        <List className="recipeListContentSelector__list">
                            {recipes.map(recipe => (
                                <RecipeListItemSelector
                                    key={recipe.id}
                                    recipe={recipe}
                                    selectRecipe={this.props.selectRecipe} />
                            ))}
                        </List>
                    </div>
                )
            } else {
                return (
                    <p className="recipeListContent__message">{StringResource.Messages.NoRecipesToDisplay}</p>
                )
            }
        }
    }
}