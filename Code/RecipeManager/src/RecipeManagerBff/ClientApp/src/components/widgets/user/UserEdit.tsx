import { Component } from "react"
import { Stack, TextField } from "@mui/material"
import { User } from "../../../models/security/User"
import { UserValidator } from "../../../models/security/UserValidator"
import { RoleAutocomplete } from "../../controls/RoleAutocomplete"
import StringResource from "../../../resources/StringResource"

interface IProps {
    user: User
    setValue: (property: string, value: string) => void
    editable?: boolean
}

export class UserEdit extends Component<IProps, {}> {

    render() {
        const { user, editable, setValue } = this.props
        const variant = editable ? "filled" : "outlined"

        return (
            <Stack className="userEdit__container" spacing={2}>
                <TextField
                    variant={variant}
                    className="userEdit__nameField"
                    required
                    fullWidth
                    inputProps={{ readOnly: !editable, disabled: !editable }}
                    label={StringResource.General.UserName}
                    value={user.name ? user.name : ""}
                    placeholder={StringResource.General.UserName}
                    onChange={event => setValue("name", event.target.value)}
                    error={editable && !UserValidator.validateName(user.name)}
                    helperText={editable && !UserValidator.validateName(user.name) ? StringResource.Messages.RequiredUserName : " "}
                />
                <RoleAutocomplete
                    role={user.role}
                    updateRole={(role) => setValue("role", role)}
                    editable={editable}
                />
                <TextField
                    variant={variant}
                    className="userEdit__firstNameField"
                    fullWidth
                    inputProps={{ readOnly: !editable, disabled: !editable }}
                    label={StringResource.General.FirstName}
                    value={user.firstName ? user.firstName : ""}
                    placeholder={StringResource.General.FirstName}
                    onChange={event => setValue("firstName", event.target.value)}
                    helperText={" "}
                />
                <TextField
                    variant={variant}
                    className="userEdit__familyNameField"
                    fullWidth
                    inputProps={{ readOnly: !editable, disabled: !editable }}
                    label={StringResource.General.FamilyName}
                    value={user.familyName ? user.familyName : ""}
                    placeholder={StringResource.General.FamilyName}
                    onChange={event => setValue("familyName", event.target.value)}
                    helperText={" "}
                />
                <TextField
                    variant={variant}
                    className="userEdit__emailField"
                    fullWidth
                    inputProps={{ readOnly: !editable, disabled: !editable }}
                    label={StringResource.General.EMail}
                    value={user.email ? user.email : ""}
                    placeholder={StringResource.General.EMail}
                    onChange={event => setValue("email", event.target.value)}
                    helperText={" "}
                />
                {editable && user.id ?
                    <TextField
                        variant={variant}
                        className="userEdit__oldPasswordField"
                        required={user.newPassword ? true : false}
                        fullWidth
                        type="password"
                        inputProps={{ readOnly: !editable, disabled: !editable }}
                        label={StringResource.General.OldPassword}
                        placeholder={StringResource.General.OldPassword}
                        onChange={event => setValue("oldPassword", event.target.value)}
                        helperText={user.newPassword ? StringResource.Messages.RequiredOldPassword : " "}
                    /> : <div></div>
                }
                {editable ?
                    <TextField
                        variant={variant}
                        className="userEdit__newPasswordField"
                        required={user.id ? false : true}
                        fullWidth
                        type="password"
                        inputProps={{ readOnly: !editable, disabled: !editable }}
                        label={StringResource.General.NewPassword}
                        placeholder={StringResource.General.NewPassword}
                        onChange={event => setValue("newPassword", event.target.value)}
                        error={!UserValidator.validatePassword(user.newPassword)}
                        helperText={UserValidator.validatePassword(user.newPassword) ? " " : StringResource.Messages.RequiredPassword}
                    /> : <div></div>
                }
            </Stack>
        )
    }
}