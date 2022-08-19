import { Component } from 'react'
import { Recipe } from '../../models/Recipe'
import { createDefaultHeader, RecipesUrl } from '../../resources/Api'
import './RecipeList.css'
import StringResource from '../../resources/StringResource'
import { List } from '@mui/material'
import { RecipeListItem } from './RecipeListItem'

interface IState {
    recipes: Recipe[]
 }

export class RecipeList extends Component<{}, IState> {
    
    state: IState = {
        recipes: []
    }

    async componentDidMount() {
        const response = await fetch(`${RecipesUrl}`, {
            headers: createDefaultHeader()
        })
        const recipes: Recipe[] = await response.json()
        this.setState({recipes})
    }

    render() {
        const { recipes } = this.state

        if (recipes.length !== 0) {
            return (
                <div className="recipeListContent__container">
                    <p className="recipeListContent__title">{StringResource.General.RecipeList}</p>
                    <List className="recipeListContent__list">
                        {recipes.map(recipe => (
                            <RecipeListItem
                                key={recipe.id}
                                recipe={recipe}/>
                        ))}
                    </List>
                </div>
            )
        } else {
            return (
                <p className="recipeListContent__message">{StringResource.Messages.NoRecipesToDisplay}</p>
            )
        }
    }
}