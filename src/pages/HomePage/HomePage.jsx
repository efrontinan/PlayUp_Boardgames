import "../HomePage/HomePage.css"

import { useState, useEffect } from "react"
import Loader from "../../components/Loader/Loader"
import axios from "axios"

import { Col, Container, Row, Carousel, Button } from "react-bootstrap"

const API_URL = "http://localhost:5005"

const HomePage = () => {

    const [gameData, setGameData] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchGameDetails()
    }, [])

    const fetchGameDetails = () => {
        axios
            .get(`${API_URL}/games`)
            .then(response => {
                setGameData(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="HomePage">
                <Container>
                    <Row>
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
                    </Row>
                </Container>
            </div>
    )

}

export default HomePage