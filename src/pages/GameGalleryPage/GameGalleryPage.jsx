import { Badge, Button, Container, Offcanvas, Stack } from "react-bootstrap"
import { useState } from "react"
import GameList from "../../components/GameList/GameList"

import './GameGalleryPage.css'

const GameGalleryPage = () => {

    const [filterCategories, setFilterCategories] = useState("?categories_like=")

    return (
        <div className="GameGalleryPage m-3 m-md-5">
            <Container className="full-heigth-min">
                <Stack direction="horizontal" gap={2}>
                    <Badge className="badge" pill bg="primary" onClick={() => setFilterCategories("?categories_like=")}>
                        Todos
                    </Badge>
                    <Badge className="badge" pill bg="primary" onClick={() => setFilterCategories("?categories_like=juego%20de%20cartas")}>
                        Juego de cartas
                    </Badge>
                    <Badge className="badge" pill bg="primary" onClick={() => setFilterCategories("?categories_like=rol")}>
                        Rol
                    </Badge>
                    <Badge className="badge" pill bg="primary" onClick={() => setFilterCategories("?categories_like=juego%20de%20tablero")}>
                        Juego de tablero
                    </Badge>
                    <Badge className="badge" pill bg="primary" onClick={() => setFilterCategories("?categories_like=estrategia")} >
                        Estrategia
                    </Badge>
                    <Badge className="badge" pill bg="primary" onClick={() => setFilterCategories("?categories_like=juego%20cooperativo")} >
                        Juego cooperativo
                    </Badge>
                    <Badge className="badge" pill bg="primary" onClick={() => setFilterCategories("?categories_like=civilización")} >
                        Civilización
                    </Badge>
                </Stack>

                <GameList filterCategories={filterCategories} />
            </Container>
        </div>
    )
}

export default GameGalleryPage