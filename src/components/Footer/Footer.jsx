import "./Footer.css"

import { Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';

const Footer = () => {

    return (

        <div className="Footer">
            <Nav className="justify-content-center mx-auto" activeKey="/home">
                <Container className="d-flex">
                    <Nav.Item>
                        <Nav.Link href="/home">Acerca de nosotros</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Contacto</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Síguenos</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        {/* <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link> */}
                    </Nav.Item>
                </Container>
            </Nav>
            <p className="text-center mt-4 mb-4">Todos los derechos reservados</p>
        </div>

    );
}

export default Footer;