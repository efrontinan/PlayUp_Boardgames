import axios from "axios"
import { useEffect, useState } from "react"

import { Card, Badge, Row, Container, Col, Button } from "react-bootstrap"


const API_URL = "http://localhost:5005"

const EventsList = ({ gameId }) => {

    const [events, setEvents] = useState()
    const [isLoading, setIsLoading] = useState(true)


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

    return (isLoading ? <h1>CARAGNDO</h1> :
        <div className="EventsList">
            <h1>Eventos ({events.length})</h1>
            {
                events.map(elm => {

                    return (
                        <Card key={elm.id} className="my-3">
                            <Card.Body className="m-0">
                                <Container>
                                    <Row>
                                        <Col>

                                            <Card.Title className="text-primary">{elm.author} | {elm.date}</Card.Title>
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
                                            <Button onClick={(e) => deleteEvent(e, elm.id)}>Borrar</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>

                            <Card.Footer>¿Te apuntas? Envía un email a {elm.contact}</Card.Footer>

                        </Card>
                    )

                })
            }

        </div>
    )

}

export default EventsList