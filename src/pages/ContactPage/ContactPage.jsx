import { Row,Col } from 'react-bootstrap'

import './ContactPage.css'
import ContactForm from '../../components/ContactForm/ContactForm'

const ContactPage = () => {

    return (
        <div className="ContactPage m-5">
            <Row>
                <Col>
                <ContactForm />
                </Col>
            </Row>

        </div>
    )
}

export default ContactPage