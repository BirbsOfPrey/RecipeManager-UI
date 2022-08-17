import { IconButton, ListItemButton, ListItemAvatar, ListItemText, ListItemSecondaryAction } from "@mui/material"
import DinnerDining from '@mui/icons-material/DinnerDining'
import Edit from '@mui/icons-material/Edit'
import { Recipe } from "../../models/Recipe"
import { Component } from "react"
import { Link } from 'react-router-dom'
import StringResource from "../../resources/StringResource"
import './RecipeListItem.css'

interface IProps {
    recipe: Recipe
}

export class RecipeListItem extends Component<IProps, {}> {

    render() {
        const recipe: Recipe = this.props.recipe

        let name: string = recipe.name ? recipe.name : StringResource.General.NoRecipeName
        let description: string = recipe.description ? recipe.description : StringResource.General.NoRecipeDescription

        const recipeRoute: string = `${StringResource.Routes.Recipe}/${recipe.id}`

        return (
            <ListItemButton
                alignItems="flex-start"
                className="recipeListItem__container"
                component={Link} to={recipeRoute}>
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        component={Link} to={`${recipeRoute}?${StringResource.Queries.EditOn}`}>
                        <Edit />
                    </IconButton>
                </ListItemSecondaryAction>
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