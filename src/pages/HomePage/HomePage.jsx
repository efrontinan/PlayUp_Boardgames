import { useState, useEffect } from "react"
import axios from "axios"

import { Col, Container, Row, Carousel, Button, Card } from "react-bootstrap"

import "../HomePage/HomePage.css"
import Loader from "../../components/Loader/Loader"
import { MEDIA } from "../../consts/paths.consts"

const API_URL = "http://localhost:5005"

const HomePage = () => {

    const [gameData, setGameData] = useState([])
    const [eventsData, setEventsData] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchGameDetails()
        fetchEventDetails()
        setIsLoading(false)
    }, [])

    const fetchGameDetails = () => {
        axios
            .get(`${API_URL}/games`)
            .then(response => {
                setGameData(response.data)
            })
            .catch(err => console.log(err))
    }

    const fetchEventDetails = () => {
        axios
            .get(`${API_URL}/events`)
            .then(response => {
                setEventsData(response.data)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="HomePage">
                <Container className="full-heigth-min">
                    <video autoPlay={true} muted loop={true} className="myVideo"
                        src={MEDIA.BACKGROUND} />
                    <div className="myVideo" id="fade"></div>

                    <Row className="p-5 align-items-end text-pop-up-top">
                        <Col md="5" className="image">
                        </Col>
                        <Col md="1" />
                        <Col >
                            <h1 className="mb-4">Juega. Conecta. Disfruta. </h1>
                            <p>Conecta, juega y vive momentos inolvidables. Encuentra los mejores juegos y únete a nuestras quedadas en toda España. ¿Listo para la partida? </p>
                            <Row className="mt-5">
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                +{eventsData.length}
                                            </Card.Title>
                                            <Card.Text>
                                                Momentos compartidos
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title >
                                                +{gameData.length}
                                            </Card.Title>
                                            <Card.Text>
                                                Juegos
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
    )

}

export default HomePage