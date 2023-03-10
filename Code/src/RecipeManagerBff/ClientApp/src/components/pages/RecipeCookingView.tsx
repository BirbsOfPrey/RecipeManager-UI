import { Component } from "react"
import { Link, NavigateFunction } from "react-router-dom"
import { createDefaultHeader, RecipesUrl } from "../../resources/Api"
import { createRecipe, Recipe } from "../../models/Recipe"
import "./RecipeCookingView.css"
import StringResource from "../../resources/StringResource"
import { RecipeEditHead } from "../widgets/recipe/RecipeEditHead"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Paper, Stack, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import SaveIcon from "@mui/icons-material/Save"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Edit from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import DeleteIcon from "@mui/icons-material/Delete"
import { RecipeEditIngredients } from "../widgets/recipe/RecipeEditIngredients"
import { RecipeEditSteps } from "../widgets/recipe/RecipeEditSteps"
import { createIngredientComponents, IngredientComponent } from "../../models/IngredientComponent"
import { RecipeValidator } from "../../models/RecipeValidator"
import { createSteps, Step } from "../../models/Step"
import { NO_INDEX } from "../../models/helper/ArrayHelper"
import produce from "immer"
import "./RecipeCookingView.css"

interface IProps {
    recipeId?: string
    editable?: boolean
    navigate: NavigateFunction
}

interface IState {
    redirect: boolean
    saved: boolean
    recipe: Recipe
    loading: boolean
    saving: boolean
    openDeleteConfirmDialog: boolean
    error: string
}

export class RecipeCookingView extends Component<IProps, IState> {
    state: IState = {
        redirect: false,
        saved: true,
        recipe: createRecipe(),
        loading: false,
        saving: false,
        openDeleteConfirmDialog: false,
        error: ""
    }

    async componentDidMount() {
        if (this.props.recipeId) {
            await this.fetchRecipe(this.props.recipeId)
        }
    }

    update = (property: string, value: string) => {
        this.updateStateRecipe(
            produce(this.state.recipe, draft => {
                switch (property) {
                    case "name":
                        draft.name = value
                        break
                    case "description":
                        draft.description = value
                        break
                    case "personRefAmount":
                        draft.personRefAmount = value as unknown as number
                        break
                    default:
                        break
                }
            })
        )
    }

    changeStepOrder = (increase: boolean, step: Step) => {
        if (!this.state.recipe.steps || !step.stepNumber) {
            return
        }

        var steps: Step[] = this.state.recipe.steps
        var otherStepNumber: number = increase ? step.stepNumber + 1 : step.stepNumber - 1

        var otherStep: Step | undefined = steps.find(s => s.stepNumber === otherStepNumber)
        var oldStep: Step | undefined = steps.find(s => s.stepNumber === step.stepNumber)
        if (!otherStep || !oldStep) {
            return
        }
        var otherIndex = steps.indexOf(otherStep)
        var index = steps.indexOf(oldStep)

        this.updateStateRecipe(
            produce(this.state.recipe, draft => {
                if (draft.steps && index > NO_INDEX) {
                    draft.steps[otherIndex].stepNumber = step.stepNumber
                    draft.steps[index].stepNumber = otherStepNumber
                }
            })
        )
    }

    updateStep = (step: Step) => {
        this.updateStateRecipe(
            produce(this.state.recipe, draft => {
                if (!draft.steps) {
                    draft.steps = createSteps()
                }
                var oldStep: Step | undefined = draft.steps.find(s => s.stepNumber === step.stepNumber)
                if (oldStep) {
                    var index: number = draft.steps.indexOf(oldStep)
                    draft.steps[index] = step
                } else {
                    draft.steps.push(step)
                }
            })
        )
    }

    deleteStep = (step: Step) => {
        this.updateStateRecipe(
            produce(this.state.recipe, draft => {
                if (!draft.steps) {
                    return
                }
                var oldStep: Step | undefined = draft.steps.find(s => s.stepNumber === step.stepNumber)
                if (oldStep) {
                    var index: number = draft.steps.indexOf(oldStep)
                    var deletedStep: Step | undefined = draft.steps.splice(index, 1).at(0)
                    draft.steps.forEach(s => {
                        if (s.stepNumber && deletedStep?.stepNumber && s.stepNumber > deletedStep.stepNumber) {
                            s.stepNumber -= 1
                        }
                    })
                }
            })
        )
    }

    updateIngredientComponent = (index: number, ingredientComponent: IngredientComponent) => {
        this.updateStateRecipe(
            produce(this.state.recipe, draft => {
                if (draft.ingredientComponents && index > NO_INDEX && draft.ingredientComponents.length > index) {
                    draft.ingredientComponents[index] = ingredientComponent
                } else {
                    if (!draft.ingredientComponents) {
                        draft.ingredientComponents = createIngredientComponents()
                    }
                    draft.ingredientComponents.push(ingredientComponent)
                }
            })
        )
    }

    deleteIngredientComponent = (index: number, ingredientComponent: IngredientComponent) => {
        this.updateStateRecipe(
            produce(this.state.recipe, draft => {
                if (draft.ingredientComponents && index > NO_INDEX && draft.ingredientComponents.length > index) {
                    draft.ingredientComponents.splice(index, 1)
                }
            })
        )
    }

    updateStateRecipe(updatedRecipe: Recipe) {
        this.setState({ recipe: updatedRecipe, saved: false })
    }

    fetchRecipe = async (id: string) => {
        this.setState({ loading: true })
        const response = await fetch(`${RecipesUrl}/${id}`, {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.RecipeNotFound, loading: false })
        } else {
            const recipe: Recipe = await response.json()
            this.setState({ error: "", loading: false, recipe: recipe })
        }
    }

    requestToDeleteRecipe = () => {
        this.setState({ openDeleteConfirmDialog: true })
    }

    deleteRecipe = async () => {
        const response = await fetch(`${RecipesUrl}/${this.state.recipe.id}`, {
            method: "delete",
            headers: createDefaultHeader()
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError })
        } else {
            this.setState({ error: "", redirect: true })
        }

        this.setState({ openDeleteConfirmDialog: false })
    }

    handleAbort = () => {
        this.setState({ openDeleteConfirmDialog: false })
    }

    save = async () => {
        if (!RecipeValidator.validate(this.state.recipe)) {
            this.setState({ error: StringResource.Messages.InvalidRecipeFields })
            return
        }

        this.setState({ saving: true })

        const response = await fetch(`${RecipesUrl}`, {
            method: this.state.recipe.id ? "put" : "post",
            headers: createDefaultHeader(),
            body: JSON.stringify(this.state.recipe)
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError })
        } else {
            if (response.status === 201) {
                const recipe: Recipe = await response.json()
                this.setState({ recipe: recipe })
            }
            this.setState({ error: "", saved: true })
        }

        this.setState({ saving: false })
    }

    render() {
        if (this.state.redirect) {
            this.props.navigate(`/${StringResource.Routes.RecipeManagement}`)
        }

        const recipeRoute: string = `/${StringResource.Routes.RecipeManagement}/${StringResource.Routes.Recipe}/${this.state.recipe.id}`

        return (
            <div className="recipeCreateAssistant__container">
                {this.state.loading ? <LinearProgress /> : <div></div>}
                <Typography
                    className="recipeCreateAssistant__mainTitle"
                    variant="h6"
                    component="p"
                    sx={{ pb: "5px", mt: "30px" }}>
                    {this.props.editable ? (this.state.recipe.id ? StringResource.General.EditRecipe : StringResource.General.CreateRecipe) : StringResource.General.RecipeView}
                </Typography>

                <Box className="recipeCreateAssistant__handleButtons">
                    <IconButton component={Link} to={`/${StringResource.Routes.RecipeManagement}`}>
                        <ArrowBackIcon />
                    </IconButton>

                    {this.props.editable ? (
                        <IconButton
                            aria-label="view"
                            className="recipeCreateAssistant__viewButton"
                            component={Link} to={`${recipeRoute}`}>
                            <VisibilityIcon />
                        </IconButton>) : (
                        <IconButton
                            aria-label="edit"
                            className="recipeCreateAssistant__editButton"
                            component={Link} to={`${recipeRoute}?${StringResource.Queries.EditOn}`}>
                            <Edit />
                        </IconButton>)
                    }
                </Box>

                <Box className="recipeCreateAssistant__editButtons">
                    {this.props.editable ? (
                        <div>
                            <LoadingButton
                                className="recipeCreateAssistant__saveButton"
                                variant="outlined"
                                loadingPosition="start"
                                loading={this.state.saving}
                                startIcon={<SaveIcon />}
                                disabled={this.state.saved}
                                onClick={this.save}>{StringResource.General.Save}
                            </LoadingButton>
                            <IconButton
                                aria-label="delete"
                                className="recipeCreateAssistant__deleteButton"
                                disabled={!this.state.recipe.id}
                                sx={{ alignSelf: "flex-end" }}
                                onClick={this.requestToDeleteRecipe}>
                                <DeleteIcon />
                            </IconButton>
                        </div>) : <div></div>
                    }
                </Box>

                <Typography
                    className="recipeCreateAssistant__errorField"
                    variant="subtitle1"
                    component="p"
                    color="error.main"
                    sx={{ mt: "25px" }}>
                    {this.state.error}
                </Typography>

                <Paper
                    className="recipeCreateAssistant__editContent"
                    sx={{ p: "20px", maxHeight: { xs: "60vh", md: "70vh", xl: "75vh" }, mb: "20px", overflow: "auto" }}>
                    <Stack spacing={2}>
                        <RecipeEditHead
                            name={this.state.recipe.name}
                            description={this.state.recipe.description}
                            setValue={this.update}
                            editable={this.props.editable}
                        />
                        <RecipeEditSteps
                            steps={this.state.recipe.steps ? this.state.recipe.steps : createSteps()}
                            updateStep={this.updateStep}
                            changeStepOrder={this.changeStepOrder}
                            deleteStep={this.deleteStep}
                            editable={this.props.editable}
                        />
                        <RecipeEditIngredients
                            personRefAmount={this.state.recipe.personRefAmount}
                            ingredientComponents={this.state.recipe.ingredientComponents}
                            setValue={this.update}
                            updateIngredientComponent={this.updateIngredientComponent}
                            deleteIngredientComponent={this.deleteIngredientComponent}
                            editable={this.props.editable}
                        />
                    </Stack>
                </Paper>

                <Dialog
                    open={this.state.openDeleteConfirmDialog}
                    onClose={this.handleAbort}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="recipeCreateAssistant__dialog">
                    <DialogTitle id="alert-dialog-title">
                        {StringResource.Messages.DeleteRecipeQuestion}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {StringResource.Messages.DeleteRecipeContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAbort}>{StringResource.General.Cancel}</Button>
                        <Button onClick={this.deleteRecipe} autoFocus>{StringResource.General.Delete}</Button>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}