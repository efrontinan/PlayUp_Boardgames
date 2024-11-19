import { useState, useEffect } from "react"
import axios from "axios"

import { Col, Container, Row, Carousel, Button, Card } from "react-bootstrap"

import "../HomePage/HomePage.css"
import Loader from "../../components/Loader/Loader"

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
                        src="https://res.cloudinary.com/dt9pviq34/video/upload/v1732011024/5151202-hd_1280_720_30fps_qavkza.mp4 " />

                    <Row className="p-5 align-items-end">
                        <Col md="5" className="image" >
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
                    {/* <Row>
                        <Col md={{ span: 5, offset: 1 }}>
                            <h1>Navega entre {gameData.length} juegos disponibes</h1>
                            <h2>Tus juegos favoritos y los que aún no has probado</h2>
                            <h4>¿Quieres apuntarte a una quedada para probar juegos nuevos?
                                ¡Echa un vistazo a los eventazos y encuentra el que más se adapte a ti!
                            </h4>
                            <div className="d-grid gap-2">
                                <Button>¿Llegaré a tener función?</Button>
                                <Button>Ni idea majo</Button>
                            </div>
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>

                            <Carousel>
                                <Carousel.Item>
                                    <img src={gameData[0].image} alt="imagen de juego de mesa" />
                                    <Carousel.Caption>
                                        <h2>{gameData[0].specs.players.min}
                                            -{gameData[0].specs.players.max} jugadores</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={gameData[1].image} alt="imagen de juego de mesa" />
                                    <Carousel.Caption>
                                        <h2>{gameData[1].specs.players.min}
                                            -{gameData[1].specs.players.max} jugadores</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={gameData[2].image} alt="imagen de juego de mesa" />
                                    <Carousel.Caption>
                                        <h2>{gameData[2].specs.players.min}
                                            -{gameData[2].specs.players.max} jugadores</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row> */}
                </Container>
            </div>
    )

}

export default HomePage