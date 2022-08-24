import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { useAuth } from "./AuthProvider"

interface IProps { }

export const ProtectedRoute = (props: React.PropsWithChildren<IProps>): ReactJSXElement => {
    const { loggedIn, handleLogin } = useAuth()
  
    if (!loggedIn) {
      handleLogin()
      return <div></div>
    }
    
    if (props.children) {
        return props.children as ReactJSXElement
    } else {
        return <></>
    }
  }