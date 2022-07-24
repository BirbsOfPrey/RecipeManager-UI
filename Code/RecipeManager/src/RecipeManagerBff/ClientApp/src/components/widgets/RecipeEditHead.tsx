import { Component } from "react";
import { Recipe } from "../../models/Recipe";
import StringResource from "../../resources/StringResource";
import { TextField } from "@mui/material";
import { RecipeValidators } from "../../models/RecipeValidators";

interface IProps {
    recipe: Recipe
    setValue: (property: string, value: string) => void
    editable?: boolean
}

export class RecipeEditHead extends Component<IProps, {}> {

    render() {
        return (
            <div className="recipeEditHead__container">
                <TextField 
                    variant="filled"
                    className="recipeEditHead__nameField"
                    required
                    fullWidth
                    inputProps={{readOnly: !this.props.editable, disabled: !this.props.editable}}
                    label={StringResource.General.RecipeName}
                    value={this.props.recipe.name}
                    placeholder={StringResource.General.RecipeName}
                    onChange={event => this.props.setValue('name', event.target.value)}
                    error={!RecipeValidators.validateName(this.props.recipe.name)}
                    helperText={RecipeValidators.validateName(this.props.recipe.name) ? " " : StringResource.Messages.RequiredRecipeName}
                />
            </div>
        )
    }
}