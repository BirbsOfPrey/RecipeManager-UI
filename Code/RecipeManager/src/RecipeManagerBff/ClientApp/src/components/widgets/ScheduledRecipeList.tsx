import { List } from "@mui/material"
import EventIcon from '@mui/icons-material/Event'
import React, { Component } from "react"
import { NO_INDEX } from "../../models/IngredientComponent"
import { EmptyListItem } from "./EmptyListItem"
import StringResource from "../../resources/StringResource"
import { ScheduledRecipeListItem } from "./ScheduledRecipeListItem"
import { createScheduledRecipe, ScheduledRecipe } from "../../models/ScheduledRecipe"

interface IProps {
    scheduledRecipes: ScheduledRecipe[]
    //TODO: Ist das für das Update hier nötig?
    // setValue: (property: string, value: string) => void
    deleteScheduledRecipe: (scheduledRecipe: ScheduledRecipe) => void
}

export class ScheduledRecipeList extends Component<IProps, {}> {

    generate(element: React.ReactElement) {
        if (this.props.scheduledRecipes.length > 0) {
            return this.props.scheduledRecipes.map((sr, idx) =>
                React.cloneElement(element, {
                    scheduledRecipe: sr
                }))
        } else {
            return <EmptyListItem icon={<EventIcon/>} text={StringResource.General.NoScheduledRecipes} />
        }
    }

    render() {
        return (
            <div className="scheduledRecipeList__container">
                <List className="scheduledRecipeList__List">
                    {this.generate(<ScheduledRecipeListItem 
                        scheduledRecipe={createScheduledRecipe()}
                        scheduledRecipeDeleted={this.props.deleteScheduledRecipe}
                         />)}
                </List>
            </div>
        )
    }
}