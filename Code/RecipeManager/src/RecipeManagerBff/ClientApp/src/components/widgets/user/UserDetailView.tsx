import LoadingButton from "@mui/lab/LoadingButton"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Edit from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import { Component, ReactNode } from "react"
import { Link, NavigateFunction } from "react-router-dom"
import { createUser, User } from "../../../models/security/User"
import { createDefaultHeader, UsersUrl } from "../../../resources/Api"
import StringResource from "../../../resources/StringResource"
import { UserEdit } from "./UserEdit"
import { UserValidator } from "../../../models/security/UserValidator"

interface IProps {
    userId?: string
    editable?: boolean
    navigate: NavigateFunction
}

interface IState {
    redirect: boolean
    saved: boolean
    user: User
    loading: boolean
    saving: boolean
    openDeleteConfirmDialog: boolean
    error: string
}

export class UserDetailView extends Component<IProps, IState> {
    state: IState = {
        redirect: false,
        saved: true,
        user: createUser(),
        loading: false,
        saving: false,
        openDeleteConfirmDialog: false,
        error: ''
    }

    async componentDidMount() {
        if (this.props.userId) {
            await this.fetchUser(this.props.userId)
        }
    }

    fetchUser = async (id: string) => {
        this.setState({ loading: true })
        const response = await fetch(`${UsersUrl}/${id}`, {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.UserNotFound, loading: false })
        } else {
            const user: User = await response.json()
            this.setState({ loading: false, user: user })
        }
    }

    update = (property: string, value: string) => {
        var userToUpdate = { ...this.state.user, [property]: value }
        this.setState({ user: userToUpdate, saved: false })
    }

    requestToDeleteUser = () => {
        this.setState({ openDeleteConfirmDialog: true })
    }

    deleteUser = async () => {
        const response = await fetch(`${UsersUrl}/${this.props.userId}`, {
            method: 'delete',
            headers: createDefaultHeader()
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError })
        } else {
            this.setState({ redirect: true })
        }

        this.setState({ openDeleteConfirmDialog: false })
    }

    handleAbort = () => {
        this.setState({ openDeleteConfirmDialog: false })
    }

    save = async () => {
        if (!UserValidator.validate(this.state.user)) {
            this.setState({ error: StringResource.Messages.InvalidUserFields })
            return
        }

        this.setState({ saving: true })

        const id = this.state.user.id
        const suffix = id ? "/" + id : ""
        const response = await fetch(`${UsersUrl}${suffix}`, {
            method: this.state.user.id ? 'put' : 'post',
            headers: createDefaultHeader(),
            body: JSON.stringify(this.state.user)
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError })
        } else {
            this.setState({ saved: true })
        }

        this.setState({ saving: false })
    }

    render() {
        if (this.state.redirect) {
            this.props.navigate(`/${StringResource.Routes.UserManagement}`)
        }

        const saveContent: ReactNode = this.props.editable ? (
            <LoadingButton
                className="userDetailView__saveButton"
                variant="outlined"
                loadingPosition="start"
                loading={this.state.saving}
                startIcon={<SaveIcon />}
                disabled={this.state.saved}
                onClick={this.save}>{StringResource.General.Save}
            </LoadingButton>) : <></>

        const userRoute: string = `/${StringResource.Routes.UserManagement}/${StringResource.Routes.User}/${this.props.userId}`
        const { user, loading, error, openDeleteConfirmDialog } = this.state

        return (
            <div className="userDetailView__container">
                {loading ? <LinearProgress /> : <></>}
                <IconButton component={Link} to={`/${StringResource.Routes.UserManagement}`}>
                    <ArrowBackIcon />
                </IconButton>
                {this.props.editable ? (
                    <>
                        <span className="userDetailView__mainTitle">{this.props.userId ? StringResource.General.EditUser : StringResource.General.CreateNewUser}</span>
                        <IconButton
                            aria-label="view"
                            className="userDetailView__viewButton"
                            component={Link} to={`${userRoute}`}>
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            className="userDetailView__deleteButton"
                            onClick={this.requestToDeleteUser}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                ) : (
                    <IconButton
                        aria-label="edit"
                        className="userDetailView__editButton"
                        component={Link} to={`${userRoute}?${StringResource.Queries.EditOn}`}>
                        <Edit />
                    </IconButton>)
                }
                <UserEdit
                    user={user}
                    setValue={this.update}
                    editable={this.props.editable}
                />
                <p className="userDetailView__errorField" >{error}</p>
                {saveContent}

                <Dialog
                    open={openDeleteConfirmDialog}
                    onClose={this.handleAbort}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="userDetailView__dialog">
                    <DialogTitle id="alert-dialog-title">
                        {StringResource.Messages.DeleteUserQuestion}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {StringResource.Messages.DeleteUserContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAbort}>{StringResource.General.Cancel}</Button>
                        <Button onClick={this.deleteUser} autoFocus>{StringResource.General.Delete}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}