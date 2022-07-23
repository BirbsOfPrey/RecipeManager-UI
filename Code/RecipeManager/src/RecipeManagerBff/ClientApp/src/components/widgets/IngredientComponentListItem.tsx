import { IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import EggIcon from '@mui/icons-material/Egg'
import { Component } from "react";
import { IngredientComponent } from "../../models/IngredientComponent";

interface IProps {
    ic: IngredientComponent
    editable?: boolean
}

export class IngredientComponentListItem extends Component<IProps, {}> {
    
    render() {
        return (
                <ListItem
                    secondaryAction={this.props.editable ? 
                        (<IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>) : <></>
                    }
                >
                <ListItemAvatar>
                    <EggIcon />
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.ic.ingredient ? this.props.ic.ingredient.name : ""}
                    secondary={this.props.ic.amount + " " + this.props.ic.physicalQuantity}
                />
                </ListItem>
                )
    }
}