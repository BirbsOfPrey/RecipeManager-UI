import { Component, ReactNode } from "react"
import { Navigate } from 'react-router-dom'
import { RecipesUrl } from "../../resources/Api"
import { Recipe } from "../../models/Recipe"
import './RecipeCreateAssistant.css'
import StringResource from "../../resources/StringResource"
import { RecipeEditHead } from "../widgets/RecipeEditHead"
import { Button, Pagination } from "@mui/material"
import { RecipeEditIngredients } from "../widgets/RecipeEditIngredients"
import { RecipeEditSteps } from "../widgets/RecipeEditSteps"

interface IState {
    redirect: boolean
    recipe: Recipe
    loading: boolean
    error: string
    contentNr: number
 }

export class RecipeCreateAssistant extends Component<{}, IState> {
    
    state: IState = {
        redirect: false,
        recipe: new Recipe(),
        loading: false,
        error: '',
        contentNr: 1
    }

    setContentNr = (event: React.ChangeEvent<unknown>, value: number) => {
        this.setState({ contentNr: value })
    }

    forward = () => {
        this.setState({ contentNr: this.state.contentNr + 1 })
    }

    backward = () => {
        this.setState({ contentNr: this.state.contentNr - 1 })
    }

    update = (property: string, value: string) => {
        const updatedRecipe = Object.assign(this.state.recipe, {
            [property]: value
        })
        this.setState({recipe: updatedRecipe})
    }

    save = async () => {
        const response = await fetch(`${RecipesUrl}`, {
            method: 'post',
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
            this.setState({ redirect: true, recipe })
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

        const { redirect, error } = this.state
        const content = contents[this.state.contentNr - 1]
        
        if (redirect) {
            return <Navigate to={StringResource.Routes.RecipeManagement} />
        } else {
            return (
                <div className="recipeCreateAssistant__container">
                    <p className="recipeCreateAssistant__mainTitle">{StringResource.General.CreateNewRecipe}</p>
                    {content}
                    <p className="recipeCreateAssistant__errorField" >{error}</p>
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
}