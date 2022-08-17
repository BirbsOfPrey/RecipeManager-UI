import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Component } from 'react';
import { createScheduledRecipe, ScheduledRecipe } from '../../models/ScheduledRecipe';
import './IngredientComponentDialog.css'

interface IProps {
    open: boolean
    date: Date
    handleCancel: () => void
    handleOk: () => void
}

interface IState {
    scheduledRecipe: ScheduledRecipe
}

export class ScheduledRecipeDialog extends Component<IProps, IState> {

    state: IState = {
        scheduledRecipe: createScheduledRecipe()
    }

    updateScheduledRecipe = (property: string, value: string) => {
        const updatedScheduledRecipe = {...this.state.scheduledRecipe, [property]: value}
        this.setState({ scheduledRecipe: updatedScheduledRecipe })
    }

    storeScheduledRecipe = () => {
        // TODO: Store ScheduledRecipe in DB

        this.props.handleOk()
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.handleOk}>
                    <DialogTitle>Rezept hinzufügen</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Wählen Sie das gewünschte Rezept
                        </DialogContentText>
                        <TextField
                            variant="filled"
                            margin="dense"
                            id="recipe"
                            label="Rezept"
                            onChange={event => this.updateScheduledRecipe('recipeId', event.target.value)}
                            helperText=""
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleCancel}>Abbrechen</Button>
                        <Button onClick={() => this.storeScheduledRecipe()}>Hinzufügen</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}