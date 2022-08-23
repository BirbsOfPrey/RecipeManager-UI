import { Container } from '@mui/material'
import { Copyright } from './widgets/Copyright'
import { Outlet } from 'react-router-dom'
import './Layout.css'
import AppNavBar from './AppNavBar'

export const Layout = () => {
    return (
        <div className={"layout__container "}>
            <AppNavBar />
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Copyright />
        </div>
    )
}
