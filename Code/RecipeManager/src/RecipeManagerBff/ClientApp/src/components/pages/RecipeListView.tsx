import {Link} from 'react-router-dom'
import StringResource from '../../resources/StringResource'
import { RecipeList } from '../widgets/recipe/RecipeList'
import './RecipeManagement.css'

export const RecipeListView = () => {
    return (
        <div className="RecipeListView__container">
            <Link className="RecipeListView__createRecipe" to={StringResource.Routes.Recipe}>
                <button>{StringResource.General.CreateRecipe}</button>
            </Link>
            <RecipeList/>
        </div>
    )
}