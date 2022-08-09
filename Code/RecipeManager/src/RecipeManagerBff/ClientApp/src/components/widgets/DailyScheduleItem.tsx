import { Component } from "react";
import StringResource from "../../resources/StringResource";
import { getDefaultHeader as createDefaultHeader, RecipesUrl } from "../../resources/Api";
import { ScheduledRecipe } from "../../models/ScheduledRecipe";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Recipe } from "../../models/Recipe";
import { ScheduledRecipeDialog } from "../dialogs/ScheduledRecipeDialog";

interface IProps {
    date: Date
}

interface IState {
    date: Date
    scheduledRecipe: ScheduledRecipe[]
    openDialog: boolean
    loading: boolean
    error: string
    // TODO: Remove when changed to correct API Call
    recipe: Recipe
}

export class DailyScheduleItem extends Component<IProps, IState> {

    state: IState = {
        date: this.props.date,
        scheduledRecipe: [],
        openDialog: false,
        loading: false,
        error: '',
        recipe: new Recipe()
    }

    async componentDidMount() {
        // TODO: Change to correct API Call
        await this.fetchRecipe('1')
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.date !== this.props.date) {
            // TODO: Change to correct API Call
            this.fetchRecipe('2')
        }
    }

    getNameOfCurrentDay = () => {
        switch (this.props.date.getDay()) {
            case 0:
                return StringResource.General.Sunday
            case 1:
                return StringResource.General.Monday
            case 2:
                return StringResource.General.Tuesday
            case 3:
                return StringResource.General.Wednesday
            case 4:
                return StringResource.General.Thursday
            case 5:
                return StringResource.General.Friday
            case 6:
                return StringResource.General.Saturday
            default:
                return StringResource.General.Unknown
        }
    }

    newScheduledRecipe = () => {
        this.setState({ openDialog: true })
    }

    handleDialogClose = () => {
        this.setState({ openDialog: false })
        // TODO: Möglicherweise hier nochmals alle ScheduledRecipe von der DB abfragen
    }

    fetchRecipe = async (id: string) => {
        this.setState({ loading: true })
        const response = await fetch(`${RecipesUrl}/${id}`, {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.RecipeNotFound, loading: false })
        } else {
            const recipe = await response.json()
            this.setState({ loading: false, recipe: recipe })
        }
    }

    // TODO: Liste der ScheduledRecipes anzeigen mit Möglichkeit zum Löschen und ev. mit Klick das RecipeCookingView öffnen (analog Zutaten-Liste wenn diese fertig ist)
    render() {
        const date: Date = this.props.date

        return (
            <div>
                <p>{this.getNameOfCurrentDay()}, {date.toLocaleDateString()}</p>
                <IconButton onClick={this.newScheduledRecipe}>
                    <Add />
                </IconButton>

                <p>Hier werden die terminierten Rezepte aufgeführt.</p>
                <p>{this.state.recipe.name}</p>

                <ScheduledRecipeDialog open={this.state.openDialog} date={this.state.date} handleOk={() => this.handleDialogClose()} handleCancel={() => this.handleDialogClose()} />
            </div>
        )
    }
}