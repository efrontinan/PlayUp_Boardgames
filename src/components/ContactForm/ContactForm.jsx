import axios from "axios"
import { useRef, useState } from "react"

import { Form, Button, Toast, Overlay, Tooltip } from "react-bootstrap"

const API_URL = "http://localhost:5005"

const ContactForm = () => {

    const [contactData, setContactData] = useState({
        email: "",
        message: ""
    })

    const [showToast, setShowToast] = useState(false)
    const [error, setError] = useState({
        email: false,
        message: false
    })

    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const handleContactChange = e => {
        const { name, value } = e.target
        setContactData({ ...contactData, [name]: value })
        setError({
            ...error,
            [name]: value.trim() === ""
        });
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        const newContact = { ...contactData }
        if (!contactData.email.trim() || !contactData.message.trim()) {
            setError({
                email: !contactData.email.trim(),
                message: !contactData.message.trim()
            })
            console.log('Los campos no están rellenos')
        } else {
            // Submit form
            axios
                .post(`${API_URL}/contact`, newContact)
                .then(() => {
                    setShowToast(true)
                    setContactData({
                        email: "",
                        message: ""
                    })
                    setError({ email: false, message: false })
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="ContactForm">
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="EmailField">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Introduce tu email"
                        value={contactData.email}
                        name={'email'}
                        onChange={handleContactChange}
                        ref={emailRef} // Asignamos el ref aquí
                        isInvalid={error.email} // Indica visualmente el error
                    />
                    <Overlay target={emailRef.current} show={error.email} placement="right">
                        {(props) => (
                            <Tooltip id="email-tooltip">
                                Este campo es obligatorio.
                            </Tooltip>
                        )}
                    </Overlay>
                </Form.Group>

                <Form.Group className="mb-3" controlId="MessageField">
                    <Form.Label>Mandanos un mensaje</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Mándanos un mensaje"
                        rows={5}
                        as="textarea"
                        value={contactData.message}
                        name={'message'}
                        onChange={handleContactChange}
                        ref={messageRef} // Asignamos el ref aquí
                        isInvalid={error.message} // Indica visualmente el error
                    />
                    <Overlay target={messageRef.current} show={error.message} placement="right">
                        {(props) => (
                            <Tooltip id="message-tooltip">
                                Este campo es obligatorio.
                            </Tooltip>
                        )}
                    </Overlay>
                </Form.Group>

                <Button variant="custom-primary" type="submit">
                    Submit
                </Button>

            </Form>

            <Toast show={showToast} onClose={() => setShowToast(false)} autohide="true" delay="5000" >
                <Toast.Header className="justify-content-between">¡Mensaje enviado!</Toast.Header>
                <Toast.Body>Nos pondremos en contacto contigo lo antes posible</Toast.Body>
            </Toast>
        </div>
    )

}

export default ContactForm