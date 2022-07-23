import { Container } from 'reactstrap'
import { NavMenu } from './NavMenu'
import { Copyright } from './widgets/Copyright'
import './Layout.css'
import { Outlet } from 'react-router-dom'

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
