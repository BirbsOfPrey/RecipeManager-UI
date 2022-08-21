import { Add } from "@mui/icons-material"
import { List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import React, { Component } from "react"
import { createStep, Step } from "../../models/Step"
import StringResource from "../../resources/StringResource"
import { EmptyListItem } from "./EmptyListItem"
import { StepListItem } from "./StepListItem"

interface IProps {
    steps: Step[]
    updateStep: (step: Step) => void
    changeStepOrder: (increase: boolean, step: Step) => void
    deleteStep: (step: Step) => void
}

export class RecipeEditStepList extends Component<IProps, {}> {

    addStep = (_: React.MouseEvent): void => {
        var step = createStep()
        step.stepNumber = this.props.steps.length + 1
        this.props.updateStep(step)
    }

    generate() {
        if (this.props.steps && this.props.steps.length > 0) {
            const length = this.props.steps.length
            var steps = Array.of(...this.props.steps)
            return steps.sort((a, b) => {
                    return (a.stepNumber && b.stepNumber) ? a.stepNumber - b.stepNumber : 0
                }).map((s) => (
                    <StepListItem
                        key={s.stepNumber}
                        step={s}
                        length={length}
                        editable
                        updateStep={this.props.updateStep}
                        changeStepOrder={this.props.changeStepOrder}
                        stepDeleted={this.props.deleteStep}
                    />
                ))
        } else {
            return <EmptyListItem text={StringResource.General.NoSteps} />
        }
    }

    render() {
        return (
            <List>
                {this.generate()}
                <ListItemButton onClick={this.addStep}>
                    <ListItemAvatar>
                        <Add />
                    </ListItemAvatar>
                    <ListItemText primary={StringResource.General.AddStep} />
                </ListItemButton>
            </List>
        )
    }

}