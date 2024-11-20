import axios from "axios"
import { useEffect, useState } from "react"

import { Col, Row, Button, Offcanvas } from "react-bootstrap"

import Loader from "../Loader/Loader"
import { useParams } from "react-router-dom"
import ReviewCard from "../ReviewCard/ReviewCard"
import CreateReviewForm from "../CreateReviewForm/CreateReviewForm"

const API_URL = "http://localhost:5005"

const ReviewsList = ({ updateRating }) => {

    const { gameId } = useParams()

    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [showCreateModal, setShowCreateModal] = useState(false)

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = () => {
        axios
            .get(`${API_URL}/reviews?gameId=${gameId}`)
            .then(response => {
                setReviews(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="ReviewsList">

                <Row >
                    <Col xs="6" md="8">
                        <h1>Reviews({reviews.length})</h1>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button
                            variant="custom-transparent"
                            onClick={() => setShowCreateModal(true)}
                        >
                            Añadir review
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {reviews.length === 0 ? <p className="my-3">Aún no hay reviews. ¡Comparte tu experiencia con otros!</p> :
                        reviews.map(elm => {
                            return (
                                <Col lg={reviews.length > 1 ? 6 : 12} key={elm.id}>
                                    <ReviewCard {...elm} key={elm.id} fetchReviews={fetchReviews} updateRating={updateRating} />
                                </Col>
                            )
                        })
                    }
                </Row>

                <Offcanvas show={showCreateModal} onHide={() => setShowCreateModal(false)} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Añadir review</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <CreateReviewForm closeCreateModal={() => { setShowCreateModal(false), fetchReviews() }} updateRating={updateRating} />
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
    )

}

export default ReviewsList