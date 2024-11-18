import axios from "axios"
import { useState } from "react"

import { Card, Badge, Row, Col, Button, Offcanvas, Modal, ModalBody } from "react-bootstrap"
import { Trash3, Pencil } from 'react-bootstrap-icons'
import EditReviewForm from "../EditReviewForm/EditReviewForm"

const API_URL = "http://localhost:5005"

const ReviewCard = ({ author, rating, description, id, fetchReviews }) => {

    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [showEditOffcanvas, setShowEditOffcanvas] = useState(false)

    const deleteReview = e => {
        e.preventDefault()
        axios
            .delete(`${API_URL}/reviews/${id}`)
            .then(() => {
                fetchReviews()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="ReviewCard">
            <Card className='p-custom'>
                <Card.Body className="m-2">
                    <Row>
                        <Col className="d-grid gap-3">

                            <Card.Title className="my-1">
                                <Row>
                                    <Col md="6" sm="3" className="h3 text-primary">
                                        {author}
                                    </Col>
                                    <Col md="6" sm="9" className="date" >
                                        {rating}
                                    </Col>
                                </Row>

                            </Card.Title>
                            <Card.Text>
                                {description}
                            </Card.Text>

                        </Col>

                        <Col md="1" />

                        <Col md="1">
                            <div className="d-flex d-sm-grid gap-2">
                                <Button onClick={() => setShowConfirmationModal(true)} variant="custom-secondary-outline"><Trash3 /></Button>
                                <Button onClick={() => setShowEditOffcanvas(true)} variant="custom-secondary-outline"><Pencil /></Button>
                            </div>
                        </Col>

                    </Row>
                </Card.Body>

                <Card.Footer>Envíanos tu valoración</Card.Footer>

            </Card>

            <Offcanvas show={showEditOffcanvas}
                onHide={() => setShowEditOffcanvas(false)} placement="end" >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Editar planazo</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditReviewForm reviewId={id} setShowEditOffcanvas={setShowEditOffcanvas} fetchReviews={fetchReviews} />
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>¿Estas seguro?</Modal.Title>
                </Modal.Header>
                <Modal.Body> ¿Estás seguro de que quieres borrar esta review?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={deleteReview} variant="custom-primary">Sí, eliminar</Button>
                    <Button onClick={() => setShowConfirmationModal(false)} variant="custom-secondary-outline">Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReviewCard