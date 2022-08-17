import { Component, ReactNode } from "react"
import { Link } from "react-router-dom"
import { createDefaultHeader, RecipesUrl } from "../../resources/Api"
import { createRecipe, Recipe } from "../../models/Recipe"
import "./RecipeCookingView.css"
import StringResource from "../../resources/StringResource"
import { RecipeEditHead } from "../widgets/RecipeEditHead"
import { IconButton } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { RecipeEditIngredients } from "../widgets/RecipeEditIngredients"
import { RecipeEditSteps } from "../widgets/RecipeEditSteps"
import { createIngredientComponents, IngredientComponent } from "../../models/IngredientComponent"
import { RecipeValidator } from "../../models/RecipeValidator"
import { createSteps, Step } from "../../models/Step"
import { NO_INDEX } from "../../models/helper/ArrayHelper"

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
        const updatedRecipe = {...this.state.recipe, [property]: value}
        this.setState({ recipe: updatedRecipe, saved: false })
    }

    updateSteps = (index: number, step: Step) => {
        var updatedRecipe = {...this.state.recipe}
        if (updatedRecipe.steps && index > NO_INDEX && updatedRecipe.steps.length > index) {
            updatedRecipe.steps[index] = step
        } else {
            if (!updatedRecipe.steps) {
                updatedRecipe.steps = createSteps()
            }
            updatedRecipe.steps.push(step)
        }
        this.updateStateRecipe(updatedRecipe)
    }

    deleteStep = (index: number, step: Step) => {
        var updatedRecipe = {...this.state.recipe}
        if (updatedRecipe.steps && index > NO_INDEX && updatedRecipe.steps.length > index) {
            updatedRecipe.steps.splice(index, 1);
        }
        this.updateStateRecipe(updatedRecipe)
    }

    updateIngredientComponents = (index: number, ingredientComponent: IngredientComponent) => {
        var updatedRecipe = {...this.state.recipe}
        if (updatedRecipe.ingredientComponents && index > NO_INDEX && updatedRecipe.ingredientComponents.length > index) {
            updatedRecipe.ingredientComponents[index] = ingredientComponent
        } else {
            if (!updatedRecipe.ingredientComponents) {
                updatedRecipe.ingredientComponents = createIngredientComponents()
            }
            updatedRecipe.ingredientComponents.push(ingredientComponent)
        }
        this.updateStateRecipe(updatedRecipe)
    }

    deleteIngredientComponent = (index: number, ingredientComponent: IngredientComponent) => {
        var updatedRecipe = {...this.state.recipe}
        if (updatedRecipe.ingredientComponents && index > NO_INDEX && updatedRecipe.ingredientComponents.length > index) {
            updatedRecipe.ingredientComponents.splice(index, 1);
        }
        this.updateStateRecipe(updatedRecipe)
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
        this.setState({ saving: true})

        if (!RecipeValidator.validate(this.state.recipe))
        {
            this.setState({ error: StringResource.Messages.InvalidRecipeFields })
            return
        }

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

        this.setState({ saving: false})
    }

    render() {
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

        if (this.state.loading) {
            return <p>Loading...</p>
        } else {
            return (
                <div className="recipeCreateAssistant__container">
                    <IconButton component={Link} to={`/${StringResource.Routes.RecipeManagement}`}>
                        <ArrowBackIcon />
                    </IconButton>
                    <span className="recipeCreateAssistant__mainTitle">{StringResource.General.CreateNewRecipe}</span>
                    <RecipeEditHead
                        recipe={this.state.recipe}
                        setValue={this.update}
                        editable={this.props.editable}
                    />
                    <RecipeEditSteps
                        steps={this.state.recipe.steps}
                        updateStep={this.updateSteps}
                        deleteStep={this.deleteStep}
                        editable={this.props.editable}
                    />
                    <RecipeEditIngredients
                        recipe={this.state.recipe}
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