import { List, ListItemButton, ListItemText, styled } from "@mui/material"
import React, { Component } from "react"
import { Recipe } from "../../models/Recipe"
import { IngredientComponentListItem } from "./IngredientComponentListItem"
import { IngredientComponent } from "../../models/IngredientComponent"

interface IProps {
    recipe: Recipe
    setValue: (property: string, value: string) => void
}

export class RecipeEditIngredients extends Component<IProps, {}> {
    
    background = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
      }))

    generate(element: React.ReactElement) {
        if (!this.props.recipe.ingredientComponents) {
            return []
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
                        {this.generate(<IngredientComponentListItem ic={new IngredientComponent()}/>)}
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary="Weitere Zutat hinzufügen" />
                        </ListItemButton>
                    </List>
                </this.background>
                {/* <TextField 
                    id="filled-basic"
                    variant="filled"
                    required
                    fullWidth
                    label={StringResource.General.RecipeName}
                    value={this.props.recipe.name}
                    placeholder={StringResource.General.RecipeName}
                    onChange={event => this.props.setValue('name', event.target.value)}
                    error={!RecipeValidators.validateName(this.props.recipe.name)}
                    helperText={RecipeValidators.validateName(this.props.recipe.name) ? " " : "Ein Rezeptname ist erforderlich"}
                /> */}
            </div>
        )
    }
}