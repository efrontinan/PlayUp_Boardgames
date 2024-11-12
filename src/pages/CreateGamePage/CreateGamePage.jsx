import { useState } from "react"


const CreateGamePage = () => {

    const [gameData, setGameData] = useState({
        title: "",
        image: "",
        categories: [],
        specs: {
            players: {
                min: 0,
                max: 0
            },
            minimumAge: 0,
            duration: 0
        },
        description: "",
        howToPlay: [],
        expansions: "",
        oneTimePlay: false,
        content: []
    })

    return (
        <div className="CreateGamePage">
            <p>Yo soy la página de crear un juego</p>
        </div>
    )
}

export default CreateGamePage