import axios from "axios"
import { useEffect, useState, useContext } from "react"
import Loader from "../Loader/Loader"

import { Form, Button } from "react-bootstrap"

import { UserMessageContext } from "../../contexts/userMessage.context"

const API_URL = "http://localhost:5005"

const EditReviewForm = ({ reviewId, setShowEditOffcanvas, fetchReviews }) => {

    const { createAlert } = useContext(UserMessageContext)

    const [isLoading, setIsLoading] = useState(true)

    const [reviewData, setReviewData] = useState({
        author: "",
        rating: 0,
        description: ""
    })

    const [validated, setValidated] = useState(false)

    useEffect(() => {
        fetchReviewsData()
    }, [])

    const fetchReviewsData = () => {
        axios
            .get(`${API_URL}/reviews/${reviewId}`)
            .then(response => {
                const { author, rating, description } = response.data
                setReviewData(
                    {
                        author: author,
                        rating: rating,
                        description: description
                    }
                )
                setIsLoading(false)
            })
    }

    const handleReviewChange = e => {
        const { name, value } = e.target
        setReviewData({ ...reviewData, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        const form = e.target
        if (form.checkValidity() === false) {
            e.stopPropagation()
            setValidated(true)
            return
        }

        const editReview = {
            ...reviewData
        }

        axios
            .patch(`${API_URL}/reviews/${reviewId}`, editReview)
            .then(reponse => {
                setShowEditOffcanvas()
                createAlert('Review editada')
                setValidated(false)
                fetchReviews()
            })
    }

    return (
        isLoading ? <Loader /> :
            <div className="EditReviewForm">
                <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="vertical-form p-3">

                    <Form.Group controlId="authorField" className="mb-3">
                        <Form.Label>¿Cómo te llamas?</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Introduce tu nombre"
                            value={reviewData.author}
                            onChange={handleReviewChange}
                            name={'author'}
                        />
                        <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="descriptionField" className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="¿Qué te ha parecido el juego?"
                            value={reviewData.description}
                            onChange={handleReviewChange}
                            name={'description'}
                        />
                        <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="ratingField" className="mb-3">
                        <Form.Label>Valoración</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            min={0}
                            max={10}
                            placeholder="Valoración del juego"
                            value={reviewData.rating}
                            onChange={handleReviewChange}
                            name={'rating'} />
                        <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="custom-primary" type="submit">
                        Añadir review
                    </Button>

                </Form>
            </div>
    )
}

export default EditReviewForm