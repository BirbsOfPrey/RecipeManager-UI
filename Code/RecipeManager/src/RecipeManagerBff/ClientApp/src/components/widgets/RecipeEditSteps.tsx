import { Add } from "@mui/icons-material";
import { List, ListItemAvatar, ListItemButton, ListItemText, Pagination, TextField } from "@mui/material";
import React from "react";
import { Component } from "react";
import { NO_INDEX } from "../../models/helper/ArrayHelper";
import { createStep, Step } from "../../models/Step";
import StringResource from "../../resources/StringResource";
import { EmptyListItem } from "./EmptyListItem";
import { StepListItem } from "./StepListItem";

interface IState {
    contentNr: number
}

interface IProps {
    steps?: Step[]
    updateStep: (index: number, step: Step) => void
    deleteStep: (index: number, step: Step) => void
    editable?: boolean
}

export class RecipeEditSteps extends Component<IProps, {}> {

    state: IState = {
        contentNr: 1
    }

    generate(element: React.ReactElement) {
        if (this.props.steps && this.props.steps.length > 0) {
            return this.props.steps.map((s, idx) =>
                React.cloneElement(element, {
                    key: idx,
                    index: idx,
                    step: s
                }))
        } else {
            return <EmptyListItem text={StringResource.General.NoSteps} />
        }
    }

    getActiveStep(): Step {
        return this.props.steps ? this.props.steps[this.state.contentNr - 1] : createStep()
    }

    getActiveStepName(): string {
        const activeStep: Step = this.getActiveStep()
        const number: string = activeStep ? activeStep.stepNumber as unknown as string : ""
        return `${StringResource.General.RecipeStep} ${number}`
    }

    setContentNr = (event: React.ChangeEvent<unknown>, value: number): void => {
        this.setState({ contentNr: value })
    }

    updateStepInstruction(index: number, instruction: string) {
        var step: Step
        if (index === NO_INDEX || !this.props.steps || index >= this.props.steps.length) {
            step = createStep()
        } else {
            step = { ...this.props.steps[index] }
        }
        step.instruction = instruction
        this.props.updateStep(index, step)
    }

    render() {
        const activeStep: Step = this.getActiveStep()
        const activeStepName: string = this.getActiveStepName()
        
        //TODO: Check if split into edit and not-edit component is better as the components look completely different
        if (this.props.editable) {
            return (
                <List>
                    {this.generate(
                        <StepListItem
                            step={createStep()}
                            index={NO_INDEX}
                            editable={this.props.editable}
                            updateStepInstruction={(index, instruction) => this.updateStepInstruction(index, instruction)}
                            stepDeleted={this.props.deleteStep}
                        />)
                    } {/* TODO: Add set step */}
                    <ListItemButton /*onClick={this.props.setStep}*/>
                        <ListItemAvatar>
                            <Add />
                        </ListItemAvatar>
                        <ListItemText primary={StringResource.General.AddStep} />
                    </ListItemButton>
                </List>
                //Render components below each other with a Title and a step shift
                //Button to add a new step required as well
            )
        } else {
            return (
                <div>
                    <TextField
                        variant="filled"
                        className="recipeEditHead__descriptionField"
                        multiline
                        fullWidth
                        minRows={5}
                        disabled={activeStep === undefined}
                        inputProps={{ readOnly: true, disabled: true }}
                        label={activeStepName}
                        value={activeStep ? activeStep.instruction : StringResource.General.NoSteps}
                    />
                    <Pagination
                        variant="outlined"
                        count={this.props.steps?.length}
                        page={this.state.contentNr}
                        onChange={this.setContentNr}
                    />
                </div>)
        }

    }
}
