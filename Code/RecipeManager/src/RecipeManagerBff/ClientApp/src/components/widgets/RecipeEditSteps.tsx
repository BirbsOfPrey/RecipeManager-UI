import { Component } from "react";
import { Recipe } from "../../models/Recipe";

interface IProps {
    recipe: Recipe
    setValue: (property: string, value: string) => void
}

export class RecipeEditSteps extends Component<IProps, {}> {
    
    render() {
        return (<div></div>)
    }
}