import { ListItemButton, ListItemAvatar, ListItemText } from "@mui/material"
import DinnerDining from '@mui/icons-material/DinnerDining'
import { Recipe } from "../../models/Recipe"
import { Component } from "react"
import './RecipeListItem.css'

interface IProps {
    recipe: Recipe
    selectRecipe: (recipe: Recipe) => void
}

export class RecipeListItemSelector extends Component<IProps, {}> {

    render() {
        const recipe: Recipe = this.props.recipe

        let name: string = recipe.name ? recipe.name : "Kein Name"
        let description: string
        if (recipe.steps && recipe.steps[0] && recipe.steps[0].instruction && recipe.steps[0].instruction.length > 0) {
            description = recipe.steps[0].instruction
        } else {
            description = "Keine Beschreibung"
        }

        return (
            <ListItemButton
                alignItems="flex-start"
                className="recipeListItem__container"
                onClick={() => this.props.selectRecipe(recipe)}>
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