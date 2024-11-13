import axios from "axios"
import { useEffect, useState } from "react"

import { Col, Container, Row } from "react-bootstrap"

import GameCard from "../GameCard/GameCard"

const API_URL = "http://localhost:5005"

const GameList = () => {

    const [games, setGames] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchGames()
    }, [])

    const fetchGames = () => {
        axios
            .get(`${API_URL}/games`)
            .then(response => {
                setGames(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const removeGame = gameId => {

        axios
            .delete(`${API_URL}/games/${gameId}`)
            .then(fetchGames())
            .catch(err => console.log(err))
    }
    return (
        isLoading ? <h1>CARGANDO</h1> :
            <div className="GameList">
                <Row>
                    {
                        games.map(elm => {
                            return (
                                <Col md={{ span: 3 }} key={elm.id} >
                                    <GameCard {...elm} removeGame={removeGame} />
                                </Col>)
                        })
                    }
                </Row>
            </div>

    )
}

export default GameList