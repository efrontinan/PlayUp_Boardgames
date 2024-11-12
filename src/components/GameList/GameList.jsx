import axios from "axios"
import { useEffect, useState } from "react"

import { Col, Container, Row } from "react-bootstrap"

import GameCard from "../GameCard/GameCard"

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
            <Row>
                {
                    games.map(elm => {
                        return (
                            <Col md={{ span: 3 }} key={elm.id} >
                                <GameCard {...elm} />
                            </Col>)
                    })
                }
            </Row>
        </div>

    )
}

export default GameList