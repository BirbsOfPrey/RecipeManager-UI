import { Component, ReactNode } from "react"
import { Link } from "react-router-dom"
import { RecipesUrl } from "../../resources/Api"
import { Recipe } from "../../models/Recipe"
import "./RecipeCreateAssistant.css"
import StringResource from "../../resources/StringResource"
import { RecipeEditHead } from "../widgets/RecipeEditHead"
import { Button, IconButton, Pagination } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { RecipeEditIngredients } from "../widgets/RecipeEditIngredients"
import { RecipeEditSteps } from "../widgets/RecipeEditSteps"

interface IState {
    redirect: boolean
    saved: boolean
    recipe: Recipe
    loading: boolean
    error: string
    contentNr: number
 }

export class RecipeCreateAssistant extends Component<{}, IState> {
    
    state: IState = {
        redirect: false,
        saved: true,
        recipe: new Recipe(),
        loading: false,
        error: '',
        contentNr: 1
    }

    setContentNr = (event: React.ChangeEvent<unknown>, value: number) => {
        this.setState({ contentNr: value })
    }

    update = (property: string, value: string) => {
        const updatedRecipe = Object.assign(this.state.recipe, {
            [property]: value
        })
        this.setState({recipe: updatedRecipe, saved: false})
    }

    save = async () => {
        let method: string
        if(this.state.recipe.id === undefined) {
            method = 'post'
        } else {
            method = 'put'
        }

        const response = await fetch(`${RecipesUrl}`, {
            method: method,
            headers: new Headers({
                'X-CSRF': '1',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(this.state.recipe)
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError, loading: false })
        } else {
            const update = await response.json()
            const recipe = Object.assign(this.state.recipe, update)
            this.setState({ redirect: true, recipe, saved: true })
        }
    }

    render() {
        const contents: ReactNode[] = [
            <RecipeEditHead
                recipe={this.state.recipe}
                setValue={this.update}
            />,
            <RecipeEditIngredients
                recipe={this.state.recipe}
                setValue={this.update}
            />,
            <RecipeEditSteps
                recipe={this.state.recipe}
                setValue={this.update}
            />,
        ]

        const content = contents[this.state.contentNr - 1]
        
        return (
            <div className="recipeCreateAssistant__container">
                <IconButton component={Link} to={StringResource.Routes.RecipeManagement}>
                    <ArrowBackIcon></ArrowBackIcon>
                </IconButton>
                <p className="recipeCreateAssistant__mainTitle">{StringResource.General.CreateNewRecipe}</p>
                {content}
                <p className="recipeCreateAssistant__errorField" >{this.state.error}</p>
                <Pagination
                    variant="outlined"
                    count={contents.length}
                    page={this.state.contentNr}
                    onChange={this.setContentNr}
                />
                <Button className="recipeCreateAssistant__saveButton" onClick={() => this.save()}>{StringResource.General.Save}</Button>
            </div>
        )
    }
}