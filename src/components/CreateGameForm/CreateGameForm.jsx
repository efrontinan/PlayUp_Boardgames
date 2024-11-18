import "./CreateGameForm.css"

import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button, Row, Col, Form, Toast, ToastContainer } from "react-bootstrap"
import { XLg } from "react-bootstrap-icons"


const API_URL = "http://localhost:5005"

const CreateGameForm = () => {

    const navigate = useNavigate()

    // const [showCategoriesToast, setShowCategoriesToast] = useState(false)
    // const [showHowToPlayToast, setShowHowToPlayToast] = useState(false)
    // const [showContentToast, setShowContentToast] = useState(false)
    const [showPostToast, setShowPostToast] = useState(false)

    const [isFormValid, setIsFormValid] = useState(false)

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
    })

    const [players, setPlayers] = useState({
        min: 0,
        max: 0
    })

    const handleGameChange = e => {
        const { name, value, checked, type } = e.target
        const result = type === "checkbox" ? checked : value
        setGameData(prevData => {
            const newData = { ...prevData, [name]: result }
            checkFormValidity()
            return newData
        })
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
        setGameData(prevData => {
            const categoriesCopy = [...prevData.categories]
            categoriesCopy[idx] = value
            const newData = { ...prevData, categories: categoriesCopy }
            checkFormValidity()
            return newData
        })
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
        setGameData(prevData => {
            const howToPlayCopy = [...prevData.howToPlay]
            howToPlayCopy[idx] = value
            const newData = { ...prevData, howToPlay: howToPlayCopy }
            checkFormValidity()
            return newData
        })
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
        setGameData(prevData => {
            const contentCopy = [...prevData.content]
            contentCopy[idx] = value
            const newData = { ...prevData, content: contentCopy }
            checkFormValidity()
            return newData
        })

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

    const checkFormValidity = () => {
        const isValid =
            gameData.title.length > 0 &&
            gameData.image.length > 0 &&
            gameData.categories.some(elm => elm.length > 0) &&
            gameData.description.length > 0 &&
            gameData.howToPlay.some(elm => elm.length > 0) &&
            gameData.content.some(elm => elm.length > 0)
        console.log(isValid)
        setIsFormValid(isValid)
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        const reqPayLoadSpecs = {
            ...specs,
            players: players
        }

        const reqPayLoad = {
            ...gameData,
            specs: reqPayLoadSpecs
        }

        // if (gameData.categories.length === 1 && gameData.categories[0] === "") {
        //     setShowCategoriesToast(true)
        //     return
        // }

        // if (gameData.howToPlay.length === 1 && gameData.howToPlay[0] === "") {
        //     setShowHowToPlayToast(true)
        //     return
        // }

        // if (gameData.content.length === 1 && gameData.content[0] === "") {
        //     setShowContentToast(true)
        //     return
        // }

        axios
            .post(`${API_URL}/games`, reqPayLoad)
            .then(response => {
                setShowPostToast(true)
                navigate(`/juegos/detalles/${response.data.id}`)
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="CreateGameForm">

            <Form onSubmit={handleFormSubmit} className="vertical-form p-3">

                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>¿Cómo se llama el juego?</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Introduce el nombre del juego"
                        value={gameData.title}
                        onChange={handleGameChange}
                        name={"title"}
                    />
                    <Form.Text className="text-muted">
                        ¡Añade un juego divertido!
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label>Imagen del juego</Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Inserta el URL de la imagen"
                        value={gameData.image}
                        onChange={handleGameChange}
                        name={"image"}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categorías</Form.Label>
                    {
                        gameData.categories.map((elm, idx) => {
                            return (
                                <Row key={`category-${idx}`} className="mb-2">
                                    <Col md="11">
                                        <Form.Control
                                            type="text"
                                            placeholder="Categoría"
                                            onChange={e => handleCategoriesChange(e, idx)}
                                            value={elm}
                                            id={`formCategories-${idx}`}
                                        />
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

                    <Button variant="custom-transparent"
                        onClick={addCategory} size="sm" className="mt-3">
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
                                type="number"
                                min={1}
                                placeholder="1"
                                value={players.min}
                                onChange={handlePlayersChange}
                                name={"min"}
                            />
                        </Col>

                        <Col sm="6" md="4">
                            <Form.Label className="d-none">Número máximo de jugadores</Form.Label>
                            <Form.Text className="text-muted"> Número máximo </Form.Text>
                            <Form.Control
                                type="number"
                                min={1}
                                placeholder="1"
                                value={players.max}
                                onChange={handlePlayersChange}
                                name={"max"}
                            />
                        </Col>
                        <Col sm="6" md="4">
                            <Form.Label className="d-none">Edad mínima</Form.Label>
                            <Form.Text className="text-muted">Edad mínima</Form.Text>
                            <Form.Control
                                type="number"
                                min={0}
                                placeholder="Años"
                                value={specs.minimumAge}
                                onChange={handleSpecsChange}
                                name={"minimumAge"}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        placeholder="Inserta una descripción"
                        value={gameData.description}
                        onChange={handleGameChange}
                        name={"description"}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDuration">
                    <Form.Label>Duración aproximada de partida en minutos</Form.Label>
                    <Form.Control
                        type="number"
                        min={0}
                        placeholder="Minutos"
                        value={specs.duration}
                        onChange={handleSpecsChange}
                        name={"duration"}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label> Instrucciones </Form.Label>
                    {
                        gameData.howToPlay.map((elm, idx) => {
                            return (

                                <Row key={idx}>
                                    <Col md="11">
                                        <Form.Control
                                            type="text"
                                            className="mb-2"
                                            placeholder="Añade una instrucción"
                                            onChange={e => handleHowToPlayChange(e, idx)}
                                            value={elm}
                                            id={`formInstructions-${idx}`}
                                        />
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
                    <Form.Check
                        type="checkbox"
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
                                            type="text"
                                            className="mb-2"
                                            placeholder="Añade el contenido incluido en el juego"
                                            onChange={e => handleContentChange(e, idx)}
                                            value={elm}
                                            id={`formContent-${idx}`}
                                        />
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
                        onClick={addContent}
                        size="sm"
                        className="mt-3">
                        Añadir contenido
                    </Button>

                </Form.Group>

                <Button
                    variant="custom-primary"
                    type="submit"
                    disabled={!isFormValid}>
                    Añadir juego a la colección
                </Button>

            </Form>

            {/* <ToastContainer position="middle-center">
                <Toast onClose={() => setShowCategoriesToast(false)} show={showCategoriesToast} delay={3000}>
                    <Toast.Header closeButton={true}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Aviso</strong>
                    </Toast.Header>
                    <Toast.Body>Tienes que añadir al menos una categoría</Toast.Body>
                </Toast>
            </ToastContainer>

            <ToastContainer position="middle-center">
                <Toast onClose={() => setShowHowToPlayToast(false)} show={showHowToPlayToast} delay={3000}>
                    <Toast.Header closeButton={true}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Aviso</strong>
                    </Toast.Header>
                    <Toast.Body>Tienes que añadir al menos una instrucción</Toast.Body>
                </Toast>
            </ToastContainer>

            <ToastContainer position="middle-center">
                <Toast onClose={() => setShowContentToast(false)} show={showContentToast} delay={3000}>
                    <Toast.Header closeButton={true}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Aviso</strong>
                    </Toast.Header>
                    <Toast.Body>Tienes que añadir al menos un contenido</Toast.Body>
                </Toast>
            </ToastContainer> */}

            <ToastContainer position="middle-center">
                <Toast onClose={() => setShowPostToast(false)} show={showPostToast} delay={3000}>
                    <Toast.Header closeButton={true}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">¡Éxito!</strong>
                    </Toast.Header>
                    <Toast.Body>El juego se ha añadido correctamente a la colección</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default CreateGameForm