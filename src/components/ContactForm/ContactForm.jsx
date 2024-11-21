import axios from "axios"
import { useState } from "react"

import { Form, Button, Toast } from "react-bootstrap"

const API_URL = "http://localhost:5005"

const ContactForm = () => {

    const [contactData, setContactData] = useState({
        email: "",
        message: ""
    })

    const [showToast, setShowToast] = useState(false)
    const [validated, setValidated] = useState(false)

    const handleContactChange = e => {
        const { name, value } = e.target
        setContactData({ ...contactData, [name]: value })

    }

    const handleFormSubmit = e => {
        e.preventDefault()
        const form = e.target

        if (form.checkValidity() === false) {
            e.stopPropagation()
            setValidated(true)
            return
        }

        const newContact = {
            ...contactData,
            date: new Date().toISOString(),
            isAnswered: false
        }

        axios
            .post(`${API_URL}/contact`, newContact)
            .then(() => {
                setShowToast(true)
                setContactData({
                    email: "",
                    message: "",
                })
                setValidated(false)
            })
            .catch(err => console.log(err))


    }

    return (
        <div className="ContactForm">
            <Form
                noValidate
                validated={validated}
                onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="EmailField">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Introduce tu email"
                        value={contactData.email}
                        name={'email'}
                        onChange={handleContactChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Introduce un email
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="MessageField">
                    <Form.Label>Mandanos un mensaje</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Mándanos un mensaje"
                        rows={5}
                        as="textarea"
                        value={contactData.message}
                        name={'message'}
                        onChange={handleContactChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="custom-primary" type="submit">
                    Enviar email
                </Button>
            </Form>

            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                autohide="true"
                delay="5000" >
                <Toast.Header
                    className="justify-content-between">
                    ¡Mensaje enviado!
                </Toast.Header>
                <Toast.Body>
                    Nos pondremos en contacto contigo lo antes posible
                </Toast.Body>
            </Toast>
        </div>
    )

}

export default ContactForm