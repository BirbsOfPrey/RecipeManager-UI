import { ListItemButton, ListItemAvatar, ListItemText } from "@mui/material"
import EggIcon from "@mui/icons-material/Egg"
import { Component } from "react"
import { Link } from "react-router-dom"
import StringResource from "../../../resources/StringResource"
import { Ingredient } from "../../../models/Ingredient"

interface IProps {
    ingredient: Ingredient
}

export class IngredientListItem extends Component<IProps, {}> {

    render() {
        const ingredient: Ingredient = this.props.ingredient

        let name: string = ingredient.name ? ingredient.name : StringResource.General.NoIngredientName

        const ingredientRoute: string = `${StringResource.Routes.Ingredient}/${ingredient.id}`

        return (
            <ListItemButton
                alignItems="flex-start"
                className="ingredientListItem__container"
                component={Link} to={ingredientRoute}
                sx={{ pt: "5px", pb: "5px" }}>
                <ListItemAvatar>
                    <EggIcon />
                </ListItemAvatar>
                <ListItemText
                    className="ingredientListItem__text"
                    primary={name}
                />
            </ListItemButton>
        )
    }
}
