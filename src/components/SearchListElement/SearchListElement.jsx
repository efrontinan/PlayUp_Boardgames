import { Link } from "react-router-dom"

import { ListGroup, Image, Col, Row } from "react-bootstrap"

import './SearchListElement.css'

const SearchListElement = ({ title, image, id, setShowMenu }) => {
    return (
        <div className="SearchListElement">
            <ListGroup.Item>
                <Row as={Link} to={`/juegos/detalles/${id}`} onClick={()=> setShowMenu()}>
                    <Col sm="3" className="d-none d-md-block">
                        <Image src={image} rounded />
                    </Col>
                    <Col sm="9">
                        <p>{title}</p>
                    </Col>
                </Row>
            </ListGroup.Item>
        </div>
    )
}

export default SearchListElement