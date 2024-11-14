import { Link } from 'react-router-dom'

import { Button, Card, Container, Row, Col, Badge, Stack } from 'react-bootstrap'

import './GameCard.css'


const GameCard = ({ image, title, categories, specs, id, removeGame }) => {

    const { players } = specs
    const { min, max } = players

    return (

        <div className="GameCard">

            <Card className='p-custom' >
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Img variant="top" src={image} />
                            </Col>
                            <Col>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>
                                    {min}-{max} jugadores
                                </Card.Text>

                                <Stack direction="horizontal" gap={1} className='float-left'>
                                    {categories.map(elm => {
                                        return (

                                            <Col><Badge bg="secondary">{elm}</Badge></Col>
                                        )
                                    })}
                                </Stack>
                            </Col>
                        </Row>


                        <Row className='m-0'>
                            <Col>
                                <Button as={Link} to={`/juegos/detalles/${id}`} variant="dark">Ver detalles</Button>
                            </Col>
                            <Col>
                                <Button onClick={() => removeGame(id)}>Eliminar</Button>
                            </Col>
                            <Col>
                                <Button as={Link} to={`/juegos/editar/${id}`} variant="dark">Editar</Button>
                            </Col>
                        </Row>

                    </Card.Body>
            </Card>

        </div>

    )
}

export default GameCard