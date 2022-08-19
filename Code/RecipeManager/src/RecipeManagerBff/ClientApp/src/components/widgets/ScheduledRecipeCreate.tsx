import { Button, TextField } from '@mui/material';
import { Component } from 'react';
import { Recipe } from '../../models/Recipe';
import { createScheduledRecipe, ScheduledRecipe } from '../../models/ScheduledRecipe';
import { createDefaultHeader, RecipesUrl } from '../../resources/Api';
import StringResource from '../../resources/StringResource';

interface IProps {
    date: Date
    handleCancel: () => void
    handleOk: (scheduledRecipe: ScheduledRecipe) => void
}

interface IState {
    scheduledRecipe: ScheduledRecipe
}

export class ScheduledRecipeCreate extends Component<IProps, IState> {

    state: IState = {
        scheduledRecipe: createScheduledRecipe()
    }

    async componentDidMount() {
        const response = await fetch(`${RecipesUrl}/${8}`, {
            headers: createDefaultHeader()
        })
        const recipe: Recipe = await response.json()

        const scheduledRecipe = createScheduledRecipe()
        scheduledRecipe.date = this.props.date
        scheduledRecipe.recipe = recipe

        this.setState({ scheduledRecipe: scheduledRecipe })
    }

    updateScheduledRecipe = (property: string, value: string) => {
        const updatedScheduledRecipe = { ...this.state.scheduledRecipe, [property]: value }
        this.setState({ scheduledRecipe: updatedScheduledRecipe })
    }

    render() {
        return (
            <div>
                <div className="scheduledRecipeCreate__container">
                    <TextField
                        variant="filled"
                        className="scheduledRecipeCreate__nameField"
                        required
                        fullWidth
                        label={StringResource.General.RecipeName}
                        placeholder={StringResource.General.RecipeName}
                        onChange={event => this.updateScheduledRecipe('amount', event.target.value)}
                    />
                </div>

                <Button onClick={this.props.handleCancel}>Abbrechen</Button>
                <Button onClick={() => this.props.handleOk(this.state.scheduledRecipe)}>Hinzufügen</Button>
            </div>
        )
    }
}