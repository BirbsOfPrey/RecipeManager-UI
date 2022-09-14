import { List, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material"
import Add from "@mui/icons-material/Add"
import EggIcon from "@mui/icons-material/Egg"
import { Component, ReactNode } from "react"
import { IngredientComponentListItem } from "./IngredientComponentListItem"
import { createIngredientComponent, IngredientComponent } from "../../../models/IngredientComponent"
import { EmptyListItem } from "../EmptyListItem"
import { IngredientComponentDialog } from "../../dialogs/IngredientComponentDialog"
import { PersonAmountField } from "../../controls/PersonAmountField"
import StringResource from "../../../resources/StringResource"
import { NO_INDEX } from "../../../models/helper/ArrayHelper"

interface IProps {
    personRefAmount: number
    ingredientComponents?: IngredientComponent[]
    setValue: (property: string, value: string) => void
    updateIngredientComponent: (index: number, ingredientComponent: IngredientComponent) => void
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
        personAmount: this.props.personRefAmount,
        ingredientComponentForDialog: createIngredientComponent(),
        indexForDialog: NO_INDEX
    }

    generate(personAmount: number) {
        if (this.props.ingredientComponents && this.props.ingredientComponents.length > 0) {
            return this.props.ingredientComponents.map((ic, idx) =>
            (<IngredientComponentListItem
                key={idx}
                ingredientComponent={ic}
                index={idx}
                editable={this.props.editable}
                personAmount={personAmount}
                personRefAmount={this.props.personRefAmount}
                ingredientComponentSelected={this.openIngredientComponent}
                ingredientComponentDeleted={this.props.deleteIngredientComponent}
            />))
        } else {
            return <EmptyListItem icon={<EggIcon />} text={StringResource.General.NoIngredients} />
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
            this.props.updateIngredientComponent(index, ingredientComponent)
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
                <ListItemText primary={StringResource.General.AddAnotherIngredient} />
            </ListItemButton>) : <div></div>

        const personAmount = this.props.editable ? this.props.personRefAmount : this.state.personAmount

        return (
            <div className="recipeEditIngredients__container">
                <PersonAmountField
                    personAmount={personAmount}
                    setValue={this.props.setValue}
                    setViewValue={(value) => this.setState({ personAmount: value })}
                    editable={this.props.editable}
                />

                <Typography
                    className="recipeEditIngredients__title"
                    variant="subtitle1"
                    component="p"
                    sx={{ ml: "5px", mt: "5px", mb: "10px" }}>
                    {StringResource.General.Ingredients}
                </Typography>

                <List disablePadding={true} className="recipeEditIngredients__ingredientList">
                    {this.generate(personAmount)}
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