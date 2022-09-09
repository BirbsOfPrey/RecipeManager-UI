import { LinearProgress, List } from '@mui/material'
import { Component } from 'react'
import { User } from '../../../models/security/User'
import { createDefaultHeader, UsersUrl } from '../../../resources/Api'
import StringResource from '../../../resources/StringResource'

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
            this.setState({ users: users, error: "", loading: false })
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
                <p className="userListContent__title">{StringResource.General.RecipeList}</p>
                <List className="userListContent__list">
                    {users.map(user => (
                        <div>
                            <div>
                                {"User ID: " + user.id}
                            </div>
                            <div>
                                {"User Name: " + user.name}
                            </div>
                            <div>
                                {"User Role: " + user.role}
                            </div>
                        </div>
                    ))}
                </List>
            </div>
        )
    }
}