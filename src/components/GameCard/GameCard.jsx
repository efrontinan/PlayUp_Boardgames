import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const GameCard = ({ image, title, categories, specs }) => {
    const { players } = specs
    const { min, max } = players
    return (
        <div className="GameCard">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {min}-{max} jugadores
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>

        </div>
    )
}

export default GameCard