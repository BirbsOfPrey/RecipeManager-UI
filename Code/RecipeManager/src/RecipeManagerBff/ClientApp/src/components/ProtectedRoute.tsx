import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import StringResource from "../resources/StringResource"
import { useAuth } from "./AuthProvider"

interface IProps {
    requireAdmin?: boolean
 }

export const ProtectedRoute = (props: React.PropsWithChildren<IProps>): ReactJSXElement => {
    const { handleLogin, isAdmin, loggedIn, valid } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        handleLogin()

        if (valid && props.requireAdmin && !isAdmin) {
            navigate(StringResource.Routes.Root)
        }
    })

    if (props.children && valid && loggedIn && (!props.requireAdmin || (props.requireAdmin && isAdmin))) {
        return props.children as ReactJSXElement
    } else {
        return <div></div>
    }
}