import { TextField, Autocomplete, Checkbox, Switch } from "@mui/material"
import { Component, ReactNode } from "react"
import { Ingredient } from "../../models/Ingredient"
import { IngredientValidators } from "../../models/IngredientValidators"
import StringResource from "../../resources/StringResource"

interface IProps {
    setValue: (ingredientName: string) => void
    ingredient?: Ingredient
}

interface IState {
    newIngredient: boolean
}

export class IngredientSelectCreate extends Component<IProps, IState> {
    state: IState = {
        newIngredient: false
    }

    changeMode = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        this.setState({newIngredient: checked})
    }

    render() {
        let field: ReactNode
        if (this.state.newIngredient) {
            field = (
                <TextField
                    variant="filled"
                    className="ingredientSelectCreate__ingredient"
                    required
                    label={StringResource.General.Ingredient}
                    value={this.props.ingredient ? this.props.ingredient.name : ""}
                    onChange={event => this.props.setValue(event.target.value)}
                    error={!IngredientValidators.validateName(this.props.ingredient?.name)}
                    helperText={IngredientValidators.validateName(this.props.ingredient?.name) ? " " : StringResource.Messages.RequiredIngredientName}
                />)
        } else {
            field = (
                <Autocomplete
                    disablePortal
                    className="ingredientSelectCreate__ingredient"
                    options={["Hoi", "Hallo", "Velo"]}
                    renderInput={(params) => { return (<TextField {...params} label={StringResource.General.Ingredient} variant="filled" />) }}
                />)
        }

        return (
            <div>
                {field}
                <Switch 
                    checked={this.state.newIngredient}
                    onChange={this.changeMode}
                />
            </div>
        )
    }
}