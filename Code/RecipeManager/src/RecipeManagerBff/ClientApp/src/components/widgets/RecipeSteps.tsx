import { Pagination, TextField } from "@mui/material"
import React from "react"
import { Component } from "react"
import { createStep, Step } from "../../models/Step"
import StringResource from "../../resources/StringResource"

interface IProps {
    steps?: Step[]
}

interface IState {
    contentNr: number
}

export class RecipeSteps extends Component<IProps, IState> {

    state: IState = {
        contentNr: 1
    }

    getActiveStep(): Step {
        var step: Step | undefined
        if (this.props.steps) {
            step = this.props.steps.find(s => s.stepNumber === this.state.contentNr)
        }
        return step ? step : createStep()
    }

    setContentNr = (event: React.ChangeEvent<unknown>, value: number): void => {
        this.setState({ contentNr: value })
    }

    render() {
        const activeStep: Step = this.getActiveStep()
        const activeStepName: string =
            `${StringResource.General.RecipeStep} ${activeStep.stepNumber ? activeStep.stepNumber as unknown as string : ""}`

        return (
            <div className="recipeSteps__container">
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
