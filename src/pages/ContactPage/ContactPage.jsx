import { Row,Col, Container } from 'react-bootstrap'

import './ContactPage.css'
import ContactForm from '../../components/ContactForm/ContactForm'

const ContactPage = () => {

    return (
        <div className="ContactPage m-3 m-md-5">
            <Container className="full-heigth-min">
            <Row > 
                <Col md="12">
                <ContactForm />
                </Col>
            </Row>
            </Container>

        </div>
    )
}

export default ContactPage