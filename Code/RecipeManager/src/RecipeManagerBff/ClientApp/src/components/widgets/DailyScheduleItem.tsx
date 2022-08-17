import { Component } from "react"
import { DateHelper } from "../../models/helper/DateHelper"
import { ScheduledRecipe } from "../../models/ScheduledRecipe"
import { Add } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { ScheduledRecipeDialog } from "../dialogs/ScheduledRecipeDialog"
import { ScheduledRecipeList } from "./ScheduledRecipeList"

interface IProps {
    date: Date
    scheduledRecipes: ScheduledRecipe[]
}

interface IState {
    openDialog: boolean
}

export class DailyScheduleItem extends Component<IProps, IState> {

    state: IState = {
        openDialog: false,
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
        return (
            <div>
                <p>{DateHelper.getNameOfCurrentDay(this.props.date.getDay())}, {this.props.date.toLocaleDateString()}</p>
                <IconButton onClick={this.newScheduledRecipe}>
                    <Add />
                </IconButton>

                <ScheduledRecipeList
                        scheduledRecipes={this.props.scheduledRecipes}
                        //TODO: Methode erstellen und zuweisen
                        // setValue={this.newScheduledRecipe}
                        //TODO: Methode erstellen und zuweisen
                        // deleteScheduledRecipes={this.newScheduledRecipe}
                    />

                <ScheduledRecipeDialog open={this.state.openDialog} date={this.props.date} handleOk={() => this.handleDialogClose()} handleCancel={() => this.handleDialogClose()} />
            </div>
        )
    }
}
