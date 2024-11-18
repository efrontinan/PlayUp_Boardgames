import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button, Offcanvas, Stack, Toast, ToastContainer, Row, Col } from "react-bootstrap"
import Loader from "../Loader/Loader"

import CreateEventsForm from "../../components/CreateEventsForm/CreateEventsForm"
import EventCard from "../EventCard/EventCard"

const API_URL = "http://localhost:5005"

const EventsList = () => {

    const { gameId } = useParams()

    const [events, setEvents] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showToast, setShowToast] = useState(false)


    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = () => {
        axios
            .get( gameId? `${API_URL}/events/?gameId=${gameId}` : `${API_URL}/events` )
            .then(response => {
                setEvents(response.data)
                setIsLoading(false)
                // setShowToast(true)
            })
            .catch(err => console.log(err))
    }



    return (
        isLoading ? <Loader /> :
            <div className="EventsList">
                <Row >
                    <Col xs="6" md="8">
                        <h1>Planazos ({events.length})</h1>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button
                            variant="custom-transparent"
                            onClick={() => setShowCreateModal(true)}>
                            Crear planazo
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {
                        events.map(elm => {

                            return (
                                <Col lg={events.length > 1 ? 6 : 12} key={elm.id}>
                                    <EventCard key={elm.id} {...elm} className="my-3" fetchEvents={fetchEvents} />
                                </Col>
                            )

                        })
                    }
                </Row>

                <Offcanvas show={showCreateModal} onHide={() => setShowCreateModal(false)} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Añadir planazo</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <CreateEventsForm closeCreateModal={() => { setShowCreateModal(false), fetchEvents() }} />
                    </Offcanvas.Body>
                </Offcanvas>

                <ToastContainer position="middle-center">
                    <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000}>
                        <Toast.Header closeButton={true}>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">¡Éxito!</strong>
                        </Toast.Header>
                        <Toast.Body>¡Evento publicado!</Toast.Body>
                    </Toast>
                </ToastContainer>

            </div>
    )

}

export default EventsList