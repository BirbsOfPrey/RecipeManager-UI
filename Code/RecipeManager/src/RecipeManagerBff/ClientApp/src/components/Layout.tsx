import { Container } from 'reactstrap'
import { NavMenu } from './NavMenu'
import { Copyright } from './widgets/Copyright'
import './Layout.css'

interface IProps {
    children: React.ReactNode;
}

export const Layout = (props: IProps) => {
    return (
        <div className={"layout__container "}>
            <nav>
                <NavMenu />
            </nav>
            <main>
                <Container>
                    {props.children}
                </Container>
            </main>
            <Copyright />
        </div>
    );
}
