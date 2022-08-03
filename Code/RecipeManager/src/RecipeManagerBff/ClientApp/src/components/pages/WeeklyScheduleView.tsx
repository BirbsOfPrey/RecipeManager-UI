import { IconButton } from "@mui/material"
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import { Component } from "react"
import { createRecipe, Recipe } from "../../models/Recipe"

interface IState {
    dateToShow: Date
    redirect: boolean // TODO: necessary?
    saved: boolean // TODO: necessary?
    recipe: Recipe // TODO: necessary?
    loading: boolean // TODO: necessary?
    error: string // TODO: necessary?
}

interface IProps {
    // TODO: necessary?
}

export class WeeklyScheduleView extends Component<IProps, IState> {

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
        return (
            <div className="weeklyScheduleView__container">
                <p>Woche vom {this.getDayOfWeekToShow(1).toLocaleDateString()} - {this.getDayOfWeekToShow(6).toLocaleDateString()}</p>
                <IconButton onClick={this.setPreviousWeek}>
                        <ArrowCircleLeft />
                </IconButton>
                <IconButton onClick={this.setNextWeek}>
                        <ArrowCircleRight />
                </IconButton>

                <p className="recipeCreateAssistant__errorField" >{this.state.error}</p>
            </div>
        )
    }
}
