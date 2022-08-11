import { IconButton, ListItemButton, ListItemAvatar, ListItemText, ListItemSecondaryAction } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import EggIcon from '@mui/icons-material/Egg'
import { Component } from "react";
import { IngredientComponent } from "../../models/IngredientComponent";

interface IProps {
    ic: IngredientComponent
    editable?: boolean
    personAmount: number
    ingrCompSelected: (ingrComp: IngredientComponent) => void
}

export class IngredientComponentListItem extends Component<IProps, {}> {
    
    render() {
        return (
                <ListItemButton
                    alignItems="flex-start"
                    className="recipeListItem__container"
                    onClick={(_) => {
                        if (this.props.editable) {
                            this.props.ingrCompSelected(this.props.ic)
                        }
                    }}>
                <ListItemSecondaryAction>
                    {this.props.editable ? 
                            (<IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>) : <></>}
                </ListItemSecondaryAction>
                <ListItemAvatar>
                    <EggIcon />
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.ic.ingredient ? this.props.ic.ingredient.name : ""}
                    secondary={this.props.ic.amount + " " + this.props.ic.physicalQuantity}
                />
                </ListItemButton>
                )
    }
}