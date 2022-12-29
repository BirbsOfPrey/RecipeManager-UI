import { Component } from "react"
import { Recipe } from "../../../models/Recipe"
import { createDefaultHeader, RecipesUrl } from "../../../resources/Api"
import StringResource from "../../../resources/StringResource"
import { LinearProgress, List, Paper, Typography } from "@mui/material"
import { RecipeListItem } from "./RecipeListItem"
import { SearchField } from "../../controls/SearchField"

interface IState {
    loading: boolean
    error: string
    search: string
    recipes: Recipe[]
}

export class RecipeList extends Component<{}, IState> {

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

        var query = search ? `?${StringResource.Queries.SearchName}${search}` : ""
        const response = await fetch(`${RecipesUrl}${query}`, {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.NoRecipesToDisplay, loading: false })
        } else {
            const recipes: Recipe[] = await response.json()
            this.setState({ error: "", recipes: recipes, loading: false })
        }
    }

    searchRecipe(search: string) {
        this.fetchRecipes(search)
        this.setState({ search })
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
        }

        return (
            <div className="recipeListContent__container">
                <Typography
                    className="recipeListContent__title"
                    variant="h6"
                    component="p"
                    sx={{ mb: "10px" }}>
                    {StringResource.General.SelectRecipe}
                </Typography>
                <SearchField
                    value={this.state.search}
                    onSearch={value => this.searchRecipe(value)}
                />
                {recipes.length <= 0 ?
                    (
                        <Typography
                            variant="subtitle1"
                            component="p"
                            sx={{ fontWeight: "bold" }}>
                            {StringResource.Messages.NoRecipesToDisplay}
                        </Typography>
                    ) : <div></div>
                }
                <Paper className="recipeListContentSelector__container"
                    sx={{ maxHeight: { xs: "60vh", md: "65vh", xl: "70vh" }, overflow: "auto" }}>
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
