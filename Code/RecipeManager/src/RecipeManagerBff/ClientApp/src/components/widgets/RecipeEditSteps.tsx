import { Add } from "@mui/icons-material";
import { List, ListItemAvatar, ListItemButton, ListItemText, Pagination, TextField } from "@mui/material";
import React from "react";
import { Component } from "react";
import { createStep, Step } from "../../models/Step";
import StringResource from "../../resources/StringResource";
import { EmptyListItem } from "./EmptyListItem";
import { StepListItem } from "./StepListItem";

interface IState {
    contentNr: number
}

interface IProps {
    steps?: Step[]
    updateStep: (index: number, property: string, value: string) => void
    deleteStep: (index: number, step: Step) => void
    editable?: boolean
}

export class RecipeEditSteps extends Component<IProps, {}> {

    state: IState = {
        contentNr: 1
    }

    generate() {
        if (this.props.steps && this.props.steps.length > 0) {
            return this.props.steps.map((s, idx) => (
                <StepListItem
                    key={idx}
                    step={s}
                    index={idx}
                    editable={this.props.editable}
                    updateStepInstruction={this.props.updateStep}
                    stepDeleted={this.props.deleteStep}
                />
            ))
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
    
    render() {
        const activeStep: Step = this.getActiveStep()
        const activeStepName: string = this.getActiveStepName()
        
        //TODO: Check if split into edit and not-edit component is better as the components look completely different
        if (this.props.editable) {
            return (
                <List>
                    {this.generate()} 
                    {/* TODO: Add set step */}
                    <ListItemButton /*onClick={this.props.setStep}*/>
                        <ListItemAvatar>
                            <Add />
                        </ListItemAvatar>
                        <ListItemText primary={StringResource.General.AddStep} />
                    </ListItemButton>
                </List>
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
