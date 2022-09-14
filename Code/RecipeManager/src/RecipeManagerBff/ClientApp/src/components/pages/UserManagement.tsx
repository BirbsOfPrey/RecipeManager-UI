import { Routes, Route } from "react-router-dom"
import StringResource from "../../resources/StringResource"
import { UserListView } from "./UserListView"
import { UserView } from "./UserView"
import "./UserManagement.css"

export const UserManagement = () => {
    return (
        <div className="userManagement__container">
            <div className="userManagement__content">
                <Routes>
                    <Route
                        index
                        element={<UserListView />}
                    />
                    <Route path={StringResource.Routes.User} element={<UserView />}>
                        <Route path={StringResource.Routes.UserId} element={<UserView />} />
                    </Route>
                </Routes>
            </div>
        </div>
    )
}