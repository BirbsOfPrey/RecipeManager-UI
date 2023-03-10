import { IconButton, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EventIcon from "@mui/icons-material/Event"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { Component } from "react"
import { Link } from "react-router-dom"
import { ScheduledRecipe } from "../../../models/ScheduledRecipe"
import StringResource from "../../../resources/StringResource"

interface IProps {
    editable: boolean
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
                sx={{ pr: "96px", pt: "0px", pb: "0px" }}>
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
                        sx={{ mr: "0px" }}>
                        <OpenInNewIcon />
                    </IconButton>
                    {this.props.editable ? (
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            className="scheduledRecipeListItem__deleteButton"
                            onClick={() => this.props.scheduledRecipeDeleted(this.props.scheduledRecipe.id)}>
                            <DeleteIcon />
                        </IconButton>
                    ) : ( <div></div> )
                    }
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}