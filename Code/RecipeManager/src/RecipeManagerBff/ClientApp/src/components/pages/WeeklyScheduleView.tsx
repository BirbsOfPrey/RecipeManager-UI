import { IconButton, List } from "@mui/material"
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { Component } from "react"
import { DailyScheduleItem } from "../widgets/DailyScheduleItem"
import { mapIsoStringToDate, ScheduledRecipe } from "../../models/ScheduledRecipe"
import { createDefaultHeader, scheduledRecipeFromToQuery, ScheduledRecipesUrl } from "../../resources/Api"
import StringResource from "../../resources/StringResource"
import { DateHelper } from "../../models/helper/DateHelper"
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ScheduledRecipeCreate } from "../widgets/ScheduledRecipeCreate"
import TextField from "@mui/material/TextField"

interface IState {
    dateToShow: Date
    scheduledRecipes: ScheduledRecipe[]
    openDeleteConfirmDialog: boolean
    scheduledRecipeIdToDelete?: number
    createScheduledRecipe: boolean
    scheduledRecipeAddDate: Date
    error: string
}

export class WeeklyScheduleView extends Component<{}, IState> {

    state: IState = {
        dateToShow: new Date(),
        scheduledRecipes: [],
        openDeleteConfirmDialog: false,
        scheduledRecipeIdToDelete: undefined,
        createScheduledRecipe: false,
        scheduledRecipeAddDate: new Date(),
        error: ''
    }

    async componentDidMount() {
        await this.fetchScheduledRecipes()
    }

    async componentDidUpdate(_: {}, prevState: IState) {
        if (this.state.dateToShow !== prevState.dateToShow) {
            await this.fetchScheduledRecipes()
        }
    }

    getDayOfWeekToShow = (dayOfWeek: number): Date => {
        const dateToShow = new Date(this.state.dateToShow)

        // If dateToShow is Sunday switch week, because the internal week is from Sunday-->Saturday instead of Monday-->Sunday
        if (dateToShow.getDay() === 0){
            dayOfWeek -= 7
        }

        const dayOfWeekToShow = dateToShow.getDate() - dateToShow.getDay() + dayOfWeek
        const dateOfWeek = new Date(dateToShow.setDate(dayOfWeekToShow))
        return dateOfWeek
    }

    changeWeek = (increaseWeek: boolean) => {
        const dayDifferenceNextWeek = 7
        const dayDifferencePreviousWeek = -7

        const dateToShow = new Date(this.state.dateToShow)
        const dayOfChangedWeek = dateToShow.getDate() + (increaseWeek ? dayDifferenceNextWeek : dayDifferencePreviousWeek)
        this.setState({ dateToShow: new Date(dateToShow.setDate(dayOfChangedWeek)) })
    }

    setDate = (newDate: Date | null) => {
        if (newDate !== null) {
            this.setState({ dateToShow: newDate })
        }
    }

    fetchScheduledRecipes = async () => {
        const response = await fetch(scheduledRecipeFromToQuery(this.getDayOfWeekToShow(1), this.getDayOfWeekToShow(7)), {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.ScheduledRecipeNotFound })
        } else {
            const scheduledRecipes: ScheduledRecipe[] = await response.json()
            mapIsoStringToDate(scheduledRecipes)
            this.setState({ scheduledRecipes: scheduledRecipes })
        }
    }

    requestToAddScheduledRecipe = (date: Date) => {
        this.setState({ createScheduledRecipe: true, scheduledRecipeAddDate: date })
    }

    addScheduledRecipe = async (scheduledRecipe: ScheduledRecipe) => {
        const response = await fetch(`${ScheduledRecipesUrl}`, {
            method: 'post',
            headers: createDefaultHeader(),
            body: JSON.stringify(scheduledRecipe)
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError })
        } else {
            this.setState({ createScheduledRecipe: false })
            await this.fetchScheduledRecipes()
        }
    }

    cancelAddScheduledRecipe = () => {
        this.setState({ createScheduledRecipe: false })
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
        if (this.state.createScheduledRecipe) {
            return (
                <div className="createScheduledRecipe__container">
                    <ScheduledRecipeCreate
                        handleCancel={this.cancelAddScheduledRecipe}
                        handleAdd={this.addScheduledRecipe}
                        date={this.state.scheduledRecipeAddDate} />
                </div>
            )
        } else {
            return (
                <div className="weeklyScheduleView__container">
                    <p className="weeklyScheduleView__header">{StringResource.General.ShowSelectedWeek}{new Intl.DateTimeFormat('de-DE').format(this.getDayOfWeekToShow(1))} - {new Intl.DateTimeFormat('de-DE').format(this.getDayOfWeekToShow(7))}</p>
                    <IconButton className="weeklyScheduleView__buttonPrevious" onClick={() => this.changeWeek(false)}>
                        <ArrowCircleLeft />
                    </IconButton>
                    <IconButton className="weeklyScheduleView__buttonNext" onClick={() => this.changeWeek(true)}>
                        <ArrowCircleRight />
                    </IconButton>

                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                        <DatePicker
                            label={StringResource.General.SelectNewDate}
                            value={this.state.dateToShow}
                            onChange={(newValue: Date | null) => {
                                this.setDate(newValue)
                            }}
                            inputFormat='dd.MM.yyyy'
                            renderInput={(params: any) => <TextField {...params} size='small'/>}
                        />
                    </LocalizationProvider>

                    <List className="weeklyScheduleView__dailyScheduleList">
                        {DateHelper.getDayOfWeekAsNumbers().map(number => (
                            <DailyScheduleItem
                                key={number}
                                date={this.getDayOfWeekToShow(number)}
                                scheduledRecipes={this.state.scheduledRecipes.filter(scheduledRecipe => {
                                    return scheduledRecipe.date.toDateString() === this.getDayOfWeekToShow(number).toDateString()
                                })}
                                deleteScheduledRecipe={this.requestToDeleteScheduledRecipe}
                                addScheduledRecipe={this.requestToAddScheduledRecipe} />
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
}
