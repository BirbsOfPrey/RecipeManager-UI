import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";

interface IProps {
    icon?: React.ReactElement
    text: string
}

export const EmptyListItem = (props: IProps) => {
    return (
        <ListItem>
            {props.icon ? (
            <ListItemAvatar>
                {props.icon}
            </ListItemAvatar>) : <></>}
            <ListItemText
                primary={props.text}
            />
        </ListItem>
        )
}