import { Badge, Button, Container, Offcanvas, Stack } from "react-bootstrap"
import { useState } from "react"
import GameList from "../../components/GameList/GameList"

import './GameGalleryPage.css'

const GameGalleryPage = () => {

    const [filterCategories, setFilterCategories] = useState("?categories_like=")
    const [selectedBadge, setSelectedBadge] = useState("Todos")

    return (
        <div className="GameGalleryPage m-3 m-md-5">

            <Container className="full-heigth-min">

                <Stack className="categoriesFilter" direction="horizontal" gap={2}>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Todos" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=")
                            setSelectedBadge("Todos")
                        }}>
                        Todos
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Juego de cartas" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=juego%20de%20cartas")
                            setSelectedBadge("Juego de cartas")
                        }}>
                        Juego de cartas
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Rol" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=rol")
                            setSelectedBadge("Rol")
                        }}>
                        Rol
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Juego de tablero" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=juego%20de%20tablero")
                            setSelectedBadge("Juego de tablero")
                        }}>
                        Juego de tablero
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Estrategia" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=estrategia")
                            setSelectedBadge("Estrategia")
                        }}>
                        Estrategia
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Juego cooperativo" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=juego%20cooperativo")
                            setSelectedBadge("Juego cooperativo")
                        }}>
                        Juego cooperativo
                    </Badge>
                    <Badge className="badge"
                        pill bg={`${selectedBadge === "Civilización" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=civilización")
                            setSelectedBadge("Civilización")
                        }}>
                        Civilización
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Juego de imaginación" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=juego%20de%20imaginación")
                            setSelectedBadge("Juego de imaginación")
                        }}>
                        Juego de imaginación
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Comercio" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=comercio")
                            setSelectedBadge("Comercio")
                        }}>
                        Comercio
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Construcción de territorios" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=construcción%20de%20territorios")
                            setSelectedBadge("Construcción de territorios")
                        }}>
                        Construcción de territorios
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Ciencia ficción" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=ciencia%20ficción")
                            setSelectedBadge("Ciencia ficción")
                        }}>
                        Ciencia ficción
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Juego de dados" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=juego%20de%20dados")
                            setSelectedBadge("Juego de dados")
                        }}>
                        Juego de dados
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Aventura" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=aventura")
                            setSelectedBadge("Aventura")
                        }}>
                        Aventura
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Party game" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=party%20game")
                            setSelectedBadge("Party game")
                        }}>
                        Party game
                    </Badge>
                    <Badge className="badge"
                        pill
                        bg={`${selectedBadge === "Diseño de patrones" ?
                            "primary" : "badge-outline-primary"}`}
                        onClick={() => {
                            setFilterCategories("?categories_like=diseño%de%20patrones")
                            setSelectedBadge("Diseño de patrones")
                        }}>
                        Diseño de patrones
                    </Badge>
                </Stack>

                <GameList filterCategories={filterCategories} />

            </Container>

        </div>
    )
}

export default GameGalleryPage