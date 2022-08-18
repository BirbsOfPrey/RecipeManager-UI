import { Component } from "react"
import StringResource from "../../resources/StringResource"
import { TextField } from "@mui/material"
import { RecipeValidator } from "../../models/RecipeValidator"

interface IProps {
    name?: string
    description?: string
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
                    inputProps={{ readOnly: !this.props.editable, disabled: !this.props.editable }}
                    label={StringResource.General.RecipeName}
                    value={this.props.name ? this.props.name : ""}
                    placeholder={StringResource.General.RecipeName}
                    onChange={event => this.props.setValue('name', event.target.value)}
                    error={!RecipeValidator.validateName(this.props.name)}
                    helperText={RecipeValidator.validateName(this.props.name) ? " " : StringResource.Messages.RequiredRecipeName}
                />
                {this.props.editable ?
                    (<TextField
                        variant="filled"
                        className="recipeEditHead__descriptionField"
                        multiline
                        fullWidth
                        label={StringResource.General.RecipeDescription}
                        value={this.props.description ? this.props.description : ""}
                        placeholder={StringResource.General.RecipeDescription}
                        onChange={event => this.props.setValue('description', event.target.value)}
                        error={!RecipeValidator.validateDescription(this.props.description)}
                        helperText={RecipeValidator.validateDescription(this.props.description) ? " " : StringResource.Messages.MaxDescriptionLength}
                    />) : <></>}
            </div>
        )
    }
}