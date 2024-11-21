import { Link } from 'react-router-dom'
import { useContext, useState } from "react"

import { Button, Card, Row, Col, Badge, Stack, Offcanvas, Modal } from 'react-bootstrap'
import { Trash3, Pencil, InfoCircle } from 'react-bootstrap-icons'

import './GameCard.css'
import EditGameForm from "../../components/EditGameForm/EditGameForm"
import { AuthContext } from '../../contexts/auth.context'

const GameCard = ({ image, title, categories, specs, id, removeGame }) => {

    const { players } = specs
    const { min, max } = players
    const [showOfcanvas, setShowOffcanvas] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const { loggedAdmin } = useContext(AuthContext)

    return (

        <div className="GameCard">

            <Card className='p-custom text-pop-up-top' key={id} >
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
                        {loggedAdmin && <Button onClick={() => setShowDeleteModal(true)} variant="custom-secondary-outline"><Trash3 /></Button>}
                        {loggedAdmin && <Button onClick={() => setShowOffcanvas(true)} variant="custom-secondary-outline"><Pencil /></Button>}
                    </Stack>

                </Card.Body>
            </Card>

            <Offcanvas show={showOfcanvas} onHide={() => setShowOffcanvas(false)} placement="end" >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Añadir juego </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditGameForm gameId={id} setShowOffcanvas={setShowOffcanvas} />
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Advertencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro/a de que quieres eliminar este juego?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => removeGame(id)}>
                        Sí
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default GameCard