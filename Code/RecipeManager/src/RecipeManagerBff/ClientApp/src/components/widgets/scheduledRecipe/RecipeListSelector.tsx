import { Component } from 'react'
import { Recipe } from '../../../models/Recipe'
import { createDefaultHeader, RecipesUrl } from '../../../resources/Api'
import StringResource from '../../../resources/StringResource'
import { LinearProgress, List, Paper } from '@mui/material'
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
        const recipes = this.state.recipes

        if (recipes.length !== 0) {
            return (
                <Paper className="recipeListContentSelector__container"
                    sx={{ maxHeight: "60vh", overflow: "auto" }}>
                    <List className="recipeListContentSelector__list"
                        disablePadding={true}>
                        {recipes.map(recipe => (
                            <RecipeListItemSelector
                                key={recipe.id}
                                recipe={recipe}
                                selectRecipe={this.props.selectRecipe} />
                        ))}
                    </List>
                </Paper>
            )
        } else if (this.state.loading === true) {
            return (
                <LinearProgress
                    className="recipeListContentSelector__progress" />
            )
        } else {
            return (
                <p className="recipeListContentSelector__message">{StringResource.Messages.NoRecipesToDisplay}</p>
            )
        }
    }
}