import { List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import Add from '@mui/icons-material/Add'
import EggIcon from '@mui/icons-material/Egg'
import React, { Component, ReactNode } from "react"
import { Recipe } from "../../models/Recipe"
import { IngredientComponentListItem } from "./IngredientComponentListItem"
import { createIngredientComponent, IngredientComponent } from "../../models/IngredientComponent"
import { EmptyListItem } from "./EmptyListItem"
import { IngredientComponentDialog } from "../dialogs/IngredientComponentDialog"
import { PersonAmountField } from "../controls/PersonAmountField"
import StringResource from "../../resources/StringResource"

interface IProps {
    recipe: Recipe
    setValue: (property: string, value: string) => void
    setIngredientComponent: (ingredientComponent: IngredientComponent) => void
    editable?: boolean
}

interface IState {
    openDialog: boolean
    ingrCompForDialog: IngredientComponent
    personAmount: number
}

export class RecipeEditIngredients extends Component<IProps, IState> {

    state: IState = {
        openDialog: false,
        personAmount: this.props.recipe.personRefAmount,
        ingrCompForDialog: createIngredientComponent()
    }

    generate(element: React.ReactElement) {
        if (this.props.recipe.ingredientComponents) {
            return this.props.recipe.ingredientComponents.map((ic) =>
                React.cloneElement(element, {
                    key: ic.id,
                    ic: ic
                }))
        } else {
            return <EmptyListItem icon={<EggIcon/>} text={StringResource.General.NoIngredients} />
        }
    }

    newIngredientComponent = () => {
        this.setState({ openDialog: true,  ingrCompForDialog: createIngredientComponent()})
    }

    openIngredientComponent = (ingrComp: IngredientComponent) => {
        this.setState({ openDialog: true,  ingrCompForDialog: ingrComp})
    }

    //TODO: Replace Dialog with own "dialog" component? Or hand in ingrComp with state?
    handleDialogClose = (ingredientComp?: IngredientComponent) => {
        if (ingredientComp) {
            this.props.setIngredientComponent(ingredientComp)
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
                />
                <List className="recipeEditIngredients__ingredientList">
                    {this.generate(<IngredientComponentListItem ingredientComponent={createIngredientComponent()} editable={this.props.editable} personAmount={personAmount} ingredientComponentSelected={this.openIngredientComponent} />)}
                    {addComponent}
                </List>
                <IngredientComponentDialog open={this.state.openDialog} handleOk={(ingredientComp: IngredientComponent) => this.handleDialogClose(ingredientComp)} handleCancel={() => this.handleDialogClose()} ingredientComp={this.state.ingrCompForDialog} />
            </div>
        )
    }
}