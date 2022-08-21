import { Container } from '@mui/material'
import { NavMenu } from './NavMenu'
import { Copyright } from './widgets/Copyright'
import { Outlet } from 'react-router-dom'
import './Layout.css'
import AppNavBar from './AppNavBar'

export const Layout = () => {
    return (
        <div className={"layout__container "}>
            <AppNavBar />
            <nav>
                <NavMenu />
            </nav>
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Copyright />
        </div>
    )
}
