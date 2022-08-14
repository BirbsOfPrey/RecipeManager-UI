import { List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import Add from '@mui/icons-material/Add'
import EggIcon from '@mui/icons-material/Egg'
import React, { Component, ReactNode } from "react"
import { Recipe } from "../../models/Recipe"
import { IngredientComponentListItem } from "./IngredientComponentListItem"
import { createIngredientComponent, IngredientComponent, NO_INDEX } from "../../models/IngredientComponent"
import { EmptyListItem } from "./EmptyListItem"
import { IngredientComponentDialog } from "../dialogs/IngredientComponentDialog"
import { PersonAmountField } from "../controls/PersonAmountField"
import StringResource from "../../resources/StringResource"

interface IProps {
    recipe: Recipe
    setValue: (property: string, value: string) => void
    setIngredientComponent: (index: number, ingredientComponent: IngredientComponent) => void
    deleteIngredientComponent: (index: number, ingredientComponent: IngredientComponent) => void
    editable?: boolean
}

interface IState {
    openDialog: boolean
    personAmount: number
    ingredientComponentForDialog?: IngredientComponent
    indexForDialog: number
}

export class RecipeEditIngredients extends Component<IProps, IState> {

    state: IState = {
        openDialog: false,
        personAmount: this.props.recipe.personRefAmount,
        ingredientComponentForDialog: createIngredientComponent(),
        indexForDialog: NO_INDEX
    }

    generate(element: React.ReactElement) {
        if (this.props.recipe.ingredientComponents && this.props.recipe.ingredientComponents.length > 0) {
            return this.props.recipe.ingredientComponents.map((ic, idx) =>
                React.cloneElement(element, {
                    index: idx,
                    ingredientComponent: ic
                }))
        } else {
            return <EmptyListItem icon={<EggIcon/>} text={StringResource.General.NoIngredients} />
        }
    }

    newIngredientComponent = () => {
        this.setState({ openDialog: true, ingredientComponentForDialog: undefined, indexForDialog: NO_INDEX })
    }

    openIngredientComponent = (index: number, ingredientComponent: IngredientComponent) => {
        this.setState({ openDialog: true, ingredientComponentForDialog: ingredientComponent, indexForDialog: index })
    }
    
    handleDialogClose = (index: number, ingredientComponent?: IngredientComponent) => {
        if (ingredientComponent) {
            this.props.setIngredientComponent(index, ingredientComponent)
            this.setState({ openDialog: false })
        } else {
            this.setState({ openDialog: false })
        }
    }

    render() {
        const addComponent: ReactNode = this.props.editable ? (
            <ListItemButton onClick={this.newIngredientComponent}>
                <ListItemAvatar>
                    <Add />
                </ListItemAvatar>
                <ListItemText primary={StringResource.General.AddIngredient} />
            </ListItemButton>) : <></>

        const personAmount = this.props.editable ? this.props.recipe.personRefAmount : this.state.personAmount

        return (
            <div className="recipeEditIngredients__container">
                <PersonAmountField
                    personAmount={personAmount}
                    setValue={this.props.setValue}
                    setViewValue={(value) => this.setState({ personAmount: value })}
                    editable={this.props.editable}
                />
                <List className="recipeEditIngredients__ingredientList">
                    {this.generate(<IngredientComponentListItem 
                        ingredientComponent={createIngredientComponent()} 
                        index={NO_INDEX}
                        editable={this.props.editable} 
                        personAmount={personAmount} 
                        personRefAmount={this.props.recipe.personRefAmount} 
                        ingredientComponentSelected={this.openIngredientComponent}
                        ingredientComponentDeleted={this.props.deleteIngredientComponent} />)}
                    {addComponent}
                </List>
                <IngredientComponentDialog 
                    open={this.state.openDialog} 
                    handleOk={(index: number, ingredientComp: IngredientComponent) => this.handleDialogClose(index, ingredientComp)} 
                    handleCancel={() => this.handleDialogClose(NO_INDEX)} 
                    ingredientComponent={this.state.ingredientComponentForDialog}
                    reference={this.state.indexForDialog} />
            </div>
        )
    }
}