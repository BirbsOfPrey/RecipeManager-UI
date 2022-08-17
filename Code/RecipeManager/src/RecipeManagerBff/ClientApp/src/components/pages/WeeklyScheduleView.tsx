import { IconButton, List } from "@mui/material"
import { ArrowCircleLeft, ArrowCircleRight, CalendarMonth, ScheduleSendRounded } from '@mui/icons-material';
import { Component } from "react"
import { createRecipe, Recipe } from "../../models/Recipe"
import { DailyScheduleItem } from "../widgets/DailyScheduleItem";
import { ScheduledRecipe } from "../../models/ScheduledRecipe";
import { createDefaultHeader, ScheduledRecipesUrl } from "../../resources/Api";
import StringResource from "../../resources/StringResource";

interface IState {
    dateToShow: Date
    scheduledRecipes: ScheduledRecipe[]
    redirect: boolean // TODO: necessary?
    saved: boolean // TODO: necessary?
    recipe: Recipe // TODO: necessary?
    loading: boolean // TODO: necessary?
    error: string // TODO: necessary?
}

export class WeeklyScheduleView extends Component<{}, IState> {

    state: IState = {
        dateToShow: new Date(),
        scheduledRecipes: [],
        redirect: false,
        saved: true,
        recipe: createRecipe(),
        loading: false,
        error: ''
    }

    async componentDidMount() {
        await this.fetchScheduledRecipes()
    }

    getDayOfWeekToShow = (dayOfWeek: number): Date => {
        const dateToShow = new Date(this.state.dateToShow)
        const dayOfWeekToShow = dateToShow.getDate() - dateToShow.getDay() + dayOfWeek
        const dateOfWeek = new Date(dateToShow.setDate(dayOfWeekToShow))
        return dateOfWeek
    }

    changeWeek = async (direction: string) => {
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

    setDate = () => {
        // TODO: DatePicker ergänzen
        this.setState({ dateToShow: new Date(2022, 11, 12) })
    }

    fetchScheduledRecipes = async () => {
        this.setState({ loading: true })
        const response = await fetch(`${ScheduledRecipesUrl}/${this.getDayOfWeekToShow(1).toISOString()}/${this.getDayOfWeekToShow(7).toISOString()}`, {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.ScheduledRecipeNotFound, loading: false })
        } else {
            const scheduledRecipes: ScheduledRecipe[] = await response.json()

            scheduledRecipes.forEach(scheduledRecipe => {
                const dateIsoString = scheduledRecipe.date
                scheduledRecipe.date = new Date(dateIsoString)
            })

            this.setState({ loading: false, scheduledRecipes: scheduledRecipes })
        }
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
                <IconButton>
                    <CalendarMonth onClick={this.setDate} />
                </IconButton>

                <List className="dailySchedule__list">
                    {dayOfWeek.map(number => (
                        <DailyScheduleItem
                            key={number}
                            date={this.getDayOfWeekToShow(number)}
                            scheduledRecipes={this.state.scheduledRecipes.filter(scheduledRecipe => {
                                return scheduledRecipe.date.toDateString() === this.getDayOfWeekToShow(number).toDateString()
                            })} />
                    ))}
                </List>

                <p className="recipeCreateAssistant__errorField" >{this.state.error}</p>
            </div>
        )
    }
}
