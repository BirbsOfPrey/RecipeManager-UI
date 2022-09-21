import { LinearProgress, List, Paper, Typography } from "@mui/material"
import { Component } from "react"
import { Ingredient } from "../../../models/Ingredient"
import { createDefaultHeader, IngredientsUrl } from "../../../resources/Api"
import StringResource from "../../../resources/StringResource"
import { IngredientListItem } from "./IngredientListItem"

interface IState {
    loading: boolean
    error: string
    ingredients: Ingredient[]
}

export class IngredientList extends Component<{}, IState> {
    state: IState = {
        loading: false,
        error: "",
        ingredients: []
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const response = await fetch(`${IngredientsUrl}`, {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.NoIngredientsToDisplay, loading: false })
        } else {
            const ingredients: Ingredient[] = await response.json()
            this.setState({ error: "", ingredients: ingredients, loading: false })
        }
    }

    render() {
        const ingredients = this.state.ingredients

        if (this.state.error.length > 0) {
            return (
                <Typography
                    className="ingredientListContent__message"
                    variant="subtitle1"
                    component="p"
                    color="error.main">
                    {this.state.error}
                </Typography>
            )
        } else if (this.state.loading) {
            return <LinearProgress />
        } else if (ingredients.length <= 0) {
            return (
                <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{ fontWeight: "bold" }}>
                    {StringResource.Messages.NoIngredientsToDisplay}
                </Typography>
            )
        }

        return (
            <div className="ingredientListContent__container">
                <Typography
                    className="ingredientListContent__title"
                    variant="h6"
                    component="p"
                    sx={{ mb: "10px" }}>
                    {StringResource.General.SelectIngredient}
                </Typography>
                <Paper className="ingredientListContent__container"
                    sx={{ maxHeight: { xs: "60vh", md: "70vh", xl: "75vh" }, overflow: "auto" }}>
                    <List disablePadding={true} className="ingredientListContent__list">
                        {ingredients.map(ingredient => (
                            <IngredientListItem
                                key={ingredient.id}
                                ingredient={ingredient}
                            />
                        ))}
                    </List>
                </Paper>
            </div>
        )
    }
}