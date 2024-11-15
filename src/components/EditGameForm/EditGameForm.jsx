import { useEffect, useState } from "react"

import Form from 'react-bootstrap/Form'
import { Button, Row, Col } from "react-bootstrap"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../Loader/Loader"


const API_URL = "http://localhost:5005"

const GameForm = ({gameId}) => {

    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

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

    useEffect(() => {
        fetchGameData()
    }, [])

    const fetchGameData = () => {
        axios
            .get(`${API_URL}/games/${gameId}`)
            .then(response => {

                const {
                    title,
                    image,
                    categories,
                    description,
                    howToPlay,
                    expansions,
                    oneTimePlay,
                    content,
                    specs
                } = response.data

                setGameData({
                    title,
                    image,
                    categories,
                    description,
                    howToPlay,
                    expansions,
                    oneTimePlay,
                    content
                })

                setSpecs({
                    minimumAge: specs.minimumAge,
                    duration: specs.duration
                })

                setPlayers({
                    min: specs.players.min,
                    max: specs.players.max
                })
                setIsLoading(false)

            })
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

    const deleteCategoryItem = (idx) => {
        const newCategories = [...gameData.categories]
        if (newCategories.length > 1) {
            newCategories.splice(idx, 1)
            setGameData({ ...gameData, categories: newCategories })
        }
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

    const deleteHowToPlayItem = (idx) => {
        const newHowToPlay = [...gameData.howToPlay]
        if (newHowToPlay.length > 1) {
            newHowToPlay.splice(idx, 1)
            setGameData({ ...gameData, howToPlay: newHowToPlay })
        }
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

    const deleteExpansionsItem = (idx) => {
        const newExpansions = [...gameData.expansions]
        if (newExpansions.length > 1) {
            newExpansions.splice(idx, 1)
            setGameData({ ...gameData, expansions: newExpansions })
        }
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

    const deleteContentItem = (idx) => {
        const newContent = [...gameData.content]
        if (newContent.length > 1) {
            newContent.splice(idx, 1)
            setGameData({ ...gameData, content: newContent })
        }
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        const reqPayLoadSpecs = {
            ...specs,
            players: players
        }

        const newGame = {
            ...gameData,
            specs: reqPayLoadSpecs
        }

        axios
            .put(`${API_URL}/games/${gameId}`, newGame)
            .then(response => {
                navigate(`/juegos/detalles/${response.data.id}`)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="GameForm">

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

                    <Form.Group className="mb-3">
                        <Row>
                            <Form.Label>Categorías <hr />
                                {
                                    gameData.categories.map((elm, idx) => {
                                        return (
                                            <Row key={`category-${idx}`}>
                                                <Col md={{ span: 9 }}>
                                                    <Form.Control type="text"
                                                        className="mb-2"
                                                        placeholder="Categoría"
                                                        onChange={e => handleCategoriesChange(e, idx)}
                                                        value={elm}
                                                        id={`formCategories-${idx}`}
                                                    />
                                                </Col>

                                                <Col>

                                                    <Button variant="danger"
                                                        onClick={() => deleteCategoryItem(idx)}
                                                        disabled={gameData.categories.length <= 1}>
                                                        Eliminar
                                                    </Button>

                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Form.Label>
                        </Row>
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

                    <Form.Group className="mb-3">
                        <Row>
                            <Form.Label>Instrucciones <hr />
                                {
                                    gameData.howToPlay.map((elm, idx) => {
                                        return (
                                            <Row key={idx}>
                                                <Col md={{ span: 9 }}>
                                                    <Form.Control type="text"
                                                        className="mb-2"
                                                        placeholder="Añade una instrucción"
                                                        onChange={e => handleHowToPlayChange(e, idx)}
                                                        value={elm}
                                                        id={`formInstructions-${idx}`}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Button variant="danger"
                                                        onClick={() => deleteHowToPlayItem(idx)}
                                                        disabled={gameData.howToPlay.length <= 1}>
                                                        Eliminar
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Form.Label>
                            <Button variant="dark" onClick={addHowToPlay}>
                                Añadir regla
                            </Button>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Row>
                            <Form.Label>Expansiones <hr />
                                {
                                    gameData.expansions.map((elm, idx) => {
                                        return (
                                            <Row key={idx}>
                                                <Col md={{ span: 9 }}>
                                                    <Form.Control type="text"
                                                        className="mb-2"
                                                        placeholder="Añade las expansiones del juego"
                                                        onChange={e => handleExpansionsChange(e, idx)}
                                                        value={elm}
                                                        id={`formExpansions-${idx}`} />
                                                </Col>
                                                <Col>
                                                    <Button variant="danger"
                                                        onClick={() => deleteExpansionsItem(idx)}
                                                        disabled={gameData.expansions.length <= 1}>
                                                        Eliminar
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Form.Label>
                        </Row>
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

                    <Form.Group className="mb-3">
                        <Row>
                            <Form.Label>Contenido <hr />
                                {
                                    gameData.content.map((elm, idx) => {
                                        return (
                                            <Row key={idx} >
                                                <Col md={{ span: 9 }}>
                                                    <Form.Control type="text"
                                                        className="mb-2"
                                                        placeholder="Añade el contenido incluido en el juego"
                                                        onChange={e => handleContentChange(e, idx)}
                                                        value={elm}
                                                        id={`formContent-${idx}`}
                                                    />
                                                </Col>

                                                <Col>
                                                    <Button variant="danger"
                                                        onClick={() => deleteContentItem(idx)}
                                                        disabled={gameData.content.length <= 1}>
                                                        Eliminar
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Form.Label>
                        </Row>
                        <Button variant="dark"
                            onClick={addContent}>Añadir contenido
                        </Button>

                    </Form.Group>

                    <Button variant="dark" type="submit">
                        Guardar cambios
                    </Button>
                </Form>
            </div >
    )
}

export default GameForm