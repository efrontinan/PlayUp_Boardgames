import { Button, Container, Offcanvas } from "react-bootstrap"
import { useState } from "react"
import GameList from "../../components/GameList/GameList"

import './GameGalleryPage.css'

const GameGalleryPage = () => {

    return (
        <div className="GameGalleryPage m-3 m-md-5">
            <Container className="full-heigth-min">
                <GameList />
            </Container>
        </div>
    )
}

export default GameGalleryPage