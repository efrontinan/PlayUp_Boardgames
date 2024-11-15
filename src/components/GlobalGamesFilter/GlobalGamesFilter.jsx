import { useState } from "react"
import axios from "axios"

import { Form, Row, Col, ListGroup } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"

import SearchListElement from "../SearchListElement/SearchListElement"
import './GlobalGamesFilter.css'


const API_URL = "http://localhost:5005"

const GlobalGamesFilter = () => {

    const [filterValue, setFilter] = useState("")
    const [filterResults, setFilterResults] = useState([])

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
                    <Col sm="1" align="right">
                        <Form.Label><Search /></Form.Label>
                    </Col>
                    <Col>
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
                                        <SearchListElement {...elm} key={elm.id} />
                                    )
                                }) : ""
                            }
                        </ListGroup>
                    </Col>
                </Row>

            </Form.Group>
        </div>
    )

}

export default GlobalGamesFilter