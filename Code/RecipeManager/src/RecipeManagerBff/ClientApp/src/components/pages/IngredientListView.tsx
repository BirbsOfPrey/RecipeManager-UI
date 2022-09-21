import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import StringResource from "../../resources/StringResource"
import { IngredientList } from "../widgets/ingredient/IngredientList"

export const IngredientListView = () => {
    return (
        <div className="IngredientListView__container">
            <Link className="IngredientListView__createIngredient" to={StringResource.Routes.Ingredient}>
                <Button variant="outlined" sx={{ mt: "30px", mb: "20px" }}>{StringResource.General.CreateIngredient}</Button>
            </Link>
            <IngredientList />
        </div>
    )
}