import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
            navigate(-1)
        }
    })

    if (valid && loggedIn && props.children) {
        return props.children as ReactJSXElement
    } else {
        return <div></div>
    }
}