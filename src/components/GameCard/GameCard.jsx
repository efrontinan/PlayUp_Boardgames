import { Link } from 'react-router-dom'
import { useState } from "react"

import { Button, Card, Row, Col, Badge, Stack, Offcanvas } from 'react-bootstrap'
import { Trash3, Pencil, InfoCircle } from 'react-bootstrap-icons'

import './GameCard.css'
import EditGameForm from "../../components/EditGameForm/EditGameForm"

const GameCard = ({ image, title, categories, specs, id, removeGame }) => {

    const { players } = specs
    const { min, max } = players
    const [showOfcanvas, setShowOffcanvas] = useState(false)

    return (

        <div className="GameCard">

            <Card className='p-custom' key={id} >
                <Card.Body>
                    <Row className='mb-4'>
                        <Col sm="10" lg="6">
                            <Card.Img variant="top" src={image} />
                        </Col>
                        <Col sm="10" lg="6">
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                {min}-{max} jugadores
                            </Card.Text>

                            <Stack gap={1} className='float-left wrap'>
                                {categories.map((elm, idx) => {
                                    return (

                                        <Badge bg="badge-outline-primary" key={idx} className='fit-content'>{elm}</Badge>
                                    )
                                })}
                            </Stack>
                        </Col>
                    </Row>


                    <Stack direction="horizontal" gap={1} className='m-0'>
                        <Button as={Link} to={`/juegos/detalles/${id}`} variant="custom-transparent" className='me-auto'> <InfoCircle />   Ver detalles</Button>
                        <Button onClick={() => removeGame(id)} variant="custom-secondary-outline"><Trash3 /></Button>
                        <Button onClick={() => setShowOffcanvas(true)} variant="custom-secondary-outline"><Pencil /></Button>
                    </Stack>

                </Card.Body>
            </Card>

            <Offcanvas show={showOfcanvas} onHide={() => setShowOffcanvas(false)} placement="end" >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Añadir juego </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditGameForm gameId={id} />
                </Offcanvas.Body>
            </Offcanvas>

        </div>

    )
}

export default GameCard