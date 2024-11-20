import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Form, Button } from "react-bootstrap"
import { UserMessageContext } from '../../contexts/userMessage.context'

const API_URL = "http://localhost:5005"

const CreateEventsForm = ({ closeCreateModal }) => {

    const { createAlert } = useContext(UserMessageContext)

    const { gameId } = useParams()

    const [gameData, setGameData] = useState([])

    useEffect(() => {
        fetchGameDetails()
    }, [])

    const fetchGameDetails = () => {
        axios
            .get(`${API_URL}/games`)
            .then(response => setGameData(response.data))
            .catch(err => console.log(err))
    }

    const [eventData, setEventData] = useState({
        author: "",
        contact: "",
        date: "",
        description: "",
        gameId: gameId,
    })

    const [addressData, setAddress] = useState({
        country: "",
        city: "",
        street: "",
        name: "",
        zipcode: 0,
        label: "",
        lat: "",
        lng: ""
    })

    const [addressValue, setAddressValue] = useState({})

    useEffect(() => {
        handleAutocomplete()
    }, [addressValue])

    const handleAutocomplete = () => {

        addressValue?.label && geocodeByAddress(addressValue?.label)
            .then(([addressDetails]) => {
                return getLatLng(addressDetails)
            })
            .then((coordinates) => {
                setAddress({ ...addressData, label: addressValue?.label, lat: coordinates.lat, lng: coordinates.lng })
            })
            .catch(error => console.error(error))
    }

    const [playerData, setPlayer] = useState({
        min: 0,
        max: 0
    })

    const [validated, setValidated] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const handleEventChange = e => {

        const { name, value } = e.target
        setEventData({ ...eventData, [name]: value })
    }

    const handleAddressChange = e => {
        const { name, value } = e.target
        setAddress({ ...addressData, [name]: value })
    }

    const handlePlayerChange = e => {
        const { name, value } = e.target
        setPlayer({ ...playerData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()
        const form = e.target

        if (form.checkValidity() === false) {
            e.stopPropagation()
            setValidated(true)
            console.log('No estoy completo')
            return
        }

        const newEvent = {
            ...eventData,
            players: playerData,
            address: addressData
        }

        axios
            .post(`${API_URL}/events`, newEvent)
            .then(() => {
                createAlert("Evento creado", `juegos/detalles/${response.data.gameId}`)
                setValidated(false)
                closeCreateModal()
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="CreateEventsForm">

            <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="vertical-form p-3">

                {!gameId && <Form.Group controlId="gameIdField" className="mb-3">
                    <Form.Label>Elige el juego</Form.Label>
                    <Form.Select onChange={handleEventChange} name={"gameId"}>
                        {gameData.map(elm => {
                            return (
                                <option value={elm.id} key={elm.id} >{elm.title}</option>
                            )
                        })}
                    </Form.Select>

                </Form.Group>}

                <Form.Group controlId="authorField" className="mb-3">
                    <Form.Label>¿Cómo te llamas?</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Introduce tu nombre"
                        value={eventData.author}
                        onChange={handleEventChange}
                        name={'author'}
                    />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="contactField" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Indícanos un email para apuntarse"
                        value={eventData.contact}
                        onChange={handleEventChange}
                        name={'contact'}
                    />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="dateField" className="mb-3">
                    <Form.Label>¿Cuándo?</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        placeholder="Día/Mes/Año"
                        value={eventData.date}
                        onChange={handleEventChange}
                        name={'date'}
                    />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="descriptionField" className="mb-3">
                    <Form.Label>Descripción del planazo</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Describe tu planazo"
                        as="textarea"
                        rows={3}
                        value={eventData.description}
                        onChange={handleEventChange}
                        name={'description'} />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>

                <h5 className="my-3 text-primary">Introduce la dirección</h5>

                <Form.Group controlId="directionNametField" className="mb-3">
                    <Form.Label>¿Tiene un nombre el local?</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Por ejemplo: Bar La Manuela"
                        value={addressData.name}
                        onChange={handleAddressChange}
                        name={'name'} />
                </Form.Group>

                <Form.Group controlId="autocompleteAddress" className="mb-3 places-input">
                    <GooglePlacesAutocomplete
                        selectProps={{
                            addressValue,
                            placeholder: "Buscar dirección...",
                            onChange: setAddressValue
                        }}
                        apiKey="AIzaSyDKOESwdtbPID8SoPVI_cK9Wq7dxPmd3D4"
                    />
                </Form.Group>

                <Form.Group controlId="streetField" className="mb-3">
                    <Form.Label>Calle</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Calle o avenida"
                        value={addressData.street}
                        onChange={handleAddressChange}
                        name={'street'} />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="cityField" className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Ciudad"
                        value={addressData.city}
                        onChange={handleAddressChange}
                        name={'city'} />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="countryField" className="mb-3">
                    <Form.Label>País</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="País"
                        value={addressData.country}
                        onChange={handleAddressChange}
                        name={'country'} />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="ZIPField" className="mb-3">
                    <Form.Label>Código postal</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min={0}
                        placeholder="Código Postal"
                        value={addressData.zipcode}
                        onChange={handleAddressChange}
                        name={'zipcode'} />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>

                <h5 className="my-3 text-primary">¿Cuántas personas seréis?</h5>

                <Form.Group controlId="minPlayersField" className="mb-3">
                    <Form.Label>Número mínimo de asistentes</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min={1}
                        placeholder="1"
                        value={playerData.min}
                        onChange={handlePlayerChange}
                        name={'min'} />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="maxPlayersFields" className="mb-3">
                    <Form.Label>Número máximo de asistentes</Form.Label>
                    <Form.Control
                        type="number"
                        min={1}
                        placeholder="1"
                        value={playerData.max}
                        onChange={handlePlayerChange}
                        name={'max'} />
                </Form.Group>


                <Button variant="custom-primary" type="submit">
                    Crear planazo
                </Button>

            </Form>

        </div>
    )

}

export default CreateEventsForm