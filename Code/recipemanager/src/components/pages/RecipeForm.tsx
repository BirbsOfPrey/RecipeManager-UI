import { Component } from "react"
import { Navigate } from 'react-router-dom'
import { RecipesUrl } from "../../resources/Api"
import { Recipe } from "../../models/Recipe"
import './RecipeForm.css'
import StringResource from "../../resources/StringResource"

interface IState {
    redirect: boolean
    recipe: Recipe
    loading: boolean
    error: string
 }

export class RecipeForm extends Component<{}, IState> {
    
    state: IState = {
        redirect: false,
        recipe: new Recipe(),
        loading: false,
        error: ''
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
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(this.state.recipe)
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.GeneralError, loading: false })
        } else {
            const update = await response.json()
            const recipe = Object.assign(this.state.recipe, update)
            this.setState({ redirect: true, recipe })
        }
    }

    render() {
        const { redirect, error } = this.state

        if (redirect) {
            return <Navigate to={StringResource.RecipeManagementRoute} />
        } else {
            return (
                <div className="recipeForm__container">
                    <p className="recipeForm__mainTitle">{StringResource.CreateNewRecipe}</p>
                    <p className="recipeForm__nameTitle">{StringResource.RecipeName}</p>
                    <input className="recipeForm__nameField" type="text" onChange={e => this.update('name', e.target.value)}/>
                    <p className="recipeForm__errorField" >{error}</p>
                    <button className="recipeForm__saveButton" onClick={() => this.save()}>{StringResource.Save}</button>
                </div>

            )
        }
    }
}