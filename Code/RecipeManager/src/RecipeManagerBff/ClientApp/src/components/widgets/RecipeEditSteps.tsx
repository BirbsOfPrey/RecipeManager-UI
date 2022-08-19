import { Component } from "react"
import { Step } from "../../models/Step"
import { RecipeEditStepList } from "./RecipeEditStepList"
import { RecipeSteps } from "./RecipeSteps"

interface IProps {
    steps: Step[]
    updateStepInstruction: (index: number, value?: string) => void
    changeStepOrder: (index: number, increase: boolean, step: Step) => void
    deleteStep: (index: number, step: Step) => void
    editable?: boolean
}

export class RecipeEditSteps extends Component<IProps, {}> {

    render() {
        return this.props.editable ? (
            <RecipeEditStepList
                steps={this.props.steps}
                updateStepInstruction={this.props.updateStepInstruction}
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
