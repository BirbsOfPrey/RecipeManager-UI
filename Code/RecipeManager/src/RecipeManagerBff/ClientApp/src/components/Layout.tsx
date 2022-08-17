import { Container } from '@mui/material'
import { NavMenu } from './NavMenu'
import { Copyright } from './widgets/Copyright'
import { Outlet } from 'react-router-dom'
import './Layout.css'

export const Layout = () => {
    return (
        <div className={"layout__container "}>
            <nav>
                <NavMenu />
            </nav>
            <main>
                <Container>
                    <Outlet/>
                </Container>
            </main>
            <Copyright />
        </div>
    )
}
