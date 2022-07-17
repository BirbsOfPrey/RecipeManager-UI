import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import EggIcon from '@mui/icons-material/Egg'

export const EmptyListItem: any = () => {
    return (
        <ListItem>
            <ListItemAvatar>
                <EggIcon />
            </ListItemAvatar>
            <ListItemText
                primary={"Keine Zutaten definiert"}
            />
        </ListItem>
        )
}