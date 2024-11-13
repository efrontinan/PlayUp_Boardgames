import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Form, Button } from "react-bootstrap"

const API_URL = "http://localhost:5005"

const EditEventForm = () => {

    const { eventId } = useParams()

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

    const formatInputDate = (dateData) => {
        const date = new Date(dateData)
        return date.toISOString().slice(0, 16)
    }

    useEffect(() => {
        fetchEventsData()
    }, [])

    const fetchEventsData = () => {
        axios
            .get(`${API_URL}/events/${eventId}`)
            .then(response => {
                const { author, contact, date, description, players, address } = response.data
                console.log(date)
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
        const newEvent = {
            ...eventData,
            players: { ...playerData },
            address: { ...addressData }
        }
        axios
            .patch(`${API_URL}/events/${eventId}`, newEvent)
            .then(() => alert("editao"))
            .catch(err => console.log(err))
    }

    return (
        <div className="EditEventForm">
            <h1>EDITO EL EVENTO DE</h1>
            <Form onSubmit={handleFormSubmit}>
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
                    <Form.Label>Descripción del evento</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Describe tu evento"
                        as="textarea" rows={3}
                        value={eventData.description}
                        onChange={handleEventChange}
                        name={'description'} />
                </Form.Group>

                <h5>Introduce la dirección</h5>

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
                        placeholder="Código Postal"
                        value={addressData.zipcode}
                        onChange={handleAddressChange}
                        name={'zipcode'} />
                </Form.Group>

                <h5>¿Cuántas personas seréis?</h5>

                <Form.Group controlId="minPlayersField" className="mb-3">
                    <Form.Label>Número mínimo de asistentes</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="0"
                        value={playerData.min}
                        onChange={handlePlayerChange}
                        name={'min'} />
                </Form.Group>

                <Form.Group controlId="maxPlayersFields" className="mb-3">
                    <Form.Label>Número máximo de asistentes</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="0"
                        value={playerData.max}
                        onChange={handlePlayerChange}
                        name={'max'} />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Editar evento
                </Button>
            </Form>
        </div>
    )
}

export default EditEventForm