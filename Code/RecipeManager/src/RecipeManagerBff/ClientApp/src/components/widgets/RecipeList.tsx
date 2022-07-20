import { Component } from 'react'
import { RecipeEntry } from './RecipeEntry'
import { Recipe } from '../../models/Recipe'
import { RecipesUrl } from '../../resources/Api'
import './RecipeList.css'
import StringResource from '../../resources/StringResource'

interface IState {
    recipes: Recipe[]
 }

export class RecipeList extends Component<{}, IState> {
    
    state: IState = {
        recipes: []
    }

    async componentDidMount() {
        const response = await fetch(`${RecipesUrl}`, {
            headers: new Headers({
                'X-CSRF': '1'
            })
        })
        const recipes = await response.json()
        this.setState({recipes})
    }

    render() {
        const { recipes } = this.state

        if (recipes.length !== 0) {

            return (
                <div className="recipeListContent__container">
                    <p className="recipeListContent__title">{StringResource.General.RecipeList}</p>
                    {recipes.map(recipe => (
                        <RecipeEntry
                            key={recipe.id}
                            recipe={recipe}/>
                    ))}
                </div>
            )
        } else {
            return (
                <p className="recipeListContent__message">{StringResource.Messages.NoRecipesToDisplay}</p>
            )
        }
    }
}