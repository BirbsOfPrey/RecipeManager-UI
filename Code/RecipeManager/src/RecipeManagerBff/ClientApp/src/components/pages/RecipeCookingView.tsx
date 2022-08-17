import { Component, ReactNode } from "react"
import { Link } from "react-router-dom"
import { createDefaultHeader, RecipesUrl } from "../../resources/Api"
import { createRecipe, Recipe } from "../../models/Recipe"
import "./RecipeCookingView.css"
import StringResource from "../../resources/StringResource"
import { RecipeEditHead } from "../widgets/RecipeEditHead"
import { Button, IconButton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { RecipeEditIngredients } from "../widgets/RecipeEditIngredients"
import { RecipeEditSteps } from "../widgets/RecipeEditSteps"
import { createIngredientComponents, IngredientComponent, NO_INDEX } from "../../models/IngredientComponent"
import { RecipeValidator } from "../../models/RecipeValidator"

interface IState {
    redirect: boolean
    saved: boolean
    recipe: Recipe
    loading: boolean
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
        this.setState({ recipe: updatedRecipe, saved: false })
    }

    deleteIngredientComponent = (index: number, ingredientComponent: IngredientComponent) => {
        var updatedRecipe = {...this.state.recipe}
        if (updatedRecipe.ingredientComponents && index > NO_INDEX && updatedRecipe.ingredientComponents.length > index) {
            updatedRecipe.ingredientComponents.splice(index, 1);
        }
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
            const recipe = await response.json()
            this.setState({ loading: false, recipe: recipe })
        }
    }

    save = async () => {
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
    }

    render() {
        const saveContent: ReactNode = this.props.editable ? <Button className="recipeCreateAssistant__saveButton" disabled={this.state.saved} onClick={this.save}>{StringResource.General.Save}</Button> : <></>

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
                        setValue={this.update}
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