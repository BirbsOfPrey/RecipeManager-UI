import { Component } from "react"
import { DateHelper } from "../../../models/helper/DateHelper"
import { ScheduledRecipe } from "../../../models/ScheduledRecipe"
import { Add } from "@mui/icons-material"
import { Box, IconButton, Paper, Typography } from "@mui/material"
import { ScheduledRecipeList } from "./ScheduledRecipeList"
import './DailyScheduleItem.css'


interface IProps {
    editable: boolean
    date: Date
    scheduledRecipes: ScheduledRecipe[]
    deleteScheduledRecipe: (scheduledRecipeId?: number) => void
    addScheduledRecipe: (date: Date) => void
}

export class DailyScheduleItem extends Component<IProps, {}> {

    render() {
        return (
            <Paper className="dailyScheduleItem__container"
                elevation={2}>
                <Box className="dailyScheduleItem__header"
                    sx={{ backgroundColor: "secondary.main" }}>
                    <Typography
                        className="dailyScheduleItem__title"
                        variant="subtitle1"
                        component="p"
                        sx={{ mr: "15px", pl: "18px", pt: "5px", pb: "5px" }}>
                        {DateHelper.getNameOfCurrentDay(this.props.date.getDay())}, {DateHelper.getStringOfDate(this.props.date)}
                    </Typography>
                    {this.props.editable ? (
                        <IconButton size="large" className="dailyScheduleItem__addButton" onClick={() => this.props.addScheduledRecipe(this.props.date)}>
                            <Add />
                        </IconButton>
                    ) : (
                        <></>
                    )}
                </Box>

                <ScheduledRecipeList
                    editable={this.props.editable}
                    scheduledRecipes={this.props.scheduledRecipes}
                    deleteScheduledRecipe={this.props.deleteScheduledRecipe}
                />
            </Paper >
        )
    }
}
