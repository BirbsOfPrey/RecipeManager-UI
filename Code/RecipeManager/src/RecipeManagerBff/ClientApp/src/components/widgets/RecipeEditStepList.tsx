import { Add } from "@mui/icons-material"
import { List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import React, { Component } from "react"
import { NO_INDEX } from "../../models/helper/ArrayHelper"
import { Step } from "../../models/Step"
import StringResource from "../../resources/StringResource"
import { EmptyListItem } from "./EmptyListItem"
import { StepListItem } from "./StepListItem"

interface IProps {
    steps?: Step[]
    updateStep: (index: number, property: string, value: string) => void
    deleteStep: (index: number, step: Step) => void
}

export class RecipeEditStepList extends Component<IProps, {}> {

    addStep = (_: React.MouseEvent): void => {
        this.props.updateStep(NO_INDEX, "stepNumber", this.props.steps ? (this.props.steps.length + 1) as unknown as string : "1")
    }

    generate() {
        if (this.props.steps && this.props.steps.length > 0) {
            const length = this.props.steps.length
            let steps = Array.of(...this.props.steps)
            return steps.sort((a, b) => {
                    return (a.stepNumber && b.stepNumber) ? a.stepNumber - b.stepNumber : 0
                }).map((s, idx) => (
                    <StepListItem
                        key={idx}
                        step={s}
                        index={idx}
                        length={length}
                        editable
                        updateStepInstruction={this.props.updateStep}
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