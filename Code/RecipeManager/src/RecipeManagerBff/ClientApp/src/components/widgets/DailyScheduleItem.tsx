import { Component } from "react"
import { DateHelper } from "../../models/helper/DateHelper"
import { createScheduledRecipe, ScheduledRecipe } from "../../models/ScheduledRecipe"
import { Add } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Recipe } from "../../models/Recipe"
import { ScheduledRecipeDialog } from "../dialogs/ScheduledRecipeDialog"

interface IProps {
    date: Date
    scheduledRecipes: ScheduledRecipe[]
}

interface IState {
    date: Date
    openDialog: boolean
    loading: boolean
    error: string
    // TODO: Remove when changed to correct API Call
    recipe: Recipe
}

export class DailyScheduleItem extends Component<IProps, IState> {

    state: IState = {
        date: this.props.date,
        openDialog: false,
        loading: false,
        error: '',
        recipe: new Recipe()
    }

    newScheduledRecipe = () => {
        this.setState({ openDialog: true })
    }

    handleDialogClose = () => {
        this.setState({ openDialog: false })
        // TODO: Möglicherweise hier nochmals alle ScheduledRecipe von der DB abfragen
    }

    // TODO: Liste der ScheduledRecipes anzeigen mit Möglichkeit zum Löschen und ev. mit Klick das RecipeCookingView öffnen (analog Zutaten-Liste wenn diese fertig ist)
    render() {
        const date: Date = this.props.date
        let schedule: ScheduledRecipe = createScheduledRecipe(new Date())

        if (this.props.scheduledRecipes[0] !== undefined){
            schedule = this.props.scheduledRecipes[0]
        }

        return (
            <div>
                <p>{DateHelper.getNameOfCurrentDay(this.props.date.getDay())}, {date.toLocaleDateString()}</p>
                <IconButton onClick={this.newScheduledRecipe}>
                    <Add />
                </IconButton>

                <p>Hier werden die terminierten Rezepte aufgeführt.</p>
                <p>{this.state.error}</p>
                <p>{schedule.recipe?.name}</p>
                <p>{schedule.date.toISOString()}</p>

                <ScheduledRecipeDialog open={this.state.openDialog} date={this.state.date} handleOk={() => this.handleDialogClose()} handleCancel={() => this.handleDialogClose()} />
            </div>
        )
    }
}
