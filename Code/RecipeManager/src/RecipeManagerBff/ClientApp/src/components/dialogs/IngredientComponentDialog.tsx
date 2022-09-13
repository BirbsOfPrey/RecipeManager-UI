import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import produce from 'immer'
import { Component } from 'react'
import { NO_INDEX } from '../../models/helper/ArrayHelper'
import { createIngredientComponent, IngredientComponent } from '../../models/IngredientComponent'
import { IngredientComponentValidator } from '../../models/IngredientComponentValidator'
import StringResource from '../../resources/StringResource'
import { IngredientSelectCreate } from '../controls/IngredientSelectCreate'

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
            this.updateStateIngredientComponent(this.props.ingredientComponent || createIngredientComponent())
        }
    }

    updateIngredientComponent = (property: string, value: string) => {
        this.updateStateIngredientComponent(
            produce(this.state.ingredientComponent, draft => {
                switch (property) {
                    case "physicalQuantity":
                        draft.physicalQuantity = value
                        break
                    case "amount":
                        draft.amount = value as unknown as number
                        break
                    default:
                        break
                }
            })
        )
    }

    updateIngredient = (ingredientName: string) => {
        this.updateStateIngredientComponent(
            produce(this.state.ingredientComponent, draft => {
                draft.ingredient.name = ingredientName
            })
        )
    }

    updateStateIngredientComponent(updatedIngredientComponent: IngredientComponent) {
        this.setState({ ingredientComponent: updatedIngredientComponent })
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
                            sx={{ mr: { sm: "15px", md: "15px" } }}
                            defaultValue={this.state.ingredientComponent.amount || IngredientComponentValidator.minAmount}
                            inputProps={{ min: IngredientComponentValidator.minAmount }}
                            onChange={event => this.updateIngredientComponent('amount', event.target.value)}
                            error={!IngredientComponentValidator.validateAmount(this.state.ingredientComponent.amount)}
                            helperText={IngredientComponentValidator.validateAmount(this.state.ingredientComponent.amount) ? " " : StringResource.Messages.RequiredIngredientComponentAmount}
                        />
                        <TextField
                            variant="filled"
                            margin="dense"
                            id="unit"
                            label="Einheit"
                            value={this.state.ingredientComponent.physicalQuantity}
                            onChange={event => this.updateIngredientComponent('physicalQuantity', event.target.value)}
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