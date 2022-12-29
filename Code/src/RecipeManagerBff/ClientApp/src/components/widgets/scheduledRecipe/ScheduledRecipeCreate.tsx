import { DinnerDining } from "@mui/icons-material"
import { Box, Button, Paper, Typography } from "@mui/material"
import { Component } from "react"
import { DateHelper } from "../../../models/helper/DateHelper"
import { Recipe } from "../../../models/Recipe"
import { createScheduledRecipeWithDate, ScheduledRecipe } from "../../../models/ScheduledRecipe"
import StringResource from "../../../resources/StringResource"
import { RecipeListSelector } from "./RecipeListSelector"
import "./ScheduledRecipeCreate.css"

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
                <Paper className="scheduledRecipeCreate__header"
                    sx={{ pt: "15px", pb: "15px", pl: "25px", mb: "15px" }}>
                    <Typography
                        variant="subtitle1"
                        component="p"
                        sx={{ fontWeight: "bold" }}>
                        {StringResource.General.SelectedRecipe}{DateHelper.getNameOfCurrentDay(this.props.date.getDay())}, {DateHelper.getStringOfDate(this.props.date)}
                    </Typography>

                    <Typography
                        className="scheduledRecipeCreate__selectedRecipeName"
                        variant="body1"
                        noWrap
                        component="p"
                        sx={{ mt: "10px" }}>
                        <DinnerDining sx={{ mr: "25px" }} />
                        {this.state.scheduledRecipe.recipe?.name ? this.state.scheduledRecipe.recipe?.name : StringResource.Messages.NoRecipeSelected}
                    </Typography>
                </Paper>
                <Box className="scheduledRecipeCreate__buttons">
                    <Button
                        className="scheduledRecipeCreate__cancelButton"
                        onClick={this.props.handleCancel}
                        variant="outlined"
                        sx={{ mr: "10px" }}>
                        {StringResource.General.Cancel}
                    </Button>

                    <Button
                        className="scheduledRecipeCreate__addButton"
                        onClick={() => this.props.handleAdd(this.state.scheduledRecipe)}
                        disabled={this.state.scheduledRecipe.recipe === undefined}
                        variant="outlined">
                        {StringResource.General.Add}
                    </Button>
                </Box>
                <Typography
                    className="scheduledRecipeCreate__listTitle"
                    variant="subtitle1"
                    component="p"
                    sx={{
                        mt: "25px",
                        mb: "5px",
                        fontWeight: "bold"
                    }}>
                    {StringResource.General.SelectRecipe}
                </Typography>

                <RecipeListSelector
                    selectRecipe={this.updateScheduledRecipe} />
            </div >
        )
    }
}