import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button, Offcanvas, Stack, Toast, Row, Col } from "react-bootstrap"
import Loader from "../Loader/Loader"

import CreateEventsForm from "../../components/CreateEventsForm/CreateEventsForm"
import EventCard from "../EventCard/EventCard"

const API_URL = "http://localhost:5005"

const EventsList = () => {

    const { gameId } = useParams()

    const [events, setEvents] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const [showCreateModal, setShowCreateModal] = useState(false)
    // const [showToast, setShowToast] = useState(false)


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

                {/* <Toast show={showToast} position="middle-center">
                    <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </Toast> */}

            </div>
    )

}

export default EventsList