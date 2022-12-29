import { Autocomplete, TextField } from "@mui/material"
import { Roles } from "../../models/security/Roles"
import StringResource from "../../resources/StringResource"

interface IProps {
    role?: string
    updateRole: (value: string) => void
    editable?: boolean
}

export const RoleAutocomplete = (props: IProps) => {
    const options: string[] = ["", Roles.Administrator, Roles.User]
    const variant = props.editable ? "filled" : "outlined"
    return (
        <Autocomplete
            className="roleAutocomplete__role"
            readOnly={!props.editable}
            options={options}
            value={props.role || ""}
            onChange={(_, value) => props.updateRole(value ? value : "")}
            renderInput={(params) => <TextField {...params} label={StringResource.General.Role} variant={variant} />}
        />
    )
}