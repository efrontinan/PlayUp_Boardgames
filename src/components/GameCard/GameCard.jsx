import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const GameCard = ({ image, title, categories, specs, id }) => {

    const { players } = specs
    const { min, max } = players

    return (

        <div className="GameCard">

            <Card>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {min}-{max} jugadores
                    </Card.Text>
                    <Button as={Link} to={`/juegos/detalles/${id}`} variant="dark">Ver detalles</Button>
                </Card.Body>
            </Card>

        </div>

    )
}

export default GameCard