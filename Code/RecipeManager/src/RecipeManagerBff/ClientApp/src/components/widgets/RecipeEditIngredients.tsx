import { List, ListItemButton, ListItemText, styled } from "@mui/material"
import React, { Component } from "react"
import { Recipe } from "../../models/Recipe"
import { IngredientComponentListItem } from "./IngredientComponentListItem"
import { IngredientComponent } from "../../models/IngredientComponent"
import { EmptyListItem } from "./EmptyIngredientComponentListItem"

interface IProps {
    recipe: Recipe
    setValue: (property: string, value: string) => void
    editable?: boolean
}

export class RecipeEditIngredients extends Component<IProps, {}> {
    
    background = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
      }))

    generate(element: React.ReactElement) {
        if (!this.props.recipe.ingredientComponents) {
            return React.cloneElement(<EmptyListItem/>, {
                key: 0
            })
        } else {
            return this.props.recipe.ingredientComponents.map((ic) => 
                React.cloneElement(element, {
                    key: ic.id,
                    ic: ic
            }))
        }
    }

    render() {
        return (
            <div className="recipeEditIngredients__container">
                <this.background>
                    <List className="recipeEditIngredients__ingredientList">
                        {this.generate(<IngredientComponentListItem ic={new IngredientComponent()} editable={this.props.editable}/>)}
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary="Weitere Zutat hinzufügen" />
                        </ListItemButton>
                    </List>
                </this.background>
            </div>
        )
    }
}