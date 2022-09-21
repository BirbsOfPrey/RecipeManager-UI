import { Component } from "react"
import { Recipe } from "../../../models/Recipe"
import { createDefaultHeader, RecipesUrl } from "../../../resources/Api"
import StringResource from "../../../resources/StringResource"
import { Box, LinearProgress, List, Paper, Typography } from "@mui/material"
import { RecipeListItemSelector } from "./RecipeListItemSelector"
import { SearchField } from "../../controls/SearchField"

interface IProps {
    selectRecipe: (recipe: Recipe) => void
}

interface IState {
    loading: boolean
    error: string
    search: string
    recipes: Recipe[]
}

export class RecipeListSelector extends Component<IProps, IState> {

    state: IState = {
        loading: false,
        error: "",
        search: "",
        recipes: []
    }

    async componentDidMount() {
        await this.fetchRecipes()
    }

    async fetchRecipes(search?: string) {
        this.setState({ loading: true })

        var query = search ? "?name=" + search : ""
        const response = await fetch(`${RecipesUrl}${query}`, {
            headers: createDefaultHeader()
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError, loading: false })
        } else {
            const recipes = await response.json()
            this.setState({ error: "", recipes: recipes, loading: false })
        }
    }

    searchRecipe(search: string) {
        this.fetchRecipes(search)
        this.setState({ search })
    }

    render() {
        const recipes = this.state.recipes

        if (this.state.loading === true) {
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
                <Box className="recipeListContentSelector__container">
                    <SearchField
                        value={this.state.search}
                        onSearch={value => this.searchRecipe(value)}
                    />
                    {recipes.length === 0 ?
                        <Typography
                            className="recipeListContentSelector__message"
                            variant="subtitle1"
                            component="p"
                            color="error.main"
                            sx={{
                                mt: "20px",
                                mb: "20px"
                            }}>
                            {StringResource.Messages.NoRecipesToDisplay}
                        </Typography> : <div></div>
                    }
                    <Paper sx={{ maxHeight: "50vh", overflow: "auto" }}>
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
                </Box>
            )
        }
    }
}