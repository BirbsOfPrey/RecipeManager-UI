import { Component } from 'react'
import { Container } from 'reactstrap'
import { NavMenu } from './NavMenu'
import { Copyright } from './widgets/Copyright'
import './Layout.css'

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className={"layout__container "}>
                <nav>
                    <NavMenu />
                </nav>
                <main>
                    <Container>
                        {this.props.children}
                    </Container>
                </main>
                <Copyright />
            </div>
        );
    }
}
