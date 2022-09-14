import { ListItem, ListItemAvatar, ListItemText } from "@mui/material"

interface IProps {
    icon?: React.ReactElement
    text: string
}

export const EmptyListItem = (props: IProps) => {
    return (
        <ListItem
            sx={{ pt: "5px", pb: "5px" }}>
            {props.icon ? (
                <ListItemAvatar>
                    {props.icon}
                </ListItemAvatar>) : <div></div>}
            <ListItemText
                primary={props.text}
            />
        </ListItem>
    )
}