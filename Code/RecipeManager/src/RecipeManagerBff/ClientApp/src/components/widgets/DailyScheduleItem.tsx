import { Component } from "react";
import StringResource from "../../resources/StringResource";
import { getDefaultHeader as createDefaultHeader, RecipesUrl } from "../../resources/Api";
import { ScheduledRecipe } from "../../models/ScheduledRecipe";

interface IProps {
    date: Date
}

interface IState {
    scheduledRecipe: ScheduledRecipe[]
    loading: boolean
    error: string
 }

export class DailyScheduleItem extends Component<IProps, IState> {

    state: IState = {
        scheduledRecipe: [],
        loading: false,
        error: ''
    }

    async componentDidMount() {
        await this.fetchRecipe('1')
    }

    getNameOfCurrentDay = () => {
        switch (this.props.date.getDay()) {
            case 0:
                return "Sonntag"
            case 1:
                return "Montag"
            case 2:
                return "Dienstag"
            case 3:
                return "Mittwoch"
            case 4:
                return "Donnerstag"
            case 5:
                return "Freitag"
            case 6:
                return "Samstag"
            default:
                return "Unknown"
        }
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
            // this.setState({ loading: false, recipe: recipe })
        }
    }

    render() {
        const date: Date = this.props.date

        return (
            <div>
                <p>{this.getNameOfCurrentDay()}, {date.toLocaleDateString()}</p>
                {/* <p>{this.state.scheduledRecipe[0].id}</p> */}
            </div>
        )
    }
}