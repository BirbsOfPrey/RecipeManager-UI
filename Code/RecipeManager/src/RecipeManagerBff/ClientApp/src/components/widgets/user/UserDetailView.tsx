import { Component } from "react"
import { Link, NavigateFunction } from "react-router-dom"

interface IProps {
    userId?: string
    editable?: boolean
    navigate: NavigateFunction
}

interface IState {
    
}

export class UserDetailView extends Component<IProps, IState> {
    
}