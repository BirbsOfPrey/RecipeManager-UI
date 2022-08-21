import { Button } from '@mui/material'
import { Component } from 'react'
import { Recipe } from '../../models/Recipe'
import { createScheduledRecipeWithDate, ScheduledRecipe } from '../../models/ScheduledRecipe'
import StringResource from '../../resources/StringResource'
import { RecipeListSelector } from './RecipeListSelector'

interface IProps {
    date: Date
    handleCancel: () => void
    handleAdd: (scheduledRecipe: ScheduledRecipe) => void
}

interface IState {
    scheduledRecipe: ScheduledRecipe
}

export class ScheduledRecipeCreate extends Component<IProps, IState> {

    state: IState = {
        scheduledRecipe: createScheduledRecipeWithDate(this.props.date)
    }

    updateScheduledRecipe = (recipe: Recipe) => {
        const updatedScheduledRecipe = { ...this.state.scheduledRecipe, recipe: recipe }
        this.setState({ scheduledRecipe: updatedScheduledRecipe })
    }

    render() {
        return (
            <div>
                <div className="scheduledRecipeCreate__container">

                    <p>{StringResource.General.SelectedRecipe}</p>
                    <p>{this.state.scheduledRecipe.recipe?.name !== undefined ? this.state.scheduledRecipe.recipe?.name : StringResource.Messages.NoRecipeSelected}</p>
                </div>

                <Button onClick={this.props.handleCancel}>Abbrechen</Button>
                <Button 
                    onClick={() => this.props.handleAdd(this.state.scheduledRecipe)}
                    disabled={this.state.scheduledRecipe.recipe === undefined}>
                    Hinzufügen
                </Button>

                <p className="scheduledRecipeCreate__listTitle">Wählen Sie das gewünschte Rezept aus</p>

                <RecipeListSelector
                    selectRecipe={this.updateScheduledRecipe} />
            </div>
        )
    }
}