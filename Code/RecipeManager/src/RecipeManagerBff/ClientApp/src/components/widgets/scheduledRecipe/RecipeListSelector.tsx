import { Component } from 'react'
import { Recipe } from '../../../models/Recipe'
import { createDefaultHeader, RecipesUrl } from '../../../resources/Api'
import StringResource from '../../../resources/StringResource'
import { LinearProgress, List, Paper, Typography } from '@mui/material'
import { RecipeListItemSelector } from './RecipeListItemSelector'

interface IProps {
    selectRecipe: (recipe: Recipe) => void
}

interface IState {
    recipes: Recipe[]
    loading: boolean
    error: string
}

export class RecipeListSelector extends Component<IProps, IState> {

    state: IState = {
        recipes: [],
        loading: true,
        error: ''
    }

    async componentDidMount() {
        const response = await fetch(`${RecipesUrl}`, {
            headers: createDefaultHeader()
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError, loading: false })
        } else {
            const recipes = await response.json()
            this.setState({ recipes: recipes, loading: false })
        }
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
        } else if (this.state.error) {
            return (
                <Typography
                    className="recipeListContentSelector__errorField"
                    variant="subtitle1"
                    component="p"
                    color="error.main"
                    sx={{
                        mt: "20px",
                        mb: "20px"
                    }}>
                    {this.state.error}
                </Typography>
            )
        } else {
            return (
                <p className="recipeListContentSelector__message">{StringResource.Messages.NoRecipesToDisplay}</p>
            )
        }
    }
}