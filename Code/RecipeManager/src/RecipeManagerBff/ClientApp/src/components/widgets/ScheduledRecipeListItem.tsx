import { IconButton, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EventIcon from '@mui/icons-material/Event';
import { Component } from "react"
import { ScheduledRecipe } from "../../models/ScheduledRecipe"

interface IProps {
    scheduledRecipe: ScheduledRecipe
    index: number
    // scheduledRecipeDeleted: (index: number, scheduledRecipe: ScheduledRecipe) => void
}

export class ScheduledRecipeListItem extends Component<IProps, {}> {

    render() {
        return (
            <ListItem
                alignItems="flex-start"
                className="scheduledRecipeListItem__container"
                sx={{ paddingRight: '96px' }}>
                <ListItemSecondaryAction>
                    <>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            // onClick={() => this.props.scheduledRecipeDeleted(this.props.index, this.props.scheduledRecipe)}>
                            >
                            <DeleteIcon />
                        </IconButton>
                    </>
                </ListItemSecondaryAction>
                <ListItemAvatar>
                    <EventIcon />
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.scheduledRecipe.recipe ? this.props.scheduledRecipe.recipe.name : ""}
                    // TODO: Auskommentieren, wenn verfügbar
                    // secondary={this.props.scheduledRecipe.recipe ? this.props.scheduledRecipe.recipe.description : ""}
                    secondary={"Keine Beschreibung vorhanden"}
                />
            </ListItem>
        )
    }
}