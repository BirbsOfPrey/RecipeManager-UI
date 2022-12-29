import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import StringResource from "../../resources/StringResource"
import { IngredientDetailView } from "../widgets/ingredient/IngredientDetailView"

export const IngredientView = () => {
    var params = useParams()
    var [searchParams] = useSearchParams()
    var navigate = useNavigate()

    return (
        <div className="ingredientView__container">
            <IngredientDetailView
                ingredientId={params.ingredientId}
                editable={searchParams.get(StringResource.Queries.Edit) === StringResource.Queries.EditOnValue || params.ingredientId === undefined ? true : false}
                navigate={navigate}
            />
        </div>
    )
}