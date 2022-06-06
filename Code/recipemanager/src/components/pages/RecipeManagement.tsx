import {Link} from 'react-router-dom'
import StringResource from '../../resources/StringResource'
import { RecipeList } from '../widgets/RecipeList'
import './RecipeManagement.css'

export const RecipeManagement = () => {
    return (
        <div className="RecipeManagement__container">
            <Link className="RecipeManagement__createRecipe" to={StringResource.NewRecipeRoute}>
                <button>{StringResource.CreateRecipe}</button>
            </Link>
            <RecipeList/>
        </div>
    )
}