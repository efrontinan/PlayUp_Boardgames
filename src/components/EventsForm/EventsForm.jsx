import { useState } from "react"
import { Form, Button } from "react-bootstrap"


const EventsForm = ({ gameId }) => {

    const [eventData, setEventData] = useState({
        author: "",
        contact: "",
        date: "",
        description: "",
        contact: ""
    })

    const handleEventChange = e => {

        const { name, value } = e.target
        setEventData({...eventData, [name]: value })
    }


    return (
        <Form>
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
                    value={eventData.email}
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
                <Form.Control type="text" placeholder="Por ejemplo: Bar La Manuela" />
            </Form.Group>

            <Form.Group controlId="streetField" className="mb-3">
                <Form.Label>Calle</Form.Label>
                <Form.Control type="text" placeholder="Calle o avenida" />
            </Form.Group>

            <Form.Group controlId="cityField" className="mb-3">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control type="text" placeholder="Ciudad" />
            </Form.Group>

            <Form.Group controlId="countryField" className="mb-3">
                <Form.Label>País</Form.Label>
                <Form.Control type="text" placeholder="País" />
            </Form.Group>

            <Form.Group controlId="ZIPField" className="mb-3">
                <Form.Label>Código postal</Form.Label>
                <Form.Control type="number" placeholder="Código Postal" />
            </Form.Group>

            <h5>¿Cuántas personas seréis?</h5>

            <Form.Group controlId="minPlayersField" className="mb-3">
                <Form.Label>Número mínimo de asistentes</Form.Label>
                <Form.Control type="number" placeholder="0" />
            </Form.Group>

            <Form.Group controlId="maxPlayersFields" className="mb-3">
                <Form.Label>Número máximo de asistentes</Form.Label>
                <Form.Control type="number" placeholder="0" />
            </Form.Group>

            <Button variant="dark" type="submit">
                Crear evento
            </Button>
        </Form>
    )

}

export default EventsForm