import { RecipeCookingView } from "./RecipeCookingView"
import { useParams, useSearchParams } from "react-router-dom"
import StringResource from "../../resources/StringResource"

export const RecipeView = () => {
    let params = useParams()
    let [searchParams] = useSearchParams()
    return (
        <div className="recipeview__container">
            <RecipeCookingView recipeId={params.recipeId} editable={searchParams.get(StringResource.Queries.Edit) === StringResource.Queries.EditOnValue || params.recipeId === undefined ? true : false}/>
        </div>
    )
}