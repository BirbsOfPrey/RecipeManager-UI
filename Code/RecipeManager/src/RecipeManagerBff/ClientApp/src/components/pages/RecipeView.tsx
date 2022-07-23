import { RecipeCreateAssistant } from "./RecipeCreateAssistant"
import { useParams } from "react-router-dom";

export const RecipeView = () => {
    let params = useParams()
    return (
        <div className="recipeview__container">
            <RecipeCreateAssistant recipeId={params.recipeId}/>
        </div>
    )
}