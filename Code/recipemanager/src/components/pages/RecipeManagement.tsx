import {Link} from 'react-router-dom'
import { RecipeList } from '../widgets/RecipeList'
import './RecipeManagement.css'

export const RecipeManagement = () => {
    return (
        <div className="RecipeManagement__container">
            <Link className="RecipeManagement__createRecipe" to={`/new-recipe`}>
                <button>Rezept erstellen</button>
            </Link>
            <RecipeList/>
        </div>
    )
}