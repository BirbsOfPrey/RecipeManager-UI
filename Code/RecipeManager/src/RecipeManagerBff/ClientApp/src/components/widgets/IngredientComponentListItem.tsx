import { IconButton, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EggIcon from '@mui/icons-material/Egg'
import { Component } from "react"
import { IngredientComponent } from "../../models/IngredientComponent"
import Edit from '@mui/icons-material/Edit'

interface IProps {
    ingredientComponent: IngredientComponent
    index: number
    editable?: boolean
    personAmount: number
    ingredientComponentSelected: (index: number, ingrComp: IngredientComponent) => void
    ingredientComponentDeleted: (index: number, ingrComp: IngredientComponent) => void
}

export class IngredientComponentListItem extends Component<IProps, {}> {

    render() {
        return (
            <ListItem
                alignItems="flex-start"
                className="recipeListItem__container"
                sx={{ paddingRight: '96px' }}>
                <ListItemSecondaryAction>
                    {this.props.editable ?
                        (<>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => this.props.ingredientComponentSelected(this.props.index, this.props.ingredientComponent)}
                                sx={{ marginRight: '0px' }}>
                                <Edit />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => this.props.ingredientComponentDeleted(this.props.index, this.props.ingredientComponent)}>
                                <DeleteIcon />
                            </IconButton>
                        </>) : <></>}
                </ListItemSecondaryAction>
                <ListItemAvatar>
                    <EggIcon />
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.ingredientComponent.ingredient ? this.props.ingredientComponent.ingredient.name : ""}
                    secondary={this.props.ingredientComponent.amount + " " + this.props.ingredientComponent.physicalQuantity}
                />
            </ListItem>
        )
    }
}