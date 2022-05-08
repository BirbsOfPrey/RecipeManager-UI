import {Link} from 'react-router-dom'
import './MainView.css'

export const MainView = () => {
    return (
        <div className="mainview__container">
            <Link className="mainview__RecipeManagement" to={`/recipemanagement`}>
                <button>Verwaltung Rezepte</button>
            </Link>
        </div>
    )
}