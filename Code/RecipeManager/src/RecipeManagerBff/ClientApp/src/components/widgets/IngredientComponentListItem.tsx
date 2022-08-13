import { IconButton, ListItemButton, ListItemAvatar, ListItemText, ListItemSecondaryAction } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import EggIcon from '@mui/icons-material/Egg'
import { Component } from "react";
import { IngredientComponent } from "../../models/IngredientComponent";

interface IProps {
    ingredientComponent: IngredientComponent
    editable?: boolean
    personAmount: number
    ingredientComponentSelected: (ingrComp: IngredientComponent) => void
}

export class IngredientComponentListItem extends Component<IProps, {}> {
    
    render() {
        return (
                <ListItemButton
                    alignItems="flex-start"
                    className="recipeListItem__container"
                    onClick={(_) => {
                        if (this.props.editable) {
                            this.props.ingredientComponentSelected(this.props.ingredientComponent)
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
                    primary={this.props.ingredientComponent.ingredient ? this.props.ingredientComponent.ingredient.name : ""}
                    secondary={this.props.ingredientComponent.amount + " " + this.props.ingredientComponent.physicalQuantity}
                />
                </ListItemButton>
                )
    }
}