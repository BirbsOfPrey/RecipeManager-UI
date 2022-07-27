import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Autocomplete } from '@mui/material';
import { Component } from 'react';
import { createIngredient, Ingredient } from '../../models/Ingredient';
import { createIngredientComponent, IngredientComponent } from '../../models/IngredientComponent';
import { IngredientSelectCreate } from '../controls/IngredientSelectCreate';
import './IngredientComponentDialog.css'

interface IProps {
    open: boolean
    handleCancel: () => void
    handleOk: () => void
    ingredientComp?: IngredientComponent
}

interface IState {
    ingredientComp: IngredientComponent
}

export class IngredientComponentDialog extends Component<IProps, IState> {

    state: IState = {
        ingredientComp: this.props.ingredientComp || createIngredientComponent()
    }

    updateIngredientComp = (property: string, value: string) => {
        const updatedIngrComp = Object.assign(this.state.ingredientComp, {
            [property]: value
        })
        this.setState({ ingredientComp: updatedIngrComp })
    }

    updateIngredient = (ingredientName: string) => {
        var updatedIngrComp = {...this.state.ingredientComp}
        var updatedIngr = {...updatedIngrComp.ingredient}
        updatedIngr = updatedIngr || createIngredient()
        updatedIngr.name = ingredientName
        updatedIngrComp.ingredient = updatedIngr
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
                            ingredient={this.state.ingredientComp?.ingredient}
                        />
                        <TextField
                            variant="filled"
                            margin="dense"
                            id="amount"
                            label="Menge"
                            type="number"
                        />
                        <TextField
                            variant="filled"
                            margin="dense"
                            id="unit"
                            label="Einheit"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleCancel}>Abbrechen</Button>
                        <Button onClick={this.props.handleOk}>Hinzufügen</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}