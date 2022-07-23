import { IconButton, ListItemButton, ListItemAvatar, ListItemText, ListItemSecondaryAction } from "@mui/material";
import DinnerDining from '@mui/icons-material/DinnerDining'
import Edit from '@mui/icons-material/Edit'
import { Recipe } from "../../models/Recipe";
import { Component } from "react";
import { Link } from 'react-router-dom';
import StringResource from "../../resources/StringResource";

interface IProps {
    recipe: Recipe
}

export class RecipeListItem extends Component<IProps, {}> {

    render() {
        const recipe = this.props.recipe

        let primary: string = recipe.name ? recipe.name : "Kein Name"
        let secondary: string
        if (recipe.steps && recipe.steps[0] && recipe.steps[0].instruction && recipe.steps[0].instruction.length > 0) {
            secondary = recipe.steps[0].instruction
        } else {
            secondary = "Keine Beschreibung"
        }

        const recipeRoute = `${StringResource.Routes.Recipe}/${recipe.id}`

        return (
            <ListItemButton
                alignItems="flex-start"
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
                    primary={primary}
                    secondary={secondary}
                />
            </ListItemButton>
        )
    }
}