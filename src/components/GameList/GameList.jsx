import axios from "axios"
import { useEffect, useState } from "react"
import GameCard from "../GameCard/GameCard"
import { Col, Container, Row } from "react-bootstrap"

const API_URL = "http://localhost:5005"

const GameList = () => {

    const [games, setGames] = useState([])

    useEffect(() => {
        fetchGames()
    }, [])

    const fetchGames = () => {
        axios
            .get(`${API_URL}/games`)
            .then(response => setGames(response.data))
            .catch(err => console.log(err))
    }

    return (
        <div className="GameList">
            <Container>
                <Row>

                    {
                        games.map(elm => {
                            return (<Col md={{ span: 3 }}><GameCard {...elm} /></Col>)
                        })
                    }

                </Row>
            </Container>
        </div>
    )
}

export default GameList