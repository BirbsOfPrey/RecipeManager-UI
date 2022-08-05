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

    getDayOfWeekToShow = (dayOfWeek: number): Date => {
        const dateToShow = new Date(this.state.dateToShow)
        const dayOfWeekToShow = dateToShow.getDate() - dateToShow.getDay() + dayOfWeek
        const dateOfWeek = new Date(dateToShow.setDate(dayOfWeekToShow))
        return dateOfWeek
    }

    changeWeek = (direction: string) => {
        let changeDays = 0
        if (direction === 'previous') {
            changeDays = -7
        } else if (direction === 'next') {
            changeDays = 7
        }
        const dateToShow = new Date(this.state.dateToShow)
        const dayOfChangedWeek = dateToShow.getDate() + changeDays;
        this.setState({ dateToShow: new Date(dateToShow.setDate(dayOfChangedWeek)) })
    }

    render() {
        const dayOfWeek = [1, 2, 3, 4, 5, 6, 7]

        return (
            <div className="weeklyScheduleView__container">
                <p>Woche vom {this.getDayOfWeekToShow(1).toLocaleDateString()} - {this.getDayOfWeekToShow(7).toLocaleDateString()}</p>
                <IconButton onClick={() => this.changeWeek('previous')}>
                        <ArrowCircleLeft />
                </IconButton>
                <IconButton onClick={() => this.changeWeek('next')}>
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
