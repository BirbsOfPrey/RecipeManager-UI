import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { useAuth } from "./AuthProvider"

interface IProps { }

export const ProtectedRoute = (props: React.PropsWithChildren<IProps>): ReactJSXElement => {
    const { handleLogin } = useAuth()

    handleLogin()

    if (props.children) {
        return props.children as ReactJSXElement
    } else {
        return <></>
    }
}