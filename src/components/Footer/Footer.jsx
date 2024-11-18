import "./Footer.css"

import { Col, Nav, Row, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {

    return (

        <div className="Footer">
            <Row>
                <Col md="6">
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
                    </Stack>

                </Col>
                <Col md="6">
                    <p className="text-end">® Developed by Iván Blanco & Elena Frontiñán</p>
                </Col>
            </Row>
        </div>

    );
}

export default Footer;