import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

import EditGameForm from "../../components/EditGameForm/EditGameForm"

const API_URL = "http://localhost:5005"

const EditGamePage = () => {

    const {gameId} = useParams()

    const [game, setGame] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchGame()
    }, [])

    const fetchGame = () => {
        axios
            .get(`${API_URL}/games/${gameId}`)
            .then(response => {
                setGame(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return(isLoading ? <h1>CARAGNDO</h1> :
        <div className="EditGamePage">
            <h1>Editar juego: {game.title}</h1>
            <EditGameForm gameId={gameId} />
        </div>
    )
}

export default EditGamePage