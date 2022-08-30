import { IconButton, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EventIcon from '@mui/icons-material/Event'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Component } from "react"
import { Link } from 'react-router-dom'
import { ScheduledRecipe } from "../../models/ScheduledRecipe"
import StringResource from "../../resources/StringResource"

interface IProps {
    scheduledRecipe: ScheduledRecipe
    scheduledRecipeDeleted: (scheduledRecipeId: number | undefined) => void
}

export class ScheduledRecipeListItem extends Component<IProps, {}> {

    render() {
        const recipeRoute: string = `../${StringResource.Routes.RecipeManagement}/${StringResource.Routes.Recipe}/${this.props.scheduledRecipe.recipe?.id}`

        return (
            <ListItem
                alignItems="flex-start"
                className="scheduledRecipeListItem__container"
                sx={{ paddingRight: '96px' }}>
                <ListItemAvatar>
                    <EventIcon />
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.scheduledRecipe.recipe?.name ? this.props.scheduledRecipe.recipe.name : StringResource.General.NoRecipeName}
                    secondary={this.props.scheduledRecipe.recipe?.description ? this.props.scheduledRecipe.recipe.description : StringResource.General.NoRecipeDescription}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="open"
                        component={Link} to={`${recipeRoute}`}
                        sx={{ marginRight: '0px' }}>
                        <OpenInNewIcon />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => this.props.scheduledRecipeDeleted(this.props.scheduledRecipe.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}