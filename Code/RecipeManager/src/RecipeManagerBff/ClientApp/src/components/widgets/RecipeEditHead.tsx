import { Component } from "react";
import { Recipe } from "../../models/Recipe";
import StringResource from "../../resources/StringResource";
import { TextField } from "@mui/material";
import { RecipeValidators } from "../../models/RecipeValidators";

interface IProps {
    recipe: Recipe
    setValue: (property: string, value: string) => void
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
                    label={StringResource.General.RecipeName}
                    value={this.props.recipe.name}
                    placeholder={StringResource.General.RecipeName}
                    onChange={event => this.props.setValue('name', event.target.value)}
                    error={!RecipeValidators.validateName(this.props.recipe.name)}
                    helperText={RecipeValidators.validateName(this.props.recipe.name) ? " " : StringResource.Messages.RequiredRecipeName}
                />
                <TextField 
                    variant="filled"
                    className="recipeEditHead__personRefAmountField"
                    type="number"
                    required
                    fullWidth
                    InputProps={{ inputProps: {min: RecipeValidators.minPersonRefAmount, max: RecipeValidators.maxPersonRefAmount}}}
                    label={StringResource.General.RecipePerson}
                    value={this.props.recipe.personRefAmount}
                    onChange={event => this.props.setValue('personRefAmount', event.target.value)}
                    error={!RecipeValidators.validatePersonRefAmount(this.props.recipe.personRefAmount)}
                    helperText={RecipeValidators.validatePersonRefAmount(this.props.recipe.personRefAmount) ? " " : StringResource.Messages.InvalidPersonAmount}
                />
            </div>
        )
    }
}