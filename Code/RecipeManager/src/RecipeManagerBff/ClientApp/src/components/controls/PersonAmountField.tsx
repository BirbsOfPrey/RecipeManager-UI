import { TextField } from "@mui/material"
import { RecipeValidator } from "../../models/RecipeValidator"
import StringResource from "../../resources/StringResource"

interface IProps {
    personAmount: number
    setValue: (property: string, value: string) => void
    setViewValue: (value: number) => void
    editable?: boolean
}

export const PersonAmountField = (props: IProps) => {
    const variant = props.editable ? "filled" : "outlined"
    return (
        <TextField
            variant={variant}
            className="personAmountField__refAmount"
            type="number"
            required
            fullWidth
            inputProps={{ min: RecipeValidator.minPersonRefAmount, max: RecipeValidator.maxPersonRefAmount }}
            label={props.editable ? StringResource.General.RecipeRefPerson : StringResource.General.RecipePerson}
            value={props.personAmount}
            onChange={event => props.editable ? props.setValue('personRefAmount', event.target.value) : props.setViewValue(parseInt(event.target.value))}
            error={!RecipeValidator.validatePersonRefAmount(props.personAmount)}
            helperText={RecipeValidator.validatePersonRefAmount(props.personAmount) ? " " : StringResource.Messages.InvalidPersonAmount}
        />
    )
}