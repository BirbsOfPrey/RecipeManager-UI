import { IconButton, List } from "@mui/material"
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import { Component } from "react"
import { createRecipe, Recipe } from "../../models/Recipe"
import { DailyScheduleItem } from "../widgets/DailyScheduleItem";

interface IState {
    dateToShow: Date
    redirect: boolean // TODO: necessary?
    saved: boolean // TODO: necessary?
    recipe: Recipe // TODO: necessary?
    loading: boolean // TODO: necessary?
    error: string // TODO: necessary?
}

export class WeeklyScheduleView extends Component<{}, IState> {

    state: IState = {
        dateToShow: new Date(),
        redirect: false,
        saved: true,
        recipe: createRecipe(),
        loading: false,
        error: ''
    }

    // TODO: Parameter 7 does not work.....? I don't know why
    getDayOfWeekToShow = (dayOfWeek: number) => {
        
        const dateToShow = this.state.dateToShow
        const dayOfWeekToShow = dateToShow.getDate() - dateToShow.getDay() + dayOfWeek
        const dateOfWeek = new Date(dateToShow.setDate(dayOfWeekToShow))
        return dateOfWeek
    }

    setPreviousWeek = () => {
        const dateToShow = this.state.dateToShow
        const dayOfPreviousWeek = dateToShow.getDate() - 7;
        this.setState({ dateToShow: new Date(dateToShow.setDate(dayOfPreviousWeek)) })
    }

    setNextWeek = () => {
        const dateToShow = this.state.dateToShow
        const dayOfNextWeek = dateToShow.getDate() + 7;
        this.setState({ dateToShow: new Date(dateToShow.setDate(dayOfNextWeek)) })
    }

    render() {
        const dayOfWeek = [1, 2, 3, 4, 5, 6, 6]

        return (
            <div className="weeklyScheduleView__container">
                <p>Woche vom {this.getDayOfWeekToShow(1).toLocaleDateString()} - {this.getDayOfWeekToShow(6).toLocaleDateString()}</p>
                <IconButton onClick={this.setPreviousWeek}>
                        <ArrowCircleLeft />
                </IconButton>
                <IconButton onClick={this.setNextWeek}>
                        <ArrowCircleRight />
                </IconButton>

                <List className="dailySchedule__list">
                        {dayOfWeek.map(number => (
                            <DailyScheduleItem
                                date={this.getDayOfWeekToShow(number)}/>
                        ))}
                </List>

                <p className="recipeCreateAssistant__errorField" >{this.state.error}</p>
            </div>
        )
    }
}
