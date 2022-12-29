import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { Button } from "reactstrap"
import StringResource from "../../resources/StringResource"

interface IProps {
    open: boolean
    title: string
    content: string
    handleAbort: () => void
    handleDelete: () => void
}

export const DeleteDialog = (props: IProps) => {

    return (
        <Dialog
            open={props.open}
            onClose={props.handleAbort}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleAbort}>{StringResource.General.Cancel}</Button>
                <Button onClick={props.handleDelete} autoFocus>{StringResource.General.Delete}</Button>
            </DialogActions>
        </Dialog>
    )
}