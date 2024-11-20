import axios from "axios"
import { useEffect, useState, useContext } from "react"

import { UserMessageContext } from "../../contexts/userMessage.context"

import { Form, Button, Toast } from "react-bootstrap"
import { formatInputDate } from "../../utils/date-utils"
import Loader from "../Loader/Loader"

const API_URL = "http://localhost:5005"

const EditEventForm = ({ eventId, setShowEditOffcanvas, fetchEvents }) => {

    const {createAlert} = useContext(UserMessageContext)

    const [isLoading, setIsLoading] = useState(true)

    const [eventData, setEventData] = useState({
        author: "",
        contact: "",
        date: "",
        description: "",
        gameId: "",
    })

    const [addressData, setAddress] = useState({
        country: "",
        city: "",
        street: "",
        name: "",
        zipcode: 0
    })

    const [playerData, setPlayer] = useState({
        min: 0,
        max: 0
    })

    const [validated, setValidated] = useState(false)

    useEffect(() => {
        fetchEventsData()
    }, [])

    const fetchEventsData = () => {
        axios
            .get(`${API_URL}/events/${eventId}`)
            .then(response => {
                const { author, contact, date, description,
                    players, address, gameId } = response.data
                setEventData({
                    author: author,
                    contact: contact,
                    date: formatInputDate(date),
                    description: description,
                    gameId: gameId
                })
                setAddress({
                    country: address.country,
                    city: address.city,
                    street: address.street,
                    name: address.name,
                    zipcode: address.zipcode
                })
                setPlayer({
                    min: players.min,
                    max: players.max
                })
                setIsLoading(false)
            })
    }

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
            return
        }

        const editEvent = {
            ...eventData,
            players: { ...playerData },
            address: { ...addressData }
        }
        axios
            .patch(`${API_URL}/events/${eventId}`, editEvent)
            .then(response => {
                createAlert('Evento editado', `/juegos/detalles/${response.data.gameId}`)
                setShowEditOffcanvas(false)
                fetchEvents()
                setValidated(false)

            })
            .catch(err => console.log(err))

    }

    return (
        isLoading ? <Loader /> :
            <div className="EditEventForm">

                <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="vertical-form p-3">

                    <Form.Group controlId="authorField" className="mb-3">
                        <Form.Label>¿Cómo te llamas?</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Introduce tu nombre"
                            value={eventData.author}
                            onChange={handleEventChange}
                            name={'author'} />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="emailField" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Indícanos un email para apuntarse"
                            value={eventData.contact}
                            onChange={handleEventChange}
                            name={'contact'} />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="dateField" className="mb-3">
                        <Form.Label>¿Cuándo?</Form.Label>
                        <Form.Control
                            required
                            type="datetime-local"
                            placeholder="Día/Mes/Año"
                            value={eventData.date}
                            onChange={handleEventChange}
                            name={'date'} />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
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

                    <Form.Group controlId="streetField" className="mb-3">
                        <Form.Label>Calle</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Calle o avenida"
                            value={addressData.street}
                            onChange={handleAddressChange}
                            name={'street'} />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="maxPlayersFields" className="mb-3">
                        <Form.Label>Número máximo de asistentes</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            min={1}
                            placeholder="1"
                            value={playerData.max}
                            onChange={handlePlayerChange}
                            name={'max'} />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="custom-primary" type="submit">
                        Guardar cambios
                    </Button>

                </Form>

            </div>
    )
}

export default EditEventForm