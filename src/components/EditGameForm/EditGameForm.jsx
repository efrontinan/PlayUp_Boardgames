import axios from "axios"
import { useContext, useEffect, useState } from "react"

import { Button, Row, Col, Form } from "react-bootstrap"
import { XLg } from "react-bootstrap-icons"

import Loader from "../Loader/Loader"
import { UserMessageContext } from "../../contexts/userMessage.context"


const API_URL = import.meta.env.VITE_APP_API_URL

const EditGameForm = ({ gameId, setShowOffcanvas, fetchGames }) => {

    const { createAlert } = useContext(UserMessageContext)

    const [isLoading, setIsLoading] = useState(true)
    const [validated, setValidated] = useState(false)

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
        const form = e.target
        if (form.checkValidity() === false) {
            e.stopPropagation()
            setValidated(true)
            return
        }

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
                createAlert('Juego editado', `/juegos/detalles/${response.data.id}`)
                setShowOffcanvas(false)
                fetchGames()
            })
            .catch(err => console.log(err))
    }

    return (isLoading ? <Loader /> :
        <div className="EditGameForm">

            <Form
                noValidate
                validated={validated}
                onSubmit={handleFormSubmit}
                className="vertical-form p-3">

                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>¿Cómo se llama el juego?</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Introduce el nombre del juego"
                        value={gameData.title}
                        onChange={handleGameChange}
                        name={"title"} />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label>Imagen del juego</Form.Label>
                    <Form.Control
                        required
                        type="url"
                        placeholder="Inserta el URL de la imagen"
                        value={gameData.image}
                        onChange={handleGameChange}
                        name={"image"} />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categorías</Form.Label>
                    {
                        gameData.categories.map((elm, idx) => {
                            return (
                                <Row key={`category-${idx}`} className="mb-2">
                                    <Col md="11">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Categoría"
                                            onChange={e => handleCategoriesChange(e, idx)}
                                            value={elm}
                                            id={`formCategories-${idx}`}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es obligatorio
                                        </Form.Control.Feedback>
                                    </Col>

                                    <Col md="1">
                                        <Button
                                            variant="custom-secondary-outline"
                                            onClick={() => deleteCategoryItem(idx)}
                                            disabled={gameData.categories.length <= 1}
                                            size="sm"
                                        >
                                            <XLg />
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        })
                    }

                    <Button variant="custom-transparent" onClick={addCategory} size="sm" className="mt-3">
                        Añadir categoría
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPlayers">
                    <Form.Label>Introduce los datos de jugador</Form.Label>
                    <Row>
                        <Col sm="6" md="4">
                            <Form.Label className="d-none">Número mínimo de jugadores</Form.Label>
                            <Form.Text className="text-muted"> Número mínimo </Form.Text>
                            <Form.Control
                                required
                                type="number"
                                min={1}
                                placeholder="1"
                                value={players.min}
                                onChange={handlePlayersChange}
                                name={"min"} />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                        </Col>

                        <Col sm="6" md="4">
                            <Form.Label className="d-none">Número máximo de jugadores</Form.Label>
                            <Form.Text className="text-muted"> Número máximo </Form.Text>
                            <Form.Control
                                required
                                type="number"
                                min={1}
                                placeholder="1"
                                value={players.max}
                                onChange={handlePlayersChange}
                                name={"max"} />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                        </Col>

                        <Col sm="6" md="4">
                            <Form.Label className="d-none">Edad mínima</Form.Label>
                            <Form.Text className="text-muted">Edad mínima</Form.Text>
                            <Form.Control
                                required
                                type="number"
                                min={0}
                                placeholder="Años"
                                value={specs.minimumAge}
                                onChange={handleSpecsChange}
                                name={"minimumAge"} />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        type="text"
                        placeholder="Inserta una descripción"
                        value={gameData.description}
                        onChange={handleGameChange}
                        name={"description"} />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-5" controlId="formDuration">
                    <Form.Label>Duración aproximada de partida en minutos</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min={0}
                        placeholder="Minutos"
                        value={specs.duration}
                        onChange={handleSpecsChange}
                        name={"duration"} />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Instrucciones</Form.Label>
                    {
                        gameData.howToPlay.map((elm, idx) => {
                            return (

                                <Row key={idx}>
                                    <Col md="11">
                                        <Form.Control
                                            required
                                            type="text"
                                            className="mb-2"
                                            placeholder="Añade una instrucción"
                                            onChange={e => handleHowToPlayChange(e, idx)}
                                            value={elm}
                                            id={`formInstructions-${idx}`}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es obligatorio
                                        </Form.Control.Feedback>
                                    </Col>

                                    <Col md="1">
                                        <Button
                                            variant="custom-secondary-outline"
                                            onClick={() => deleteHowToPlayItem(idx)}
                                            size="sm"
                                            disabled={gameData.howToPlay.length <= 1}
                                        >
                                            <XLg />
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                    <Button variant="custom-transparent" onClick={addHowToPlay} size="sm" className="mt-3">
                        Añadir regla
                    </Button>

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Expansiones </Form.Label>
                    {
                        gameData.expansions.map((elm, idx) => {
                            return (

                                <Row key={idx}>
                                    <Col md="11">
                                        <Form.Control
                                            type="text"
                                            className="mb-2"
                                            placeholder="Añade las expansiones del juego"
                                            onChange={e => handleExpansionsChange(e, idx)}
                                            value={elm}
                                            id={`formExpansions-${idx}`} />
                                    </Col>

                                    <Col md="1">
                                        <Button
                                            variant="custom-secondary-outline"
                                            onClick={() => deleteExpansionsItem(idx)}
                                            size="sm"
                                            disabled={gameData.expansions.length <= 1}>
                                            <XLg />
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        })
                    }

                    <Button variant="custom-transparent" onClick={addExpansions} size="sm" className="mt-3">
                        Añadir expansión
                    </Button>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formCheckOneTime">
                    <Form.Label>¿Puedes jugarlo sólo una vez?</Form.Label>
                    <Form.Check type="checkbox"
                        label="Sí, su manera de jugar o contenido implica 
                                una partida única"
                        checked={gameData.oneTimePlay} onChange={handleGameChange}
                        name={"oneTimePlay"} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contenido</Form.Label>
                    {
                        gameData.content.map((elm, idx) => {
                            return (

                                <Row key={idx} >
                                    <Col md="11">
                                        <Form.Control
                                            required
                                            type="text"
                                            className="mb-2"
                                            placeholder="Añade el contenido incluido en el juego"
                                            onChange={e => handleContentChange(e, idx)}
                                            value={elm}
                                            id={`formContent-${idx}`} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es obligatorio
                                        </Form.Control.Feedback>
                                    </Col>

                                    <Col md="1">
                                        <Button
                                            variant="custom-secondary-outline"
                                            size="sm"
                                            disabled={gameData.content.length <= 1}
                                            onClick={() => deleteContentItem(idx)}
                                        >
                                            <XLg />
                                        </Button>
                                    </Col>
                                </Row>

                            )
                        })
                    }
                    <Button variant="custom-transparent"
                        onClick={addContent} size="sm" className="mt-3">Añadir contenido
                    </Button>

                </Form.Group>

                <Button variant="custom-primary" type="submit">
                    Guardar cambios
                </Button>

            </Form>
        </div >
    )
}

export default EditGameForm