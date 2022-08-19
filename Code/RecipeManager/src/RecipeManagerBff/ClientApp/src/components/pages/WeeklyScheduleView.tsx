import { IconButton, List } from "@mui/material"
import { ArrowCircleLeft, ArrowCircleRight, CalendarMonth } from '@mui/icons-material'
import { Component } from "react"
import { createRecipe, Recipe } from "../../models/Recipe"
import { DailyScheduleItem } from "../widgets/DailyScheduleItem"
import { mapIsoStringToDate, ScheduledRecipe } from "../../models/ScheduledRecipe"
import { createDefaultHeader, ScheduledRecipesUrl } from "../../resources/Api"
import StringResource from "../../resources/StringResource"
import { DateHelper } from "../../models/helper/DateHelper"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps { }

interface IState {
    dateToShow: Date
    scheduledRecipes: ScheduledRecipe[]
    openDeleteConfirmDialog: boolean
    scheduledRecipeIdToDelete: number | undefined
    redirect: boolean // TODO: necessary?
    saved: boolean // TODO: necessary?
    recipe: Recipe // TODO: necessary?
    loading: boolean // TODO: necessary?
    error: string // TODO: necessary?
}

export class WeeklyScheduleView extends Component<IProps, IState> {

    state: IState = {
        dateToShow: new Date(),
        scheduledRecipes: [],
        openDeleteConfirmDialog: false,
        scheduledRecipeIdToDelete: undefined,
        redirect: false,
        saved: true,
        recipe: createRecipe(),
        loading: false,
        error: ''
    }

    async componentDidMount() {
        await this.fetchScheduledRecipes()
    }

    async componentDidUpdate(_: IProps, prevState: IState) {
        if (this.state.dateToShow !== prevState.dateToShow) {
            await this.fetchScheduledRecipes()
        }
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
            mapIsoStringToDate(scheduledRecipes)
            this.setState({ loading: false, scheduledRecipes: scheduledRecipes })
        }
    }

    requestToDeleteScheduledRecipe = (scheduledRecipeId: number | undefined) => {
        this.setState({ openDeleteConfirmDialog: true, scheduledRecipeIdToDelete: scheduledRecipeId })
    }

    deleteScheduledRecipe = async () => {
        const response = await fetch(`${ScheduledRecipesUrl}/${this.state.scheduledRecipeIdToDelete}`, {
            method: 'delete',
            headers: createDefaultHeader(),
            body: JSON.stringify(this.state.scheduledRecipeIdToDelete)
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError, openDeleteConfirmDialog: false })

        } else {
            this.setState({ openDeleteConfirmDialog: false })
            await this.fetchScheduledRecipes()
        }
    }

    handleAbort = () => {
        this.setState({ openDeleteConfirmDialog: false })
    }

    render() {
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
                    {DateHelper.getDayOfWeekAsNumbers().map(number => (
                        <DailyScheduleItem
                            key={number}
                            date={this.getDayOfWeekToShow(number)}
                            scheduledRecipes={this.state.scheduledRecipes.filter(scheduledRecipe => {
                                return scheduledRecipe.date.toDateString() === this.getDayOfWeekToShow(number).toDateString()
                            })}
                            deleteScheduledRecipe={this.requestToDeleteScheduledRecipe} />
                    ))}
                </List>

                <Dialog
                    open={this.state.openDeleteConfirmDialog}
                    onClose={this.handleAbort}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {StringResource.Messages.DeleteScheduledRecipeQuestion}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {StringResource.Messages.DeleteScheduledRecipeContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAbort}>{StringResource.General.Cancel}</Button>
                        <Button onClick={this.deleteScheduledRecipe} autoFocus>{StringResource.General.Delete}</Button>
                    </DialogActions>
                </Dialog>

                <p className="recipeCreateAssistant__errorField" >{this.state.error}</p>
            </div>
        )
    }
}
