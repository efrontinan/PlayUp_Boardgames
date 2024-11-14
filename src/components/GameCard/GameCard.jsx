import { Link } from 'react-router-dom'

import { Button, Card, Container } from 'react-bootstrap'

import './GameCard.css'


const GameCard = ({ image, title, categories, specs, id, removeGame }) => {

    const { players } = specs
    const { min, max } = players

    return (

        <div className="GameCard">

            <Card className='p-2'>
                <Container className='rounded py-4 px-2'>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {min}-{max} jugadores
                        </Card.Text>
                        <Button as={Link} to={`/juegos/detalles/${id}`} variant="dark">Ver detalles</Button>
                        <Button onClick={() => removeGame(id)}>Eliminar juego</Button>
                        <Button as={Link} to={`/juegos/editar/${id}`} variant="dark">Editar información</Button>

                    </Card.Body>
                </Container>
            </Card>

        </div>

    )
}

export default GameCard