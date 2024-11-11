import axios from "axios"
import { useEffect, useState } from "react"
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
            {
                games.map(elm => {
                    return (<GameCard {...elm} />)
                })
            }
        </div>
    )
}

export default GameList