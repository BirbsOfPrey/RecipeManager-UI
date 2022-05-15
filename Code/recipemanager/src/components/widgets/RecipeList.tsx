import { Component } from 'react';
import { RecipeManagerAPIEndpoint } from '../../api';
import { RecipeEntry } from './RecipeEntry'
import { Recipe } from '../../models/Recipe';
import './RecipeList.css'

interface IState {
    recipes: Recipe[];
 }

export class RecipeList extends Component {
    
    state: IState = {
        recipes: []
    }

    async componentDidMount() {
        const response = await fetch(`${RecipeManagerAPIEndpoint}/Recipe`)
        const recipes = await response.json()
        this.setState({recipes})
    }

    render() {
        const { recipes } = this.state

        if (recipes.length !== 0) {

            return (
                <div className="recipeListContent__container">
                    <p className="recipeListContent__title">Rezepte-Liste</p>
                    {recipes.map(recipe => (
                        <RecipeEntry
                            key={recipe.id}
                            recipe={recipe}/>
                    ))}
                </div>
            )
        } else {
            return (
                <p className="recipeListContent__message">No recipes found to display!</p>
            )
        }
    }
}