import { RecipeCookingView } from "./RecipeCookingView"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import StringResource from "../../resources/StringResource"

export const RecipeView = () => {
    var params = useParams()
    var [searchParams] = useSearchParams()
    var navigate = useNavigate()

    return (
        <div className="recipeview__container">
            <RecipeCookingView
                recipeId={params.recipeId}
                editable={searchParams.get(StringResource.Queries.Edit) === StringResource.Queries.EditOnValue || params.recipeId === undefined ? true : false}
                navigate={navigate}
            />
        </div>
    )
}