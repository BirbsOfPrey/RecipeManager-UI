import { Container } from 'reactstrap'
import StringResource from '../../resources/StringResource'
import './Copyright.css'

export const Copyright = () => {
    return (
    <div className="copyright__container">
        <Container>
            {StringResource.Copyright}
        </Container>
    </div>
    )
}