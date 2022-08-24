import { Component, ReactNode } from "react"
import { Link } from "react-router-dom"
import { createDefaultHeader, RecipesUrl } from "../../resources/Api"
import { createRecipe, Recipe } from "../../models/Recipe"
import "./RecipeCookingView.css"
import StringResource from "../../resources/StringResource"
import { RecipeEditHead } from "../widgets/RecipeEditHead"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Edit from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import { RecipeEditIngredients } from "../widgets/RecipeEditIngredients"
import { RecipeEditSteps } from "../widgets/RecipeEditSteps"
import { createIngredientComponents, IngredientComponent } from "../../models/IngredientComponent"
import { RecipeValidator } from "../../models/RecipeValidator"
import { createSteps, Step } from "../../models/Step"
import { NO_INDEX } from "../../models/helper/ArrayHelper"
import produce from "immer"

interface IState {
    redirect: boolean
    saved: boolean
    recipe: Recipe
    loading: boolean
    saving: boolean
    openDeleteConfirmDialog: boolean
    error: string
}

interface IProps {
    recipeId?: string
    editable?: boolean
}

export class RecipeCookingView extends Component<IProps, IState> {
    state: IState = {
        redirect: false,
        saved: true,
        recipe: createRecipe(),
        loading: false,
        saving: false,
        openDeleteConfirmDialog: false,
        error: ''
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
            this.setState({ loading: false, recipe: recipe })
        }
    }

    requestToDeleteRecipe = () => {
        this.setState({ openDeleteConfirmDialog: true })
    }

    deleteRecipe = async () => {
        const response = await fetch(`${RecipesUrl}/${this.props.recipeId}`, {
            method: 'delete',
            headers: createDefaultHeader()
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError })
        } else {
            this.setState({ redirect: true })
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
            method: this.state.recipe.id ? 'put' : 'post',
            headers: createDefaultHeader(),
            body: JSON.stringify(this.state.recipe)
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError })
        } else {
            this.setState({ saved: true })
        }

        this.setState({ saving: false })
    }

    render() {
        if (this.state.redirect) {
            window.location.replace(StringResource.Routes.RecipeManagement)
        }

        const saveContent: ReactNode = this.props.editable ? (
            <LoadingButton
                className="recipeCreateAssistant__saveButton"
                variant="outlined"
                loadingPosition="start"
                loading={this.state.saving}
                startIcon={<SaveIcon />}
                disabled={this.state.saved}
                onClick={this.save}>{StringResource.General.Save}
            </LoadingButton>) : <></>

        const recipeRoute: string = `/${StringResource.Routes.RecipeManagement}/${StringResource.Routes.Recipe}/${this.props.recipeId}`

        return (
            <div className="recipeCreateAssistant__container">
                {this.state.loading ? <LinearProgress /> : <></> /* TODO: Decide if this should be generally used to show data loading/API fetches */}
                <IconButton component={Link} to={`/${StringResource.Routes.RecipeManagement}`}>
                    <ArrowBackIcon />
                </IconButton>
                <span className="recipeCreateAssistant__mainTitle">{StringResource.General.CreateNewRecipe}</span>
                {this.props.editable ? (
                    <>
                        <IconButton
                            aria-label="view"
                            component={Link} to={`${recipeRoute}`}>
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={this.requestToDeleteRecipe}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                ) : (
                    <IconButton
                        aria-label="edit"
                        component={Link} to={`${recipeRoute}?${StringResource.Queries.EditOn}`}>
                        <Edit />
                    </IconButton>)
                }
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
                <p className="recipeCreateAssistant__errorField" >{this.state.error}</p>
                {saveContent}

                <Dialog
                    open={this.state.openDeleteConfirmDialog}
                    onClose={this.handleAbort}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
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
            </div>
        )
    }
}