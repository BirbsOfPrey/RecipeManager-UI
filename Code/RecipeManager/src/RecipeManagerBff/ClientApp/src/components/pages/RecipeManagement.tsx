import { Routes, Route } from 'react-router-dom'
import StringResource from '../../resources/StringResource'
import { RecipeListView } from './RecipeListView'
import { RecipeView } from './RecipeView'

export const RecipeManagement = () => {
    return (
        <div className="RecipeManagement__container">
            <Routes>
                <Route
                    index
                    element={<RecipeListView />}
                />
                <Route path={StringResource.Routes.Recipe} element={<RecipeView />}>
                    <Route path={StringResource.Routes.RecipeId} element={<RecipeView />} />
                </Route>
            </Routes>
        </div>
    )
}