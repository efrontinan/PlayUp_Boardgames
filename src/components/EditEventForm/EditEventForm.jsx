import axios from "axios"
import { useEffect, useState } from "react"

import { Form, Button, Toast } from "react-bootstrap"
import { formatInputDate } from "../../utils/date-utils"
import Loader from "../Loader/Loader"

const API_URL = "http://localhost:5005"

const EditEventForm = ({ eventId, setShowEditOffcanvas, fetchEvents }) => {

    const [isLoading, setIsLoading] = useState(true)

    const [eventData, setEventData] = useState({
        author: "",
        contact: "",
        date: "",
        description: "",
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

    useEffect(() => {
        fetchEventsData()
    }, [])

    const fetchEventsData = () => {
        axios
            .get(`${API_URL}/events/${eventId}`)
            .then(response => {
                const { author, contact, date, description,
                    players, address } = response.data
                setEventData({
                    author: author,
                    contact: contact,
                    date: formatInputDate(date),
                    description: description,
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
        const editEvent = {
            ...eventData,
            players: { ...playerData },
            address: { ...addressData }
        }
        axios
            .patch(`${API_URL}/events/${eventId}`, editEvent)
            .then(response => {
                // setShowToast(true)
                alert('Se han guardado los cambios')
                setShowEditOffcanvas(false)
                fetchEvents()
            })
            .catch(err => console.log(err))

    }

    return (
        isLoading ? <Loader /> :
            <div className="EditEventForm">

                <Form onSubmit={handleFormSubmit} className="vertical-form p-3">

                    <Form.Group controlId="authorField" className="mb-3">
                        <Form.Label>¿Cómo te llamas?</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduce tu nombre"
                            value={eventData.author}
                            onChange={handleEventChange}
                            name={'author'} />
                    </Form.Group>

                    <Form.Group controlId="emailField" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Indícanos un email para apuntarse"
                            value={eventData.contact}
                            onChange={handleEventChange}
                            name={'contact'} />
                    </Form.Group>

                    <Form.Group controlId="dateField" className="mb-3">
                        <Form.Label>¿Cuándo?</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            placeholder="Día/Mes/Año"
                            value={eventData.date}
                            onChange={handleEventChange}
                            name={'date'} />
                    </Form.Group>

                    <Form.Group controlId="descriptionField" className="mb-3">
                        <Form.Label>Descripción del planazo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Describe tu planazo"
                            as="textarea"
                            rows={3}
                            value={eventData.description}
                            onChange={handleEventChange}
                            name={'description'} />
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
                            type="text"
                            placeholder="Calle o avenida"
                            value={addressData.street}
                            onChange={handleAddressChange}
                            name={'street'} />
                    </Form.Group>

                    <Form.Group controlId="cityField" className="mb-3">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ciudad"
                            value={addressData.city}
                            onChange={handleAddressChange}
                            name={'city'} />
                    </Form.Group>

                    <Form.Group controlId="countryField" className="mb-3">
                        <Form.Label>País</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="País"
                            value={addressData.country}
                            onChange={handleAddressChange}
                            name={'country'} />
                    </Form.Group>

                    <Form.Group controlId="ZIPField" className="mb-3">
                        <Form.Label>Código postal</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            placeholder="Código Postal"
                            value={addressData.zipcode}
                            onChange={handleAddressChange}
                            name={'zipcode'} />
                    </Form.Group>

                    <h5 className="my-3 text-primary">¿Cuántas personas seréis?</h5>

                    <Form.Group controlId="minPlayersField" className="mb-3">
                        <Form.Label>Número mínimo de asistentes</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            placeholder="1"
                            value={playerData.min}
                            onChange={handlePlayerChange}
                            name={'min'} />
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

                    <Button variant="dark" type="submit">
                        Guardar cambios
                    </Button>

                </Form>

            </div>
    )
}

export default EditEventForm