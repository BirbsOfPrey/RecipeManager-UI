import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import AppNavBar from "./AppNavBar"

export const Layout = () => {
    return (
        <div className={"layout__container "}>
            <AppNavBar />
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    )
}
