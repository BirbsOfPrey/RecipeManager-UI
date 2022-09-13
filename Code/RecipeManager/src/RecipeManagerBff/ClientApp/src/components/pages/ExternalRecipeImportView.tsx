import { Button, List, Paper, TextField, Typography } from "@mui/material"
import { Component } from "react"
import { Recipe } from "../../models/Recipe"
import { RecipeImportValidator } from "../../models/RecipeImportValidator"
import { createDefaultHeader, recipeImportAmountQuery } from "../../resources/Api"
import StringResource from "../../resources/StringResource"
import { EmptyListItem } from "../widgets/EmptyListItem"
import { RecipeListItem } from "../widgets/recipe/RecipeListItem"
import { DinnerDining } from "@mui/icons-material"

interface IState {
    importAmount: number
    importedRecipes: Recipe[]
    importCompleted: boolean
    error: string
}

export class ExternalRecipeImportView extends Component<{}, IState> {
    state: IState = {
        importAmount: 1,
        importedRecipes: [],
        importCompleted: false,
        error: ""
    }

    fetchRecipesFromExternalApi = async () => {
        const response = await fetch(recipeImportAmountQuery(this.state.importAmount), {
            method: 'post',
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.RecipeImportError, importCompleted: false })
        } else {
            const recipes: Recipe[] = await response.json()
            this.setState({ importedRecipes: recipes, importCompleted: true })
        }
    }

    render() {
        return (
            <div className="externalRecipeImportView__container" >
                <Typography
                    className="externalRecipeImportView__header"
                    variant="subtitle1"
                    component="p"
                    sx={{ mt: "50px", mb: "20px", fontWeight: "bold" }}>
                    {StringResource.General.RecipeImportHeader}
                </Typography>

                <TextField
                    variant="filled"
                    className="externalRecipeImportView__importAmount"
                    type="number"
                    required
                    fullWidth
                    inputProps={{ min: RecipeImportValidator.minImportAmount, max: RecipeImportValidator.maxImportAmount }}
                    label={StringResource.General.RecipeImportAmount}
                    value={this.state.importAmount}
                    onChange={event => this.setState({ importAmount: parseInt(event.target.value, 10) })}
                    error={!RecipeImportValidator.validateImportAmount(this.state.importAmount)}
                    helperText={RecipeImportValidator.validateImportAmount(this.state.importAmount) ? " " : StringResource.Messages.InvalidImportAmount}
                />

                <Button
                    variant="outlined"
                    onClick={() => this.fetchRecipesFromExternalApi()}
                    sx={{ mt: "20px", mb: "20px" }}>
                    {StringResource.General.RecipeImportButton}
                </Button>

                {this.state.importCompleted ? (
                    <Paper className="externalRecipeImportView__importedRecipes"
                        sx={{ maxHeight: "50vh", overflow: "auto" }}>
                        <Typography
                            className="externalRecipeImportView__importedRecipesHeader"
                            variant="subtitle1"
                            component="p"
                            sx={{ mt: "20px", mb: "15px", ml: "20px" }}>
                            {StringResource.General.RecipeImportListHeader}
                        </Typography>

                        {this.state.importedRecipes.length > 0 ? (
                            <List disablePadding={true} className="externalRecipeImportView__list">
                                {this.state.importedRecipes.map(recipe => (
                                    <RecipeListItem
                                        key={recipe.id}
                                        recipe={recipe} />
                                ))}
                            </List>
                        ) : (
                            <EmptyListItem icon={<DinnerDining />} text={StringResource.Messages.NoRecipesImported} />
                        ) }
                    </Paper>
                ) : (
                    <Typography
                        className="externalRecipeImportView__error"
                        variant="subtitle1"
                        component="p"
                        color="error.main"
                        sx={{ mt: "20px" }}>
                        {this.state.error}
                    </Typography>
                ) }
            </div>
        )
    }
}