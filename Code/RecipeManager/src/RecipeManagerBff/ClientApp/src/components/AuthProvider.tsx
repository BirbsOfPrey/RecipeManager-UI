import React, { useEffect } from "react"
import { Claim, ClaimTypes } from "../models/security/Claim"
import { Roles } from "../models/security/Roles"
import { createDefaultHeader } from "../resources/Api"
import StringResource from "../resources/StringResource"

interface IAuthProps {
    valid: boolean
    loggedIn: boolean
    isAdmin: boolean
    logoutUrl: string
    handleLogin: () => void
    handleLogout: () => void
}

const defaultAuthProps: IAuthProps = {
    valid: false,
    loggedIn: false,
    isAdmin: false,
    logoutUrl: StringResource.Routes.BffLogout,
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
    const [isAdmin, setAdmin] = React.useState<boolean>(false)
    const [logoutUrl, setLogoutUrl] = React.useState<string>(StringResource.Routes.BffLogout)

    useEffect(() => {
        (async () => await fetchIsUserLoggedIn())()
    })

    const fetchIsUserLoggedIn = async () => {
        try {
            const response = await fetch(StringResource.Routes.BffUser, {
                headers: createDefaultHeader()
            })

            if (response.ok && response.status === 200) {
                const data = await response.json()
                const url = data.find((claim: Claim) => claim.type === ClaimTypes.LogoutUrl)?.value ?? logoutUrl
                const admin = data.find((claim: Claim) => claim.type === ClaimTypes.Role)?.value === Roles.Administrator ?? false
                setLogoutUrl(url)
                setAdmin(admin)
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
            window.location.replace(StringResource.Routes.BffLogin)
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
        isAdmin,
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