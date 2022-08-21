import { Component } from "react"
import { DateHelper } from "../../models/helper/DateHelper"
import { ScheduledRecipe } from "../../models/ScheduledRecipe"
import { Add } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { ScheduledRecipeList } from "./ScheduledRecipeList"

interface IProps {
    date: Date
    scheduledRecipes: ScheduledRecipe[]
    deleteScheduledRecipe: (scheduledRecipeId?: number) => void
    addScheduledRecipe: (date: Date) => void
}

export class DailyScheduleItem extends Component<IProps, {}> {

    render() {
        return (
            <div>
                <p>{DateHelper.getNameOfCurrentDay(this.props.date.getDay())}, {this.props.date.toLocaleDateString()}</p>
                <IconButton onClick={() => this.props.addScheduledRecipe(this.props.date)}>
                    <Add />
                </IconButton>

                <ScheduledRecipeList
                        scheduledRecipes={this.props.scheduledRecipes}
                        deleteScheduledRecipe={this.props.deleteScheduledRecipe}
                    />
            </div>
        )
    }
}
