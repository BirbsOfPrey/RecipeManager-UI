import { ListItemButton, ListItemAvatar, ListItemText } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { User } from "../../../models/security/User"
import { Component } from "react"
import { Link } from "react-router-dom"
import StringResource from "../../../resources/StringResource"

interface IProps {
    user: User
}

export class UserListItem extends Component<IProps, {}> {

    render() {
        const user: User = this.props.user

        let name: string = user.name ? user.name : StringResource.General.NoUserName
        let role: string = user.role ? user.role : StringResource.General.NoUserRole

        const userRoute: string = `${StringResource.Routes.User}/${user.id}`

        return (
            <ListItemButton
                alignItems="flex-start"
                className="userListItem__container"
                component={Link} to={userRoute}
                sx={{ pt: "0px", pb: "0px" }}>
                <ListItemAvatar>
                    <AccountCircle />
                </ListItemAvatar>
                <ListItemText
                    className="userListItem__text"
                    primary={name}
                    secondary={role}
                />
            </ListItemButton>
        )
    }
}
