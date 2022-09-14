import { Button, Typography } from '@mui/material'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { mapIsoStringToDate, ScheduledRecipe } from '../../models/ScheduledRecipe'
import { createDefaultHeader, scheduledRecipeFromToQuery } from '../../resources/Api'
import StringResource from '../../resources/StringResource'
import { DailyScheduleItem } from '../widgets/scheduledRecipe/DailyScheduleItem'

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
            this.setState({ error: "", scheduledRecipes: scheduledRecipes })
        }
    }

    render() {
        return (
            <div className="mainView__container">
                <Typography
                    className="mainView__scheduledRecipes"
                    variant="h6"
                    component="p"
                    sx={{ mt: "50px", mb: "15px" }}>
                    {StringResource.General.ScheduledRecipesToday}
                </Typography>

                <Typography
                    className="mainView__errorField"
                    variant="subtitle1"
                    component="p"
                    color="error.main"
                    sx={{
                        mt: "20px",
                        mb: "20px"
                    }}>
                    {this.state.error}
                </Typography>

                <DailyScheduleItem
                    editable={false}
                    date={this.state.dateToShow}
                    scheduledRecipes={this.state.scheduledRecipes}
                    addScheduledRecipe={() => { }}
                    deleteScheduledRecipe={() => { }} />

                <Typography
                    className="mainView__recipeManagement"
                    variant="h6"
                    component="p"
                    sx={{ mt: "50px", mb: "20px" }}>
                    {StringResource.General.AdditionalRecipes}
                </Typography>

                <Link className="mainView__recipeManagement" to={StringResource.Routes.RecipeManagement}>
                    <Button variant="outlined">{StringResource.General.RecipeManagement}</Button>
                </Link>
            </div>
        )
    }
}