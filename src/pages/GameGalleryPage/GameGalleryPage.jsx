import { Button, Container, Offcanvas } from "react-bootstrap"
import { useState } from "react"
import GameList from "../../components/GameList/GameList"

import './GameGalleryPage.css'

const GameGalleryPage = () => {

    const [showOfcanvas, setShowOffcanvas] = useState(false)

    return (
        <div className="GameGalleryPage m-5">
            <Container>
                <GameList />
            </Container>

        </div>
    )
}

export default GameGalleryPage