import { IconButton, ListItemSecondaryAction, ListItem, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Component } from "react"
import { Step } from "../../models/Step"
import StringResource from "../../resources/StringResource"

interface IProps {
    step: Step
    length: number
    editable: boolean
    updateStep: (step: Step) => void
    changeStepOrder: (increase: boolean, step: Step) => void
    stepDeleted: (step: Step) => void
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
                    onChange={event => this.props.updateStep({ ...this.props.step, instruction: event.target.value })}
                />
                <ListItemSecondaryAction>
                    {this.props.editable ?
                        (<>
                            <IconButton
                                edge="end"
                                aria-label="move-up"
                                onClick={(event) => this.props.changeStepOrder(false, this.props.step)}
                                disabled={this.props.step.stepNumber === 1}
                                sx={{ marginRight: '0px' }}>
                                <KeyboardArrowUpIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="move-down"
                                onClick={(event) => this.props.changeStepOrder(true, this.props.step)}
                                disabled={this.props.step.stepNumber === this.props.length}
                                sx={{ marginRight: '0px' }}>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => this.props.stepDeleted(this.props.step)}>
                                <DeleteIcon />
                            </IconButton>
                        </>) : <></>}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}