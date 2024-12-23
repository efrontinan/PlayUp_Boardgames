import axios from "axios"
import { useContext, useEffect, useState } from "react"

import { Col, Row } from "react-bootstrap"

import GameCard from "../GameCard/GameCard"

import './GameList.css'
import Loader from "../Loader/Loader"
import { UserMessageContext } from "../../contexts/userMessage.context"

const API_URL = import.meta.env.VITE_APP_API_URL

const GameList = ({ filterCategories }) => {

    const { createAlert } = useContext(UserMessageContext)

    const [games, setGames] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchGames()
    }, [filterCategories])

    const fetchGames = () => {
        axios
            .get(`${API_URL}/games${filterCategories}`)
            .then(response => {
                setGames(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const removeGame = gameId => {
        axios
            .delete(`${API_URL}/games/${gameId}`)
            .then(() => {
                fetchGames()
                createAlert('Juego eliminado')
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="GameList">
                <Row className="p-0">
                    {
                        games.map(elm => {
                            return (
                                <Col lg="4" md="6" s="12" key={elm.id} className="my-2 mx-0" >
                                    <GameCard fetchGames={fetchGames} {...elm} removeGame={removeGame} />
                                </Col>)
                        })
                    }
                </Row>
            </div>
    )
}

export default GameList