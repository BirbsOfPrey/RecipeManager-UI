import { Pagination } from "@mui/material";
import { Component, ReactNode } from "react";
import { Step } from "../../models/Step";

interface IState {
    contentNr: number
}

interface IProps {
    steps?: Step[]
    setValue: (property: string, value: string) => void
    editable?: boolean
}

export class RecipeEditSteps extends Component<IProps, {}> {
    
    state: IState = {
        contentNr: 1
    }

    setContentNr = (event: React.ChangeEvent<unknown>, value: number) => {
        this.setState({ contentNr: value })
    }

    render() {
        const contents: ReactNode[] = [
            <>Hier steht die Beschreibung</>,
            <>Und die Instruktionen</>,
        ]

        const content: ReactNode = contents[this.state.contentNr - 1]

        return (
        <div>
                    {content}
                    <Pagination
                        variant="outlined"
                        count={contents.length}
                        page={this.state.contentNr}
                        onChange={this.setContentNr}
                    />
        </div>)
    }
}