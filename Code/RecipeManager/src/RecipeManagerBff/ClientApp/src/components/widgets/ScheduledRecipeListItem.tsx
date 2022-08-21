import { IconButton, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EventIcon from '@mui/icons-material/Event'
import { Component } from "react"
import { ScheduledRecipe } from "../../models/ScheduledRecipe"

interface IProps {
    scheduledRecipe: ScheduledRecipe
    scheduledRecipeDeleted: (scheduledRecipeId: number | undefined) => void
}

export class ScheduledRecipeListItem extends Component<IProps, {}> {

    render() {
        return (
            <ListItem
                alignItems="flex-start"
                className="scheduledRecipeListItem__container"
                sx={{ paddingRight: '96px' }}>
                <ListItemAvatar>
                    <EventIcon />
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.scheduledRecipe.recipe ? this.props.scheduledRecipe.recipe.name : ""}
                    // TODO: Auskommentieren, wenn verfügbar
                    // secondary={this.props.scheduledRecipe.recipe ? this.props.scheduledRecipe.recipe.description : ""}
                    secondary={"Keine Beschreibung vorhanden"}
                />
                <ListItemSecondaryAction>
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