import { Component, ReactNode } from "react"
import { Link } from "react-router-dom"
import { createDefaultHeader, RecipesUrl } from "../../resources/Api"
import { createRecipe, Recipe } from "../../models/Recipe"
import "./RecipeCookingView.css"
import StringResource from "../../resources/StringResource"
import { RecipeEditHead } from "../widgets/RecipeEditHead"
import { IconButton, stepClasses } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { RecipeEditIngredients } from "../widgets/RecipeEditIngredients"
import { RecipeEditSteps } from "../widgets/RecipeEditSteps"
import { createIngredientComponents, IngredientComponent } from "../../models/IngredientComponent"
import { RecipeValidator } from "../../models/RecipeValidator"
import { createStep, createSteps, Step } from "../../models/Step"
import { NO_INDEX } from "../../models/helper/ArrayHelper"
import produce from "immer"

interface IState {
    redirect: boolean
    saved: boolean
    recipe: Recipe
    loading: boolean
    saving: boolean
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

    updateIngredientComponents = (index: number, ingredientComponent: IngredientComponent) => {
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
                    draft.ingredientComponents.splice(index, 1);
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
            this.setState({ redirect: true, saved: true })
        }

        this.setState({ saving: false })
    }

    render() {
        if (this.state.loading) {
            return (
                <p>Loading...</p>
            )
        } else {
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

            return (
                <div className="recipeCreateAssistant__container">
                    <IconButton component={Link} to={`/${StringResource.Routes.RecipeManagement}`}>
                        <ArrowBackIcon />
                    </IconButton>
                    <span className="recipeCreateAssistant__mainTitle">{StringResource.General.CreateNewRecipe}</span>
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
                        setIngredientComponent={this.updateIngredientComponents}
                        deleteIngredientComponent={this.deleteIngredientComponent}
                        editable={this.props.editable}
                    />
                    <p className="recipeCreateAssistant__errorField" >{this.state.error}</p>
                    {saveContent}
                </div>
            )
        }
    }
}