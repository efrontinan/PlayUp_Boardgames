
import { Container } from "react-bootstrap"
import GameList from "../../components/GameList/GameList"

const GameGalleryPage = () => {
    return (
        <div className="GameGalleryPage">
            <Container>
                <p>soy la Gallery Page</p>
                <GameList />
            </Container>

        </div>
    )
}

export default GameGalleryPage