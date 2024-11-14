import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

import './Navigation.css'

const Navigation = () => {

    return (
        <div className="Navigation m-3 mb-5">
            <Navbar bg="custom-dark" data-bs-theme="dark" className='rounded'>
                <Container fluid>
                    <Navbar.Brand to="/" as={Link} className='mr-5'> PlayUp</Navbar.Brand>
                    
                    <Nav className="justify-content-end">
                        <NavLink to="/juegos" end className={({isActive}) => isActive? "nav-link selected" : "nav-link"} >
                        Juegos de mesa
                        </NavLink>
                        <NavLink to="/juegos/nuevo"  className={({isActive}) => isActive? "nav-link selected" : "nav-link"}>
                        Nuevo juego
                        </NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )

}

export default Navigation
