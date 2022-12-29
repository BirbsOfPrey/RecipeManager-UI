import { Component } from "react"
import { Box, IconButton, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import StringResource from "../../resources/StringResource"

interface IProps {
    value: string
    onSearch: (value: string) => void
}

interface IState {
    search: string
}

export class SearchField extends Component<IProps, IState> {

    state: IState = {
        search: ""
    }

    componentDidMount(): void {
        this.setState({ search: this.props.value })
    }

    triggerKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            this.props.onSearch(this.state.search)
        }
    }

    render() {
        return (
            <Box className="searchField__container" sx={{ mb: "10px" }}>
                <TextField
                    className="searchField__textField"
                    variant="outlined"
                    size="small"
                    type="search"
                    autoFocus
                    label={StringResource.General.Search}
                    value={this.state.search}
                    placeholder={StringResource.General.Search}
                    onChange={event => this.setState({ search: event.target.value })}
                    onKeyDown={this.triggerKeyDown.bind(this)}
                />
                <IconButton
                    className="searchField__button"
                    onClick={() => this.props.onSearch(this.state.search)}
                    sx={{ justifySelf: "center" }}
                >
                    <SearchIcon />
                </IconButton>
            </Box>
    )}
}