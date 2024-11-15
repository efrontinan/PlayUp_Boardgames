import { Container, Nav, Navbar, Row, Col, Form } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

import './Navigation.css'
import GlobalGamesFilter from "../../components/GlobalGamesFilter/GlobalGamesFilter"


const Navigation = () => {

    return (
        <div className="Navigation m-5 ">
            <Navbar  data-bs-theme="dark" className='rounded justify-content-between'>
                            <Navbar.Brand to="/" as={Link} className='mr-5'> PlayUp</Navbar.Brand>

                            <Nav className='g24'>
                                <NavLink to="/juegos"  end className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"} >
                                    Juegos de mesa
                                </NavLink>
                                <NavLink to="/juegos/nuevo" className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}>
                                    Nuevo juego
                                </NavLink>
                            </Nav>
                            <Form md="2">
                                <GlobalGamesFilter />
                            </Form>
            </Navbar>
        </div>
    )

}

export default Navigation
