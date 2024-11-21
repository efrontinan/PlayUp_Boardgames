import { Button, Card, Col, Row } from "react-bootstrap"

import './ContactCard.css'
import { getTimePassed } from "../../utils/date-utils"
import { Calendar } from "react-bootstrap-icons"
import { useContext, useState } from "react"

import { UserMessageContext } from "../../contexts/userMessage.context"

const ContactCard = ({ email, message, date, isAnswered }) => {

    const [answer, setIsAnswered] = useState(isAnswered)

    const { createAlert } = useContext(UserMessageContext)

    return (
        <div className="ContactCard my-4">
            <Card>
                <Card.Body className="m-2">
                    <Row>
                        <Col className="d-grid">

                            <Card.Title className="mb-3">
                                "{message}"
                            </Card.Title>
                            <Card.Text>
                                Mensaje de {email}
                            </Card.Text>

                            <Card.Text>
                                <Calendar className="me-2" /> Recibido hace {getTimePassed(date, 'months')}
                            </Card.Text>

                            <Button
                                variant="custom-text"
                                onClick={() => { setIsAnswered(!answer), createAlert('Respuesta enviada') }}>
                                {answer ? 'Marcar como no respondido' : 'Marcar como respondido'}
                            </Button>

                        </Col>

                    </Row>
                </Card.Body>
            </Card>
        </div>
    )

}

export default ContactCard