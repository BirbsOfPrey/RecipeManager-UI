import { Component } from 'react'
import { Recipe } from '../../../models/Recipe'
import { createDefaultHeader, RecipesUrl } from '../../../resources/Api'
import StringResource from '../../../resources/StringResource'
import { LinearProgress, List, Paper, Typography } from '@mui/material'
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
            this.setState({ error: "", recipes: recipes, loading: false })
        }
    }

    render() {
        const recipes = this.state.recipes

        if (this.state.error.length > 0) {
            return (
                <Typography
                    className="recipeListContent__message"
                    variant="subtitle1"
                    component="p"
                    color="error.main">
                    {this.state.error}
                </Typography>
            )
        } else if (this.state.loading) {
            return <LinearProgress />
        } else if (recipes.length <= 0) {
            return (
                <Typography
                    variant="subtitle1"
                    component="p"
                    color="error.main"
                    sx={{
                        fontWeight: "bold"
                    }}>
                    {StringResource.Messages.NoRecipesToDisplay}
                </Typography>
            )
        }

        return (
            <div className="recipeListContent__container">
                <Typography
                    className="recipeListContent__title"
                    variant="h6"
                    component="p"
                    sx={{
                        mb: "10px"
                    }}>
                    {StringResource.General.SelectRecipe}
                </Typography>
                <Paper className="recipeListContentSelector__container"
                    sx={{ maxHeight: { xs: "60vh", md: "70vh", xl: "75vh" }, overflow: "auto" }}>
                    <List disablePadding={true} className="recipeListContent__list">
                        {recipes.map(recipe => (
                            <RecipeListItem
                                key={recipe.id}
                                recipe={recipe} />
                        ))}
                    </List>
                </Paper>

            </div>
        )
    }
}