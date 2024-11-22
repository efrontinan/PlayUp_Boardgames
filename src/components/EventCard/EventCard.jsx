import { useContext, useState } from "react"
import axios from "axios"

import { Card, Badge, Row, Col, Button, Offcanvas, Modal, ModalBody } from "react-bootstrap"
import { Trash3, Pencil } from 'react-bootstrap-icons'

import EditEventForm from "../EditEventForm/EditEventForm"
import { exitingDateformat } from "../../utils/date-utils"
import './EventCard.css'
import { AuthContext } from "../../contexts/auth.context"
import { UserMessageContext } from "../../contexts/userMessage.context"


const API_URL = import.meta.env.VITE_APP_API_URL

const EventCard = ({ author, address, date, description, players, contact, id, fetchEvents }) => {

    const { createAlert } = useContext(UserMessageContext)

    const { min, max } = players
    const { country, city, street, name, zipcode } = address

    const [showEditOffcanvas, setShowEditOffcanvas] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    const { loggedAdmin } = useContext(AuthContext)

    const deleteEvent = e => {
        e.preventDefault()
        axios
            .delete(`${API_URL}/events/${id}`)
            .then(() => {
                createAlert('Evento eliminado')
                fetchEvents()

            })
            .catch(err => console.log(err))
    }

    return (
        <div className="EventCard my-3">

            <Card className='p-custom text-pop-up-top'>
                <Card.Body className="m-2">
                    <Row>
                        <Col className="d-grid gap-3">

                            <Card.Title className="my-1">
                                <Row>
                                    <Col md="6" sm="3" className="h3 text-primary">
                                        {author}
                                    </Col>
                                    <Col md="6" sm="9" className="date" >
                                        {exitingDateformat(date)}
                                    </Col>
                                </Row>

                            </Card.Title>
                            <Card.Text>
                                {description}
                            </Card.Text>


                            <Card.Text as={Row} className="label">
                                <Col md="9" xs="8">
                                    Número de asistentes
                                </Col>
                                <Col xs="4">
                                    <Row>
                                        <Col md="3" xs="4">
                                            <Badge bg="badge-outline-secondary" > {min}</Badge>
                                        </Col>
                                        <Col md="1" xs="2">
                                            -
                                        </Col>
                                        <Col md="3" xs="4">
                                            <Badge bg="badge-outline-secondary" > {max}</Badge>
                                        </Col>
                                    </Row>
                                </Col>
                            </Card.Text>

                            <Card.Subtitle className="pt-3">¿Dónde?</Card.Subtitle>

                            <Card.Link>
                                {name} ({street} en {city}, {country})
                            </Card.Link>

                        </Col>

                        <Col md="1" />

                        <Col md="1">
                            <div className="d-flex d-sm-grid gap-2">
                                {loggedAdmin && <Button onClick={() => setShowConfirmationModal(true)} variant="custom-secondary-outline"><Trash3 /></Button>}
                                <Button onClick={() => setShowEditOffcanvas(true)} variant="custom-secondary-outline"><Pencil /></Button>
                            </div>
                        </Col>

                    </Row>
                </Card.Body>

                <Card.Footer>¿Te apuntas? Envía un email a {contact}</Card.Footer>

            </Card>

            <Offcanvas show={showEditOffcanvas}
                onHide={() => setShowEditOffcanvas(false)} placement="end" >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Editar planazo</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditEventForm eventId={id} setShowEditOffcanvas={setShowEditOffcanvas} fetchEvents={fetchEvents} />
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>¿Estas seguro?</Modal.Title>
                </Modal.Header>
                <Modal.Body> ¿Estás seguro de que quieres borrar este planazo?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={deleteEvent} variant="custom-primary">Sí, eliminar</Button>
                    <Button onClick={() => setShowConfirmationModal(false)} variant="custom-secondary-outline">Cancelar</Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default EventCard