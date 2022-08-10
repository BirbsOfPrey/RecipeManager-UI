import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Component } from 'react';
import { createIngredient } from '../../models/Ingredient';
import { createIngredientComponent, IngredientComponent } from '../../models/IngredientComponent';
import { IngredientComponentValidators } from '../../models/IngredientComponentValidators';
import StringResource from '../../resources/StringResource';
import { IngredientSelectCreate } from '../controls/IngredientSelectCreate';
import './IngredientComponentDialog.css'

interface IProps {
    open: boolean
    handleCancel: () => void
    handleOk: (ingredientComponent: IngredientComponent) => void
    ingredientComp: IngredientComponent
}

interface IState {
    ingredientComp: IngredientComponent
}

export class IngredientComponentDialog extends Component<IProps, IState> {

    state: IState = {
        ingredientComp: this.props.ingredientComp
    }

    componentDidUpdate(prevProps: IProps, _: IState) {
        if (this.props.open && !prevProps.open) {
            this.setState({ ingredientComp: this.props.ingredientComp })
        }
    }

    updateIngredientComp = (property: string, value: string) => {
        // TODO: Spread-Operator vs. Object.assign. Which one should we take?
        // var updatedIngrComp = {...this.state.ingredientComp}
        // switch (property) {
        //     case 'physicalQuantity':
        //         updatedIngrComp.physicalQuantity = value
        //         break
        //     case 'amount':
        //         updatedIngrComp.amount = value as unknown as number
        //         break
        //     default:
        //         break
        // }
        const updatedIngrComp = Object.assign(this.state.ingredientComp, {
            [property]: value
        })
        this.setState({ ingredientComp: updatedIngrComp })
    }

    updateIngredient = (ingredientName: string) => {
        var updatedIngrComp = {...this.state.ingredientComp}
        updatedIngrComp.ingredient = updatedIngrComp.ingredient || createIngredient()
        updatedIngrComp.ingredient.name = ingredientName
        this.setState({ ingredientComp: updatedIngrComp })
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.handleOk}>
                    <DialogTitle>Zutat hinzufügen</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Wählen Sie die Zutat und die gewünschte Menge für das Rezept
                        </DialogContentText>
                        <IngredientSelectCreate
                            setValue={this.updateIngredient}
                            ingredient={this.state.ingredientComp.ingredient}
                        />
                        <TextField
                            variant="filled"
                            margin="dense"
                            id="amount"
                            label="Menge"
                            type="number"
                            defaultValue={this.state.ingredientComp.amount || IngredientComponentValidators.minAmount}
                            inputProps={{ min: IngredientComponentValidators.minAmount }}
                            onChange={event => this.updateIngredientComp('amount', event.target.value)}
                            error={!IngredientComponentValidators.validateAmount(this.state.ingredientComp.amount)}
                            helperText={IngredientComponentValidators.validateAmount(this.state.ingredientComp.amount) ? " " : StringResource.Messages.RequiredIngredientComponentAmount}
                        />
                        <TextField
                            variant="filled"
                            margin="dense"
                            id="unit"
                            label="Einheit"
                            value={this.state.ingredientComp.physicalQuantity}
                            onChange={event => this.updateIngredientComp('physicalQuantity', event.target.value)}
                            helperText=""
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleCancel}>Abbrechen</Button>
                        <Button onClick={() => this.props.handleOk(this.state.ingredientComp)}>{this.props.ingredientComp.id ? "Ändern" : "Hinzufügen"}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}