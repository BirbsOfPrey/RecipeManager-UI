import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

interface IProps {
    requireAdmin?: boolean
 }

export const ProtectedRoute = (props: React.PropsWithChildren<IProps>): ReactJSXElement => {
    const { handleLogin, isAdmin, loggedIn } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        handleLogin()

        if (props.requireAdmin && !isAdmin) {
            navigate(-1)
        }
    })

    if (loggedIn && props.children) {
        return props.children as ReactJSXElement
    } else {
        return <></>
    }
}