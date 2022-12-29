import { Component } from "react"
import { Stack, TextField } from "@mui/material"
import StringResource from "../../../resources/StringResource"
import { Ingredient } from "../../../models/Ingredient"
import { IngredientValidator } from "../../../models/IngredientValidator"

interface IProps {
    ingredient: Ingredient
    setValue: (property: string, value: string) => void
    editable?: boolean
}

export class IngredientEdit extends Component<IProps, {}> {

    render() {
        const { ingredient, editable, setValue } = this.props
        const variant = editable ? "filled" : "outlined"

        return (
            <Stack className="ingredientEdit__container" spacing={2}>
                <TextField
                    variant={variant}
                    className="ingredientEdit__nameField"
                    required
                    fullWidth
                    inputProps={{ readOnly: !editable, disabled: !editable }}
                    label={StringResource.General.IngredientName}
                    value={ingredient.name ? ingredient.name : ""}
                    placeholder={StringResource.General.IngredientName}
                    onChange={event => setValue("name", event.target.value)}
                    error={editable && !IngredientValidator.validateName(ingredient.name)}
                    helperText={editable && !IngredientValidator.validateName(ingredient.name) ? StringResource.Messages.RequiredIngredientName : " "}
                />
            </Stack>
        )
    }
}