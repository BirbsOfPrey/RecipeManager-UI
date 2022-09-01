import { Component } from "react"
import { Step } from "../../../models/Step"
import { RecipeEditStepList } from "./RecipeEditStepList"
import { RecipeSteps } from "./RecipeSteps"

interface IProps {
    steps: Step[]
    updateStep: (step: Step) => void
    changeStepOrder: (increase: boolean, step: Step) => void
    deleteStep: (step: Step) => void
    editable?: boolean
}

export class RecipeEditSteps extends Component<IProps, {}> {

    render() {
        return this.props.editable ? (
            <RecipeEditStepList
                steps={this.props.steps}
                updateStep={this.props.updateStep}
                changeStepOrder={this.props.changeStepOrder}
                deleteStep={this.props.deleteStep}
             />
        ) : (
            <RecipeSteps
                steps={this.props.steps}
            />
        )
    }
}
