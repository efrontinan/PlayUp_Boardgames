import { Nav, Navbar, Form, Button, Offcanvas } from 'react-bootstrap'
import { useState } from "react"
import { Link, NavLink } from 'react-router-dom'
import { List } from 'react-bootstrap-icons'

import './Navigation.css'
import GlobalGamesFilter from "../../components/GlobalGamesFilter/GlobalGamesFilter"
import CreateGameForm from "../../components/CreateGameForm/CreateGameForm"


const Navigation = () => {

    const [showOfcanvas, setShowOffcanvas] = useState(false)

    return (
        <div className="Navigation m-5 ">
            <Navbar data-bs-theme="dark" className='rounded justify-content-between'>
                <Navbar.Brand to="/" as={Link} className='mr-5'> PlayUp</Navbar.Brand>

                <Nav className='g24 d-none d-md-flex'>
                    <NavLink to="/juegos" end className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"} >
                        Juegos de mesa
                    </NavLink>
                    <NavLink to="/planes" end className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"} >
                        Planazos
                    </NavLink>
                    <Nav.Link onClick={() => setShowOffcanvas(true)} >
                        Nuevo juego
                    </Nav.Link>
                </Nav>
                <Form md="2" className='d-flex flex-row align-items-center'>
                    <GlobalGamesFilter />
                </Form>
                <List className='d-block d-md-none' />
            </Navbar>

            <Offcanvas show={showOfcanvas} onHide={() => setShowOffcanvas(false)} placement="end" >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Añadir juego </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CreateGameForm />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )

}

export default Navigation
