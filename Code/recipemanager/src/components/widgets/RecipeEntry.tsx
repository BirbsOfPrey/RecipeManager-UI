import { Recipe } from '../../models/Recipe'
import StringResource from '../../resources/StringResource'
import './RecipeEntry.css'

interface IProps {
    recipe: Recipe
}

export const RecipeEntry = ({recipe}: IProps) => {
    return (
        <div className="recipeEntry__container">
            <p className="recipeEntry__idTitle">{StringResource.General.RecipeId}</p>
            <p className="recipeForm__idField" >{recipe.id}</p>
            <p className="recipeEntry__nameTitle">{StringResource.General.RecipeName}</p>
            <p className="recipeForm__nameField" >{recipe.name}</p>
        </div>
    )
}