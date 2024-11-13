import { useEffect, useState } from "react"

import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";


const API_URL = "http://localhost:5005"

const GameForm = () => {

    const [gameData, setGameData] = useState({
        title: "",
        image: "",
        categories: [""],
        description: "",
        howToPlay: [""],
        expansions: [""],
        oneTimePlay: false,
        content: [""]
    })

    const [specs, setSpecs] = useState({
        minimumAge: 0,
        duration: 0
    },)

    const [players, setPlayers] = useState({
        min: 0,
        max: 0
    })

    const reqPayLoadSpecs = {
        ...specs,
        players: players
    }

    const reqPayLoad = {
        ...gameData,
        specs: reqPayLoadSpecs
    }

    const handleGameChange = e => {
        const { name, value, checked, type } = e.target
        const result = type === "checkbox" ? checked : value
        setGameData({ ...gameData, [name]: result })
    }

    const handleSpecsChange = e => {
        const { name, value } = e.target
        setSpecs({ ...specs, [name]: value })
    }

    const handlePlayersChange = e => {
        const { name, value } = e.target
        setPlayers({ ...players, [name]: value })
    }

    const handleCategoriesChange = (e, idx) => {
        const { value } = e.target
        const categoriesCopy = [...gameData.categories]
        categoriesCopy[idx] = value
        setGameData({ ...gameData, categories: categoriesCopy })
    }

    const addCategory = () => {
        const categoriesCopy = [...gameData.categories]
        categoriesCopy.push("")
        setGameData({ ...gameData, categories: categoriesCopy })
    }

    const handleHowToPlayChange = (e, idx) => {
        const { value } = e.target
        const howToPlayCopy = [...gameData.howToPlay]
        howToPlayCopy[idx] = value
        setGameData({ ...gameData, howToPlay: howToPlayCopy })
    }

    const addHowToPlay = () => {
        const howToPlayCopy = [...gameData.howToPlay]
        howToPlayCopy.push("")
        setGameData({ ...gameData, howToPlay: howToPlayCopy })
    }

    const handleExpansionsChange = (e, idx) => {
        const { value } = e.target
        const expansionsCopy = [...gameData.expansions]
        expansionsCopy[idx] = value
        setGameData({ ...gameData, expansions: expansionsCopy })
    }

    const addExpansions = () => {
        const expansionsCopy = [...gameData.expansions]
        expansionsCopy.push("")
        setGameData({ ...gameData, expansions: expansionsCopy })
    }

    const handleContentChange = (e, idx) => {
        const { value } = e.target
        const contentCopy = [...gameData.content]
        contentCopy[idx] = value
        setGameData({ ...gameData, content: contentCopy })
    }

    const addContent = () => {
        const contentCopy = [...gameData.content]
        contentCopy.push("")
        setGameData({ ...gameData, content: contentCopy })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        axios
            .post(`${API_URL}/games`, reqPayLoad)
            .then(() => {
                alert("Posted")
                setGameData(
                    {
                        title: "",
                        image: "",
                        categories: [""],
                        description: "",
                        howToPlay: [""],
                        expansions: [""],
                        oneTimePlay: false,
                        content: [""]
                    }
                )
                setSpecs(
                    {
                        minimumAge: 0,
                        duration: 0
                    }
                )
                setPlayers(
                    {
                        min: 0,
                        max: 0
                    }
                )

            })
            .catch(err => console.log(err))
    }



    return (
        <div className="GameForm">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    <Form onSubmit={handleFormSubmit}>

                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" placeholder="Inserta el título"
                                value={gameData.title} onChange={handleGameChange}
                                name={"title"} />
                            <Form.Text className="text-muted">
                                ¡Añade un juego divertido!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label>Imagen del juego</Form.Label>
                            <Form.Control type="text"
                                placeholder="Inserta el URL de la imagen"
                                value={gameData.image} onChange={handleGameChange}
                                name={"image"} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCategories">
                            <Form.Label>Categorías</Form.Label>
                            {
                                gameData.categories.map((elm, idx) => {
                                    return (
                                        <Form.Control type="text"
                                            className="mb-2"
                                            placeholder="Categoría"
                                            onChange={event => handleCategoriesChange(event, idx)}
                                            value={gameData.categories[idx]}
                                            key={idx} />
                                    )
                                })
                            }
                            <Button variant="dark" onClick={addCategory}>
                                Añadir categoría
                            </Button>
                        </Form.Group>

                        <Row>

                            <Col>
                                <Form.Group className="mb-5" controlId="formMinPlayers">
                                    <Form.Label>Mínimo de jugadores</Form.Label>
                                    <Form.Control type="number"
                                        value={players.min} onChange={handlePlayersChange}
                                        name={"min"} />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-5" controlId="formMaxPlayers">
                                    <Form.Label>Máximo de jugadores</Form.Label>
                                    <Form.Control type="number"
                                        value={players.max} onChange={handlePlayersChange}
                                        name={"max"} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-5" controlId="formMinimumAge">
                                    <Form.Label>Edad mínima</Form.Label>
                                    <Form.Control type="number" placeholder="Años"
                                        value={specs.minimumAge} onChange={handleSpecsChange}
                                        name={"minimumAge"} />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-5" controlId="formDuration">
                                    <Form.Label>Duración aproximada de partida</Form.Label>
                                    <Form.Control type="number" placeholder="Minutos"
                                        value={specs.duration} onChange={handleSpecsChange}
                                        name={"duration"} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                type="text" placeholder="Inserta una descripción"
                                value={gameData.description} onChange={handleGameChange}
                                name={"description"} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formHowToPlay">
                            <Form.Label>Instrucciones</Form.Label>
                            {
                                gameData.howToPlay.map((elm, idx) => {
                                    return (
                                        <Form.Control type="text"
                                            className="mb-2"
                                            placeholder="Añade una instrucción"
                                            onChange={event => handleHowToPlayChange(event, idx)}
                                            value={gameData.howToPlay[idx]}
                                            key={idx} />
                                    )
                                })
                            }
                            <Button variant="dark" onClick={addHowToPlay}>
                                Añadir regla
                            </Button>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formExpansions">
                            <Form.Label>Expansiones</Form.Label>
                            {
                                gameData.expansions.map((elm, idx) => {
                                    return (
                                        <Form.Control type="text"
                                            className="mb-2"
                                            placeholder="Añade las expansiones del juego"
                                            onChange={event => handleExpansionsChange(event, idx)}
                                            value={gameData.expansions[idx]}
                                            key={idx} />
                                    )
                                })
                            }

                            <Button variant="dark" onClick={addExpansions}>
                                Añadir expansión
                            </Button>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCheckOneTime">
                            <Form.Label>¿Es de partida única?</Form.Label>
                            <Form.Check type="checkbox"
                                label="Sí, su manera de jugar o contenido implica 
                                una partida única en la vida"
                                checked={gameData.oneTimePlay} onChange={handleGameChange}
                                name={"oneTimePlay"} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formContent">
                            <Form.Label>Contenido</Form.Label>
                            {
                                gameData.content.map((elm, idx) => {
                                    return (
                                        <Form.Control type="text"
                                            className="mb-2"
                                            placeholder="Añade el contenido incluido en el juego"
                                            onChange={event => handleContentChange(event, idx)}
                                            value={gameData.content[idx]}
                                            key={idx} />
                                    )
                                })
                            }

                            <Button variant="dark" onClick={addContent}>Añadir contenido</Button>

                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Añadir juego a la colección
                        </Button>
                    </Form>
                </Col>
            </Row>

        </div>
    )
}

export default GameForm