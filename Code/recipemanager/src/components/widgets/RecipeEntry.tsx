import { Recipe } from '../../models/Recipe'
import './RecipeEntry.css'

type RecipeEntryProps = {
    recipe: Recipe
}

export const RecipeEntry = ({recipe}: RecipeEntryProps) => {
    return (
        <div className="recipeEntry__container">
            <p className="recipeEntry__idTitle">Rezept-Id</p>
            <p className="recipeForm__idField" >{recipe.id}</p>
            <p className="recipeEntry__nameTitle">Rezept-Name</p>
            <p className="recipeForm__nameField" >{recipe.name}</p>
        </div>
    )
}