import React, { useEffect } from "react"
import { Claim } from "../models/security/Claim"
import { createDefaultHeader } from "../resources/Api"
import StringResource from "../resources/StringResource"

interface IAuthProps {
    loggedIn: boolean
    logoutUrl: string
    handleLogin: () => void
    handleLogout: () => void
}

const defaultAuthProps: IAuthProps = {
    loggedIn: false,
    logoutUrl: StringResource.Routes.Logout,
    handleLogin: () => {},
    handleLogout: () => {}
}

const AuthContext = React.createContext(defaultAuthProps)

export const useAuth = () => {
    return React.useContext(AuthContext);
}

interface IProps { }

export const AuthProvider = (props: React.PropsWithChildren<IProps>) => {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)
    const [logoutUrl, setLogoutUrl] = React.useState<string>(StringResource.Routes.Logout)

    useEffect(() => {
        (async () => await fetchIsUserLoggedIn())()
    })

    const fetchIsUserLoggedIn = async () => {
        try {
            const response = await fetch("/bff/user", {
                headers: createDefaultHeader()
            })

            if (response.ok && response.status === 200) {
                const data = await response.json()
                const url = data.find((claim: Claim) => claim.type === "bff:logout_url")?.value ?? logoutUrl
                setLogoutUrl(url)
                setLoggedIn(true)
            }
        } catch (e) {
            console.error(e);
            setLoggedIn(false)
        }
    }

    const handleLogin = () => {
        window.location.replace(StringResource.Routes.Login)
    }

    const handleLogout = () => {
        window.location.replace(logoutUrl)
    }

    const value = {
        loggedIn,
        logoutUrl,
        handleLogin,
        handleLogout
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}