import { Link } from "react-router-dom"

import { Container, Form } from "react-bootstrap"
import GameList from "../../components/GameList/GameList"

import './GameGalleryPage.css'

const GameGalleryPage = () => {

    return (
        <div className="GameGalleryPage m-5">
            <Container>
                     <GameList />
            </Container>
        </div>
    )
}

export default GameGalleryPage