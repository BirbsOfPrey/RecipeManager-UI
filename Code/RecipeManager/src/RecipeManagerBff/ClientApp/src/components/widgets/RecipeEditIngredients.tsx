import { List, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material"
import Add from '@mui/icons-material/Add'
import React, { Component, ReactNode } from "react"
import { Recipe } from "../../models/Recipe"
import { IngredientComponentListItem } from "./IngredientComponentListItem"
import { IngredientComponent } from "../../models/IngredientComponent"
import { EmptyListItem } from "./EmptyIngredientComponentListItem"
import { RecipeValidators } from "../../models/RecipeValidators"
import StringResource from "../../resources/StringResource"
import { IngredientComponentAddDialog } from "../dialogs/IngredientComponentAddDialog"

interface IProps {
    recipe: Recipe
    setValue: (property: string, value: string) => void
    editable?: boolean
}

interface IState {
    openDialog: boolean
}

export class RecipeEditIngredients extends Component<IProps, IState> {

    state: IState = {
        openDialog: false
    }

    generate(element: React.ReactElement) {
        if (!this.props.recipe.ingredientComponents) {
            return React.cloneElement(<EmptyListItem />, {
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

    newIngredient = () => {
        this.setState({ openDialog: true })
    }

    handleDialogClose = (cancel: boolean) => {
        if (cancel) {
            this.setState({ openDialog: false })
        } else {
            //TODO: Komponente dem Rezept über setValue hinzufügen
            this.setState({ openDialog: false })
        }
    }

    render() {
        const addComponent: ReactNode = this.props.editable ? (
            <ListItemButton onClick={this.newIngredient}>
                <ListItemAvatar>
                    <Add />
                </ListItemAvatar>
                <ListItemText primary="Weitere Zutat hinzufügen" />
            </ListItemButton>) : <></>

        return (
            <div className="recipeEditIngredients__container">
                <TextField
                    variant="filled"
                    className="recipeEditHead__personRefAmountField"
                    type="number"
                    required
                    fullWidth
                    inputProps={{ min: RecipeValidators.minPersonRefAmount, max: RecipeValidators.maxPersonRefAmount, readOnly: !this.props.editable, disabled: !this.props.editable }}
                    label={StringResource.General.RecipePerson}
                    value={this.props.recipe.personRefAmount}
                    onChange={event => this.props.setValue('personRefAmount', event.target.value)}
                    error={!RecipeValidators.validatePersonRefAmount(this.props.recipe.personRefAmount)}
                    helperText={RecipeValidators.validatePersonRefAmount(this.props.recipe.personRefAmount) ? " " : StringResource.Messages.InvalidPersonAmount}
                />
                <List className="recipeEditIngredients__ingredientList">
                    {this.generate(<IngredientComponentListItem ic={new IngredientComponent()} editable={this.props.editable} />)}
                    {addComponent}
                </List>
                <IngredientComponentAddDialog open={this.state.openDialog} handleOk={() => this.handleDialogClose(false)} handleCancel={() => this.handleDialogClose(true)}/>
            </div>
        )
    }
}