import { LinearProgress, List, Paper } from '@mui/material'
import { Component } from 'react'
import { User } from '../../../models/security/User'
import { createDefaultHeader, UsersUrl } from '../../../resources/Api'
import StringResource from '../../../resources/StringResource'
import { UserListItem } from './UserListItem'

interface IState {
    loading: boolean
    error: string
    users: User[]
}

export class UserList extends Component<{}, IState> {
    state: IState = {
        loading: false,
        error: "",
        users: []
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const response = await fetch(`${UsersUrl}`, {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.NoUsersToDisplay, loading: false })
        } else {
            const users: User[] = await response.json()
            this.setState({ error: "", users: users, loading: false })
        }
    }

    render() {
        const users = this.state.users

        if (this.state.error.length > 0) {
            return <p className="userListContent__message">{this.state.error}</p>
        } else if (this.state.loading) {
            return <LinearProgress />
        } else if (users.length <= 0) {
            return <p>{StringResource.Messages.NoUsersToDisplay}</p>
        }

        return (
            <div className="userListContent__container">
                <Paper className="recipeListContentSelector__container"
                    sx={{ maxHeight: { xs: "60vh", md: "70vh", xl: "75vh" }, overflow: "auto" }}>
                    <List disablePadding={true} className="userListContent__list">
                        {users.map(user => (
                            <UserListItem
                                key={user.id}
                                user={user}
                            />
                        ))}
                    </List>
                </Paper>
            </div>
        )
    }
}