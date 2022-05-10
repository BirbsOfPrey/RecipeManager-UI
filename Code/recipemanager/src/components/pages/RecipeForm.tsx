import { Component } from "react";
import { Navigate } from 'react-router-dom'
import { createNewRecipe, RecipesUrl } from "../../models/Recipe";
import './RecipeForm.css'

export class RecipeForm extends Component {
    state = {
        redirect: false,
        recipe: createNewRecipe(),
        error: ''
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
            this.setState({ error: 'Error occurred!', loading: false })
        } else {
            const update = await response.json()
            const recipe = Object.assign(this.state.recipe, update)
            this.setState({ redirect: true, recipe })
        }
    }

    render() {
        const { redirect, recipe, error } = this.state

        if (redirect) {
            return <Navigate to='/' />
        } else {
            return (
                <div className="recipeForm__container">
                    <p className="recipeForm__mainTitle">Neues Rezept erstellen</p>
                    <textarea className="recipeForm__id" value={recipe.id} />
                    <p className="recipeForm__titleLabel">Rezeptname</p>
                    <textarea className="recipeForm__name" value={recipe.name} />
                    <textarea className="recipeForm__error" value={error} />
                    <button className="recipeForm__saveButton" onClick={() => this.save()}>Save</button>
                </div>

            )
        }
    }
}