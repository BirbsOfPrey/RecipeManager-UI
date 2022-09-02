import { Component } from "react"
import { DateHelper } from "../../../models/helper/DateHelper"
import { ScheduledRecipe } from "../../../models/ScheduledRecipe"
import { Add } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { ScheduledRecipeList } from "./ScheduledRecipeList"
import './DailyScheduleItem.css'


interface IProps {
    date: Date
    scheduledRecipes: ScheduledRecipe[]
    deleteScheduledRecipe: (scheduledRecipeId?: number) => void
    addScheduledRecipe: (date: Date) => void
}

export class DailyScheduleItem extends Component<IProps, {}> {

    render() {
        return (
            <div className="dailyScheduleItem__container">
                <Typography
                    className="dailyScheduleItem__header"
                    variant="h6"
                    noWrap
                    component="p"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 'bold'
                    }}>
                    {DateHelper.getNameOfCurrentDay(this.props.date.getDay())}, {DateHelper.getStringOfDate(this.props.date)}
                </Typography>
                <IconButton size="large" className="dailyScheduleItem__addButton" onClick={() => this.props.addScheduledRecipe(this.props.date)}>
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
