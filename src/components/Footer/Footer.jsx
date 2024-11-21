import { useContext } from "react"
import "./Footer.css"

import { Col, Row, Stack } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"

const Footer = () => {

    const { loggedAdmin, logout } = useContext(AuthContext)

    return (

        <div className="Footer">
            <Row>
                <Col xs="12" md="6">
                    <Stack direction="horizontal" gap={3}>
                        <NavLink
                            to="/sobre-nosotros"
                            className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}>
                            Acerca de nosotros
                        </NavLink>
                        <NavLink
                            to="/contacto"
                            className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}>
                            Contacto
                        </NavLink>
                        {!loggedAdmin && <NavLink
                            to="/iniciar-sesion"
                            className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}>
                            Iniciar sesión
                        </NavLink>}

                        {loggedAdmin && <NavLink
                            className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
                            onClick={logout}>
                            Cerrar sesión
                        </NavLink>}


                    </Stack>

                </Col>
                <Col md="6" className="mt-3">
                    <p className="text-md-end">® Developed by Iván Blanco & Elena Frontiñán</p>
                </Col>
            </Row>
        </div>

    )
}

export default Footer