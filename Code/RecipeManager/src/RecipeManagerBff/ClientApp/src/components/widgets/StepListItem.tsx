import { IconButton, ListItemSecondaryAction, ListItem, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Component } from "react"
import { Step } from "../../models/Step"
import StringResource from "../../resources/StringResource"

interface IProps {
    step: Step
    index: number
    editable?: boolean
    updateStepInstruction: (index: number, property: string, value: string) => void
    stepDeleted: (index: number, step: Step) => void
}

export class StepListItem extends Component<IProps, {}> {

    render() {
        return (
            <ListItem
                alignItems="flex-start"
                dense
                sx={{ paddingLeft: '0px', paddingRight: '132px' }}>
                <TextField
                    variant="filled"
                    className="recipeEditHead__descriptionField"
                    multiline
                    fullWidth
                    minRows={5}
                    label={this.props.step.stepNumber}
                    value={this.props.step.instruction}
                    placeholder={StringResource.General.StepInstruction}
                    onChange={event => this.props.updateStepInstruction(this.props.index, "instruction", event.target.value)}
                />
                <ListItemSecondaryAction>
                    {this.props.editable ?
                        (<>
                            <IconButton
                                edge="end"
                                aria-label="move-up"
                                onClick={() => {}}
                                sx={{ marginRight: '0px' }}>
                                <KeyboardArrowUpIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="move-down"
                                onClick={() => {}}
                                sx={{ marginRight: '0px' }}>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => this.props.stepDeleted(this.props.index, this.props.step)}>
                                <DeleteIcon />
                            </IconButton>
                        </>) : <></>}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}