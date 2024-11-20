import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"

import { Form, Row, Col, ListGroup, Button, Offcanvas } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"

import SearchListElement from "../SearchListElement/SearchListElement"
import './GlobalGamesFilter.css'


const API_URL = "http://localhost:5005"

const GlobalGamesFilter = () => {

    const [filterValue, setFilter] = useState("")
    const [filterResults, setFilterResults] = useState([])
    const location = useLocation()

    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        setFilter("")
        setFilterResults([])
    }, [location.pathname])

    const handleFilterChange = e => {
        const { value } = e.target
        setFilter(value)
        fetchFilterResults(value)
    }

    const fetchFilterResults = (query) => {
        axios
            .get(`${API_URL}/games?title_like=${query}`)
            .then(response => {
                setFilterResults(response.data)
            }
            )
    }

    return (

        <div className="GlobalGamesFilter">
            <Form.Group controlId="formHorizontalEmail">
                <Row direction="horizontal" gap={3} className="align-items-center">
                    <Col sm="1" align="right" className="d-none d-md-block">
                        <Form.Label><Search /></Form.Label>
                    </Col>
                    <Col sm="1" align="right" className="d-md-none">
                        <Button variant="custom-transparent" onClick={() => setShowMenu(true)}>
                            <Search />
                        </Button >
                    </Col>
                    <Col className="d-none d-md-block">
                        <Form.Control
                            type="text"
                            placeholder="Busca tu juego"
                            value={filterValue}
                            onChange={handleFilterChange}
                        />
                        <ListGroup className="mt-2">
                            {filterValue.length > 0 ?
                                filterResults.map(elm => {
                                    return (
                                        <SearchListElement {...elm} key={elm.id} />
                                    )
                                }) : ""
                            }
                        </ListGroup>
                    </Col>
                </Row>

            </Form.Group>

            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement='end' className="py-3 px-2" >
                <Offcanvas.Header closeButton />
                <Offcanvas.Body >
                <Form.Control
                            type="text"
                            placeholder="Busca tu juego"
                            value={filterValue}
                            onChange={handleFilterChange}
                        />
                        <ListGroup variant="">
                            {filterValue.length > 0 ?
                                filterResults.map(elm => {
                                    return (
                                        <SearchListElement {...elm} key={elm.id} setShowMenu={setShowMenu} />
                                    )
                                }) : ""
                            }
                        </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )

}

export default GlobalGamesFilter