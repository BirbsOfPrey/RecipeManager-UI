import { TextField } from "@mui/material"
import { RecipeValidators } from "../../models/RecipeValidators"
import StringResource from "../../resources/StringResource"

interface IProps {
    personAmount: number
    setValue: (property: string, value: string) => void
    editable?: boolean
}

export const PersonAmountField = (props: IProps) => {
    return (
        <TextField
            variant="filled"
            className="personAmountField__refAmount"
            type="number"
            required
            fullWidth
            inputProps={{ min: RecipeValidators.minPersonRefAmount, max: RecipeValidators.maxPersonRefAmount }}
            label={StringResource.General.RecipePerson}
            value={props.personAmount}
            onChange={event => props.editable ? props.setValue('personRefAmount', event.target.value) : props.setValue('personAmount', event.target.value)}
            error={!RecipeValidators.validatePersonRefAmount(props.personAmount)}
            helperText={RecipeValidators.validatePersonRefAmount(props.personAmount) ? " " : StringResource.Messages.InvalidPersonAmount}
        />
    )
}