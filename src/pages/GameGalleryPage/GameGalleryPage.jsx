import { Link } from "react-router-dom"

import { Container } from "react-bootstrap"
import { Button } from "react-bootstrap"
import GameList from "../../components/GameList/GameList"

const GameGalleryPage = () => {
    return (
        <div className="GameGalleryPage">
            <Container>
                <p>soy la Gallery Page</p>
                <GameList />

            </Container>
            <Button as={Link} to={"/juegos/nuevo"}>Crear</Button>
        </div>
    )
}

export default GameGalleryPage