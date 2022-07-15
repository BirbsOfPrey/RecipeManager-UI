import { Component } from "react";
import { Recipe } from "../../models/Recipe";
import StringResource from "../../resources/StringResource";
import { EditableInputText } from "../controls/EditableTextInput";

interface IProps {
    recipe: Recipe
    setValue: (property: string, value: string) => void
}

export class RecipeEditHead extends Component<IProps, {}> {


    render() {
        return (
            <div className="recipeEditHead__container">
                <EditableInputText 
                    className="recipeCreateAssistant__nameField"
                    setValue={value => this.props.setValue('name', value)}
                    name={StringResource.General.RecipeName}
                    placeholder={StringResource.General.RecipeName}
                    value={this.props.recipe.name}/>
            </div>
        )
    }
}