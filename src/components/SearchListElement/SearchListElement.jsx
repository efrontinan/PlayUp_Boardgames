import { Link } from "react-router-dom"

import { ListGroup, Image, Col, Row } from "react-bootstrap"


const SearchListElement = ({ title, image, id }) => {
    return (
        <div className="SearchListEvent">
            <ListGroup.Item>
                <Row as={Link} to={`/juegos/detalles/${id}`}>
                    <Col sm="4">
                        <Image src={image} rounded />
                    </Col>
                    <Col sm="auto">
                        <h4>{title}</h4>
                    </Col>
                </Row>
            </ListGroup.Item>
        </div>
    )
}

export default SearchListElement