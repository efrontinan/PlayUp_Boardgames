import { Row,Col, Container } from 'react-bootstrap'

import './ContactPage.css'
import ContactForm from '../../components/ContactForm/ContactForm'

const ContactPage = () => {

    return (
        <div className="ContactPage m-5">
            <Container className="full-heigth-min">
            <Row > 
                <Col>
                <ContactForm />
                </Col>
            </Row>
            </Container>

        </div>
    )
}

export default ContactPage