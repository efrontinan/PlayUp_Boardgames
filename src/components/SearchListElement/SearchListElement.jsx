import { Link } from "react-router-dom"

import { ListGroup, Image, Col, Row } from "react-bootstrap"

import './SearchListElement.css'

const SearchListElement = ({ title, image, id }) => {
    return (
        <div className="SearchListElement">
            <ListGroup.Item>
                <div as={Link} to={`/juegos/detalles/${id}`}>
                    <Row>
                        <Col sm="3" className="d-none d-md-block">
                            <Image src={image} rounded />
                        </Col>
                        <Col sm="9">
                            <p>{title}</p>
                        </Col>
                    </Row>
                </div>
            </ListGroup.Item>
        </div>
    )
}

export default SearchListElement