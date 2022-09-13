import { Component } from 'react'
import { Link } from 'react-router-dom'
import { mapIsoStringToDate, ScheduledRecipe } from '../../models/ScheduledRecipe'
import { createDefaultHeader, scheduledRecipeFromToQuery } from '../../resources/Api'
import StringResource from '../../resources/StringResource'
import { DailyScheduleItem } from '../widgets/scheduledRecipe/DailyScheduleItem'
import './MainView.css'

interface IState {
    dateToShow: Date
    scheduledRecipes: ScheduledRecipe[]
    error: string
}

export class MainView extends Component<{}, IState> {

    state: IState = {
        dateToShow: new Date(),
        scheduledRecipes: [],
        error: ""
    }

    async componentDidMount() {
        await this.fetchScheduledRecipes()
    }

    fetchScheduledRecipes = async () => {
        const response = await fetch(scheduledRecipeFromToQuery(this.state.dateToShow, this.state.dateToShow), {
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

    render() {
        return (
            <div className="mainview__container">
                <Link className="mainview__RecipeManagement" to={StringResource.Routes.RecipeManagement}>
                    <button>{StringResource.General.RecipeManagement}</button>
                </Link>
                <Link className="mainview__WeeklySchedule" to={StringResource.Routes.WeeklySchedule}>
                    <button>{StringResource.General.WeeklySchedule}</button>
                </Link>

                <DailyScheduleItem
                    editable={false}
                    date={this.state.dateToShow}
                    scheduledRecipes={this.state.scheduledRecipes}
                    addScheduledRecipe={() => { }}
                    deleteScheduledRecipe={() => { }} />
            </div>
        )
    }
}