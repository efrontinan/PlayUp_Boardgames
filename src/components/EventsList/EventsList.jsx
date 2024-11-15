import axios from "axios"
import { useEffect, useState } from "react"

import { Card, Badge, Row, Container, Col, Button, Modal, Stack } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import Loader from "../Loader/Loader"

import EventsForm from "../../components/EventsForm/EventsForm"
import EditEventForm from "../../components/EditEventForm/EditEventForm"
import EventCard from "../EventCard/EventCard"

const API_URL = "http://localhost:5005"

const EventsList = () => {

    const { gameId } = useParams()

    const [events, setEvents] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModalById, setShowEditModalById] = useState(null)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = () => {
        axios
            .get(`${API_URL}/events/?gameId=${gameId}`)
            .then(response => {
                setEvents(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const deleteEvent = (e, id) => {
        e.preventDefault()
        axios
            .delete(`${API_URL}/events/${id}`)
            .then(() => {
                fetchEvents()
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="EventsList">
                <Stack >
                    <h1>Eventos ({events.length})</h1>
                    <Button
                        onClick={() => setShowCreateModal(true)}>
                        Crear evento
                    </Button>
                </Stack>
                {
                    events.map(elm => {

                        return (
                            <Card key={elm.id} className="my-3">
                                <Card.Body className="m-0">
                                    <Container>
                                        <Row>
                                            <Col>

                                                <Card.Title className="text-primary">
                                                    {elm.author} | {elm.date}
                                                </Card.Title>
                                                <Card.Text>
                                                    {elm.description}
                                                </Card.Text>

                                                <Container >
                                                    <Row className="pb-4">
                                                        <Card.Text>
                                                            Asistentes mínimos
                                                            <Badge> {elm.players.min}</Badge>
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Número máximo
                                                            <Badge> {elm.players.max}</Badge>
                                                        </Card.Text>
                                                    </Row>
                                                </Container>

                                                <Card.Subtitle>¿Dónde?</Card.Subtitle>
                                                <Card.Link>
                                                    {elm.address.name} ({elm.address.street} en {elm.address.city}, {elm.address.country})
                                                </Card.Link>

                                            </Col>
                                            <Col>
                                                <div className="d-grid gap-2">
                                                    <Button
                                                        onClick={(e) => deleteEvent(e, elm.id)}>
                                                        Borrar
                                                    </Button>
                                                    <Button
                                                        onClick={() => setShowEditModalById(elm.id)}>
                                                        Editar evento
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>

                                <Card.Footer>¿Te apuntas? Envía un email a {elm.contact}</Card.Footer>

                            </Card>

                        )

                    })
                }
                {/* <EventCard /> */}

                <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo evento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><EventsForm
                        closeCreateModal={() => { setShowCreateModal(false), fetchEvents() }} />
                    </Modal.Body>
                </Modal>

                <Modal bg="dark" show={showEditModalById !== null}
                    onHide={() => setShowEditModalById(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar evento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><EditEventForm
                        eventId={showEditModalById}
                        closeEditModal={() => { setShowEditModalById(null), fetchEvents() }} />
                    </Modal.Body>
                </Modal>

            </div>
    )

}

export default EventsList