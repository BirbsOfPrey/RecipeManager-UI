import {Link} from 'react-router-dom'
import StringResource from '../../resources/StringResource'
import './MainView.css'

export const MainView = () => {
    return (
        <div className="mainview__container">
            <Link className="mainview__RecipeManagement" to={StringResource.Routes.RecipeManagement}>
                <button>{StringResource.General.RecipeManagement}</button>
            </Link>
        </div>
    )
}