import { Component } from 'react'
import { Recipe } from '../../models/Recipe'
import { createDefaultHeader, RecipesUrl } from '../../resources/Api'
import './RecipeList.css'
import StringResource from '../../resources/StringResource'
import { LinearProgress, List } from '@mui/material'
import { RecipeListItem } from './RecipeListItem'

interface IState {
    loading: boolean
    error: string
    recipes: Recipe[]
}

export class RecipeList extends Component<{}, IState> {

    state: IState = {
        loading: false,
        error: "",
        recipes: []
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const response = await fetch(`${RecipesUrl}`, {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.NoRecipesToDisplay, loading: false })
        } else {
            const recipes: Recipe[] = await response.json()
            this.setState({ recipes: recipes, error: "", loading: false })
        }
    }

    render() {
        const recipes = this.state.recipes

        if (this.state.error.length > 0) {
            return (
                <p className="recipeListContent__message">{StringResource.Messages.NoRecipesToDisplay}</p>
            )
        }

        return (
            <div className="recipeListContent__container">
                <p className="recipeListContent__title">{StringResource.General.RecipeList}</p>
                {this.state.loading ? <LinearProgress /> : <></>}
                <List className="recipeListContent__list">
                    {recipes.map(recipe => (
                        <RecipeListItem
                            key={recipe.id}
                            recipe={recipe} />
                    ))}
                </List>
            </div>
        )
    }
}