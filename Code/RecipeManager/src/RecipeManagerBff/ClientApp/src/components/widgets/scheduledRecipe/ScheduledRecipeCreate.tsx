import { DinnerDining } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { Component } from 'react'
import { Recipe } from '../../../models/Recipe'
import { createScheduledRecipeWithDate, ScheduledRecipe } from '../../../models/ScheduledRecipe'
import StringResource from '../../../resources/StringResource'
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
            <div className="scheduledRecipeCreate__container">
                <Typography
                    className="scheduledRecipeCreate__header"
                    variant="h6"
                    component="p"
                    sx={{
                        mr: 2,
                        fontWeight: 'bold'
                    }}>
                    {StringResource.General.SelectedRecipe}
                </Typography>

                <Typography
                    className="scheduledRecipeCreate__selectedRecipeName"
                    variant="body1"
                    noWrap
                    component="p"
                    sx={{
                        mr: 2,
                    }}>
                    <DinnerDining sx={{
                            mr: 3
                        }}/>
                        {this.state.scheduledRecipe.recipe?.name ? this.state.scheduledRecipe.recipe?.name : StringResource.Messages.NoRecipeSelected}
                </Typography>

                <Button
                    className="scheduledRecipeCreate__cancelButton"
                    onClick={this.props.handleCancel}
                    variant="outlined">
                    {StringResource.General.Cancel}
                </Button>
                <Button
                    className="scheduledRecipeCreate__addButton"
                    onClick={() => this.props.handleAdd(this.state.scheduledRecipe)}
                    disabled={this.state.scheduledRecipe.recipe === undefined}
                    variant="outlined">
                    {StringResource.General.Add}
                </Button>

                <Typography
                    className="scheduledRecipeCreate__listTitle"
                    variant="subtitle1"
                    noWrap
                    component="p"
                    sx={{
                        mr: 2,
                        fontWeight: 'bold'
                    }}>
                    {StringResource.General.SelectRecipe}
                </Typography>

                <RecipeListSelector
                    selectRecipe={this.updateScheduledRecipe} />
            </div>
        )
    }
}