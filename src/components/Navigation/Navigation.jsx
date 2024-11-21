import { Nav, Navbar, Form, Button, Offcanvas } from 'react-bootstrap'
import { useContext, useState } from "react"
import { Link, NavLink } from 'react-router-dom'
import { List } from 'react-bootstrap-icons'

import './Navigation.css'
import GlobalGamesFilter from "../../components/GlobalGamesFilter/GlobalGamesFilter"
import CreateGameForm from "../../components/CreateGameForm/CreateGameForm"
import { AuthContext } from '../../contexts/auth.context'


const Navigation = () => {

    const { loggedAdmin } = useContext(AuthContext)

    const [showOfcanvas, setShowOffcanvas] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className="Navigation m-3 m-md-5 ">
            <Navbar data-bs-theme="dark" className='rounded justify-content-md-between justify-content-end'>
                <Navbar.Brand to="/" as={Link} className='mr-5 w-custom-100'> PlayUp</Navbar.Brand>

                <Nav className='g24 d-none d-md-flex'>
                    <NavLink to="/juegos" end className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"} >
                        Juegos de mesa
                    </NavLink>
                    <NavLink to="/planes" end className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"} >
                        Planazos
                    </NavLink>
                    {loggedAdmin && <Nav.Link onClick={() => setShowOffcanvas(true)} >
                        Nuevo juego
                    </Nav.Link>}
                    {loggedAdmin && <NavLink to="/admin" end className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"} >
                        Administración
                    </NavLink>}
                </Nav>
                <Form md="2" className='d-flex flex-row align-items-center'>
                    <GlobalGamesFilter />
                </Form>
                <Button className='d-block d-md-none' variant="custom-transparent" onClick={() => setShowMenu(true)}>
                    <List />
                </Button>
            </Navbar>

            <Offcanvas show={showOfcanvas} onHide={() => setShowOffcanvas(false)} placement="end" >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Añadir juego </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CreateGameForm setShowOffcanvas={setShowOffcanvas} />
                </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement='end' className="menu p-5" >
                <Offcanvas.Header closeButton />
                <Offcanvas.Body>
                    <NavLink
                        to="/juegos"
                        onClick={() => setShowMenu(false)}
                        className={({ isActive }) => isActive ? "nav-link selected mb-3" : "nav-link mb-3"}>
                        Juegos de mesa
                    </NavLink>
                    <NavLink to="/planes" onClick={() => setShowMenu(false)} className={({ isActive }) => isActive ? "nav-link selected mb-3" : "nav-link mb-3"} >
                        Planazos
                    </NavLink>
                    <Nav.Link onClick={() => { setShowMenu(false), setShowOffcanvas(true) }} className={({ isActive }) => isActive ? "nav-link selected mb-3" : "nav-link mb-3"} >
                        Nuevo juego
                    </Nav.Link>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )

}

export default Navigation
