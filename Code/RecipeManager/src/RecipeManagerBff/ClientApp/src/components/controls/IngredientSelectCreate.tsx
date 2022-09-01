import { TextField, Autocomplete, Switch, createFilterOptions } from "@mui/material"
import { Component, ReactNode } from "react"
import { Ingredient } from "../../models/Ingredient"
import { IngredientValidator } from "../../models/IngredientValidator"
import { createDefaultHeader, IngredientsUrl } from "../../resources/Api"
import StringResource from "../../resources/StringResource"

interface IProps {
    setValue: (ingredientName: string) => void
    ingredient: Ingredient
}

interface IState {
    newIngredient: boolean
    ingredientNames: string[]
}

export class IngredientSelectCreate extends Component<IProps, IState> {
    state: IState = {
        newIngredient: false,
        ingredientNames: []
    }

    changeMode = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        this.setState({ newIngredient: checked })
    }

    async componentDidMount() {
        await this.fetchIngredients()
    }

    fetchIngredients = async () => {
        const response = await fetch(`${IngredientsUrl}`, {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ ingredientNames: [] })
        } else {
            const ingredients: Ingredient[] = await response.json()
            const ingredientNames: string[] = ingredients.map(i => i.name)
            this.setState({ ingredientNames: ingredientNames })
        }
    }

    render() {
        let field: ReactNode
        if (this.state.newIngredient) {
            field = (
                <TextField
                    variant="filled"
                    className="ingredientSelectCreate__newIngredient"
                    required
                    fullWidth
                    label={StringResource.General.Ingredient}
                    value={this.props.ingredient.name}
                    onChange={event => this.props.setValue(event.target.value)}
                    error={!IngredientValidator.validateName(this.props.ingredient.name)}
                    helperText={IngredientValidator.validateName(this.props.ingredient.name) ? " " : StringResource.Messages.RequiredIngredientName}
                />)
        } else {
            field = (
                <Autocomplete
                    disablePortal
                    className="ingredientSelectCreate__ingredient"
                    options={this.state.ingredientNames}
                    filterOptions={createFilterOptions({
                        matchFrom: 'any',
                        limit: 100,
                    })}
                    value={this.props.ingredient.name}
                    onChange={(_, value) => this.props.setValue(value ? value : "")
                    }
                    renderInput={(params) => { return (<TextField {...params} fullWidth label={StringResource.General.Ingredient} variant="filled" />) }}
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