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

        return (
            <ListItemButton
                alignItems="flex-start">
                <ListItemSecondaryAction>
                    <Link to={`${StringResource.Routes.Recipe}/${recipe.id}`}>
                        <IconButton
                            edge="end"
                            aria-label="edit">
                            <Edit />
                        </IconButton>
                    </Link>
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