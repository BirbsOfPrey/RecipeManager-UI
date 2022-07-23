import {Outlet} from 'react-router-dom'
import './RecipeManagement.css'

export const RecipeManagement = () => {
    return (
        <div className="RecipeManagement__container">
            <Outlet/>
        </div>
    )
}