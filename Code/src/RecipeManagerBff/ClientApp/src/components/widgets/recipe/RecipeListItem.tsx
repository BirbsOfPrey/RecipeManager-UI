import { ListItemButton, ListItemAvatar, ListItemText } from "@mui/material"
import DinnerDining from "@mui/icons-material/DinnerDining"
import { Recipe } from "../../../models/Recipe"
import { Component } from "react"
import { Link } from "react-router-dom"
import StringResource from "../../../resources/StringResource"

interface IProps {
    recipe: Recipe
}

export class RecipeListItem extends Component<IProps, {}> {

    render() {
        const recipe: Recipe = this.props.recipe

        let name: string = recipe.name ? recipe.name : StringResource.General.NoRecipeName
        let description: string = recipe.description ? recipe.description : StringResource.General.NoRecipeDescription

        const recipeRoute: string = `/${StringResource.Routes.RecipeManagement}/${StringResource.Routes.Recipe}/${recipe.id}`

        return (
            <ListItemButton
                alignItems="flex-start"
                className="recipeListItem__container"
                component={Link} to={recipeRoute}
                sx={{ pr: "64px", pt: "0px", pb: "0px" }}>
                <ListItemAvatar>
                    <DinnerDining />
                </ListItemAvatar>
                <ListItemText
                    className="recipeListItem__text"
                    primary={name}
                    secondary={description}
                />
            </ListItemButton>
        )
    }
}