import { Component } from "react"
import { Step } from "../../models/Step"
import { RecipeEditStepList } from "./RecipeEditStepList"
import { RecipeSteps } from "./RecipeSteps"

interface IProps {
    steps?: Step[]
    updateStep: (index: number, property: string, value: string) => void
    deleteStep: (index: number, step: Step) => void
    editable?: boolean
}

export class RecipeEditSteps extends Component<IProps, {}> {

    render() {
        return this.props.editable ? (
            <RecipeEditStepList
                steps={this.props.steps}
                updateStep={this.props.updateStep}
                deleteStep={this.props.deleteStep}
             />
        ) : (
            <RecipeSteps
                steps={this.props.steps}
            />
        )
    }
}
