import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Component } from 'react';
import './IngredientComponentAddDialog.css'

interface IProps {
    open: boolean
    handleCancel: () => void
    handleOk: () => void
}

export class IngredientComponentAddDialog extends Component<IProps, {}> {

    render() {
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.handleOk}>
                    <DialogTitle>Zutat hinzufügen</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Wählen Sie die Zutat und die gewünschte Menge für das Rezept
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Menge"
                            type="number"
                            fullWidth
                            variant="standard"
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