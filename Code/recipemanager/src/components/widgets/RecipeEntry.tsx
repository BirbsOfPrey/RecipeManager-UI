import { Recipe } from '../../models/Recipe'
import StringResource from '../../resources/StringResource'
import './RecipeEntry.css'

interface IProps {
    recipe: Recipe
}

export const RecipeEntry = ({recipe}: IProps) => {
    return (
        <div className="recipeEntry__container">
            <p className="recipeEntry__idTitle">{StringResource.RecipeId}</p>
            <p className="recipeForm__idField" >{recipe.id}</p>
            <p className="recipeEntry__nameTitle">{StringResource.RecipeName}</p>
            <p className="recipeForm__nameField" >{recipe.name}</p>
        </div>
    )
}