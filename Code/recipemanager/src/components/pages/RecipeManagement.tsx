import {Link} from 'react-router-dom'
import './RecipeManagement.css'

export const RecipeManagement = () => {
    return (
        <div className="RecipeManagement__container">
            <Link className="RecipeManagement__CreateRecipe" to={`/new-recipe`}>
                <button>Rezept erstellen</button>
            </Link>
        </div>
    )
}