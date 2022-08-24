import React, { useEffect } from "react"
import { Claim, ClaimTypes } from "../models/security/Claim"
import { createDefaultHeader } from "../resources/Api"
import StringResource from "../resources/StringResource"

interface IAuthProps {
    valid: boolean
    loggedIn: boolean
    logoutUrl: string
    handleLogin: () => void
    handleLogout: () => void
}

const defaultAuthProps: IAuthProps = {
    valid: false,
    loggedIn: false,
    logoutUrl: StringResource.Routes.Logout,
    handleLogin: () => { },
    handleLogout: () => { }
}

const AuthContext = React.createContext(defaultAuthProps)

export const useAuth = () => {
    return React.useContext(AuthContext)
}

interface IProps { }

export const AuthProvider = (props: React.PropsWithChildren<IProps>) => {
    const [valid, setValidState] = React.useState<boolean>(false)
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)
    const [logoutUrl, setLogoutUrl] = React.useState<string>(StringResource.Routes.Logout)

    useEffect(() => {
        (async () => await fetchIsUserLoggedIn())()
    })

    const fetchIsUserLoggedIn = async () => {
        try {
            const response = await fetch(StringResource.Routes.User, {
                headers: createDefaultHeader()
            })

            if (response.ok && response.status === 200) {
                const data = await response.json()
                const url = data.find((claim: Claim) => claim.type === ClaimTypes.LogoutUrl)?.value ?? logoutUrl
                setLogoutUrl(url)
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
            setValidState(true)
        } catch (e) {
            setLoggedIn(false)
        }
    }

    const handleLogin = () => {
        if (valid && !loggedIn) {
            window.location.replace(StringResource.Routes.Login)
        }
    }

    const handleLogout = () => {
        if (valid && loggedIn) {
            window.location.replace(logoutUrl)
        }
    }

    const value = {
        valid,
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