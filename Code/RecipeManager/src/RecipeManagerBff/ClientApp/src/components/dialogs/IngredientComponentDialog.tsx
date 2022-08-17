import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Component } from 'react';
import { NO_INDEX } from '../../models/helper/ArrayHelper';
import { createIngredient } from '../../models/Ingredient';
import { createIngredientComponent, IngredientComponent } from '../../models/IngredientComponent';
import { IngredientComponentValidator } from '../../models/IngredientComponentValidator';
import StringResource from '../../resources/StringResource';
import { IngredientSelectCreate } from '../controls/IngredientSelectCreate';
import './IngredientComponentDialog.css'

interface IProps {
    open: boolean
    handleCancel: () => void
    handleOk: (reference: number, ingredientComponent: IngredientComponent) => void
    ingredientComponent?: IngredientComponent
    reference: number
}

interface IState {
    ingredientComponent: IngredientComponent
}

export class IngredientComponentDialog extends Component<IProps, IState> {

    state: IState = {
        ingredientComponent: this.props.ingredientComponent || createIngredientComponent()
    }

    componentDidUpdate(prevProps: IProps, _: IState) {
        if (this.props.open && !prevProps.open) {
            this.setState({ ingredientComponent: this.props.ingredientComponent || createIngredientComponent() })
        }
    }

    updateIngredientComp = (property: string, value: string) => {
        var updatedIngrComp = {...this.state.ingredientComponent, [property]: value} as IngredientComponent
        this.setState({ ingredientComponent: updatedIngrComp })
    }

    updateIngredient = (ingredientName: string) => {
        var updatedIngrComp = {...this.state.ingredientComponent} as IngredientComponent
        updatedIngrComp.ingredient = updatedIngrComp.ingredient || createIngredient()
        updatedIngrComp.ingredient.name = ingredientName
        this.setState({ ingredientComponent: updatedIngrComp })
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.handleCancel}>
                    <DialogTitle>{StringResource.General.AddIngredient}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{StringResource.General.DefineIngredientComponent}</DialogContentText>
                        <IngredientSelectCreate
                            setValue={this.updateIngredient}
                            ingredient={this.state.ingredientComponent.ingredient}
                        />
                        <TextField
                            variant="filled"
                            margin="dense"
                            id="amount"
                            label="Menge"
                            type="number"
                            defaultValue={this.state.ingredientComponent.amount || IngredientComponentValidator.minAmount}
                            inputProps={{ min: IngredientComponentValidator.minAmount }}
                            onChange={event => this.updateIngredientComp('amount', event.target.value)}
                            error={!IngredientComponentValidator.validateAmount(this.state.ingredientComponent.amount)}
                            helperText={IngredientComponentValidator.validateAmount(this.state.ingredientComponent.amount) ? " " : StringResource.Messages.RequiredIngredientComponentAmount}
                        />
                        <TextField
                            variant="filled"
                            margin="dense"
                            id="unit"
                            label="Einheit"
                            value={this.state.ingredientComponent.physicalQuantity}
                            onChange={event => this.updateIngredientComp('physicalQuantity', event.target.value)}
                            helperText=""
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleCancel}>{StringResource.General.Cancel}</Button>
                        <Button onClick={() => this.props.handleOk(this.props.reference, this.state.ingredientComponent)}>
                            {this.props.reference > NO_INDEX ? StringResource.General.Change : StringResource.General.Add}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}