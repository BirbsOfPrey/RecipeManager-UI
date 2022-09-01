import { ListItemButton, ListItemAvatar, ListItemText } from "@mui/material"
import DinnerDining from '@mui/icons-material/DinnerDining'
import { Recipe } from "../../../models/Recipe"
import { Component } from "react"
import StringResource from "../../../resources/StringResource"

interface IProps {
    recipe: Recipe
    selectRecipe: (recipe: Recipe) => void
}

export class RecipeListItemSelector extends Component<IProps, {}> {

    render() {
        const recipe: Recipe = this.props.recipe

        let name: string = recipe.name ? recipe.name : StringResource.General.NoRecipeName
        let description: string = recipe.description ? recipe.description : StringResource.General.NoRecipeDescription

        return (
            <ListItemButton
                alignItems="flex-start"
                className="recipeListItemSelector__container"
                onClick={() => this.props.selectRecipe(recipe)}>
                <ListItemAvatar>
                    <DinnerDining />
                </ListItemAvatar>
                <ListItemText
                    className="recipeListItemSelector__text"
                    primary={name}
                    secondary={description}
                />
            </ListItemButton>
        )
    }
}