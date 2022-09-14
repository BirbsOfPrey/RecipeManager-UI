import { Button, Typography } from "@mui/material"
import { Component } from "react"
import { Link } from "react-router-dom"
import { mapIsoStringToDate, ScheduledRecipe } from "../../models/ScheduledRecipe"
import { createDefaultHeader, scheduledRecipeFromToQuery } from "../../resources/Api"
import StringResource from "../../resources/StringResource"
import { DailyScheduleItem } from "../widgets/scheduledRecipe/DailyScheduleItem"

interface IState {
    dateToShow: Date
    scheduledRecipes: ScheduledRecipe[]
}

export class MainView extends Component<{}, IState> {

    state: IState = {
        dateToShow: new Date(),
        scheduledRecipes: []
    }

    async componentDidMount() {
        await this.fetchScheduledRecipes()
    }

    fetchScheduledRecipes = async () => {
        const response = await fetch(scheduledRecipeFromToQuery(this.state.dateToShow, this.state.dateToShow), {
            headers: createDefaultHeader()
        })
        if (response.status < 300) {
            const scheduledRecipes: ScheduledRecipe[] = await response.json()
            mapIsoStringToDate(scheduledRecipes)
            this.setState({ scheduledRecipes: scheduledRecipes })
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

                <DailyScheduleItem
                    editable={false}
                    date={this.state.dateToShow}
                    scheduledRecipes={this.state.scheduledRecipes}
                    addScheduledRecipe={() => { }}
                    deleteScheduledRecipe={() => { }} />

                <Link className="mainView__recipeManagement" to={StringResource.Routes.RecipeManagement}>
                    <Button
                        variant="outlined"
                        sx={{ mt: "50px", mb: "30px" }}>
                        {StringResource.General.AdditionalRecipes}
                    </Button>
                </Link>
            </div>
        )
    }
}