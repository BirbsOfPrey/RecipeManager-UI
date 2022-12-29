import { List } from "@mui/material"
import EventIcon from "@mui/icons-material/Event"
import { Component } from "react"
import { EmptyListItem } from "../EmptyListItem"
import StringResource from "../../../resources/StringResource"
import { ScheduledRecipeListItem } from "./ScheduledRecipeListItem"
import { ScheduledRecipe } from "../../../models/ScheduledRecipe"

interface IProps {
    editable: boolean
    scheduledRecipes: ScheduledRecipe[]
    deleteScheduledRecipe: (scheduledRecipeId?: number) => void
}

export class ScheduledRecipeList extends Component<IProps, {}> {

    generate() {
        if (this.props.scheduledRecipes.length > 0) {
            return this.props.scheduledRecipes.map((sr, idx) =>
            (<ScheduledRecipeListItem
                key={idx}
                editable={this.props.editable}
                scheduledRecipe={sr}
                scheduledRecipeDeleted={this.props.deleteScheduledRecipe}
            />))
        } else {
            return <EmptyListItem icon={<EventIcon />} text={StringResource.General.NoScheduledRecipes} />
        }
    }

    render() {
        return (
            <div className="scheduledRecipeList__container">
                <List disablePadding={true} className="scheduledRecipeList__List">
                    {this.generate()}
                </List>
            </div>
        )
    }
}