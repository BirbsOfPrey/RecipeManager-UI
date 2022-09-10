import { Autocomplete, TextField } from "@mui/material"
import { Roles } from "../../models/security/Role"
import StringResource from "../../resources/StringResource"

interface IProps {
    role?: string
    updateRole: (value: string) => void
    editable?: boolean
}

export const RoleAutocomplete = (props: IProps) => {
    return (
        <Autocomplete
            disablePortal
            className="roleAutocomplete__container"
            readOnly={!props.editable}
            disabled={!props.editable}
            options={[Roles.Administrator, Roles.User]}
            inputValue={props.role}
            value={props.role}
            onChange={(_, value) => props.updateRole(value ? value : "")}
            renderInput={(params) => <TextField {...params} label={StringResource.General.Role} variant="filled" />}
        />
    )
}