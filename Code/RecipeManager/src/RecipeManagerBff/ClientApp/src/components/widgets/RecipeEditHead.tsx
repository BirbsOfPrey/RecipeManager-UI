import { Component } from "react";
import { Recipe } from "../../models/Recipe";
import StringResource from "../../resources/StringResource";
import { TextField } from "@mui/material";

interface IProps {
    recipe: Recipe
    setValue: (property: string, value: string) => void
}

export class RecipeEditHead extends Component<IProps, {}> {

    validateName = () => {
        if (this.props.recipe.name) {
            return this.props.recipe.name.length > 3
        }
        return false
    }

    render() {
        return ( //TODO: I suggest to wrap the library components to reduce some style based selections
            <div className="recipeEditHead__container">
                <TextField 
                id="filled-basic"
                variant="filled"
                className="recipeEditHead__nameField"
                required
                fullWidth
                label={StringResource.General.RecipeName}
                value={this.props.recipe.name}
                placeholder={StringResource.General.RecipeName}
                onChange={event => this.props.setValue('name', event.target.value)}
                error={!this.validateName()}
                helperText={this.validateName() ? " " : "Ein Rezeptname ist erforderlich"}
                />
            </div>
        )
    }
}