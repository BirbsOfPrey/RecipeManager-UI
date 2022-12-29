import { Routes, Route } from "react-router-dom"
import StringResource from "../../resources/StringResource"
import "./IngredientManagement.css"
import { IngredientListView } from "./IngredientListView"
import { IngredientView } from "./IngredientView"

export const IngredientManagement = () => {
    return (
        <div className="ingredientManagement__container">
            <div className="ingredientManagement__content">
                <Routes>
                    <Route
                        index
                        element={<IngredientListView />}
                    />
                    <Route path={StringResource.Routes.Ingredient} element={<IngredientView />}>
                        <Route path={StringResource.Routes.IngredientId} element={<IngredientView />} />
                    </Route>
                </Routes>
            </div>
        </div>
    )
}