import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import StringResource from "../../resources/StringResource"
import { UserList } from "../widgets/user/UserList"

export const UserListView = () => {
    return (
        <div className="UserListView__container">
            <Link className="UserListView__createUser" to={StringResource.Routes.User}>
                <Button variant="outlined" sx={{ mt: "30px", mb: "20px" }}>{StringResource.General.CreateUser}</Button>
            </Link>
            <UserList />
        </div>
    )
}