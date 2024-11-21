import ContactList from '../../components/ContactList/ContactList'

import { Container, Row, Col } from 'react-bootstrap'
import CalendarChart from '../../components/CalendarChart/CalendarChart'



const AdminPage = () => {

    return (
        <div className="AdminPage m-3 m-md-5 ">
            <Container className="full-heigth-min ">
                <Row className='mw-80-vh'>
                    <Col className='mw-80-vh'>
                        <h2 className='mb-4'>Estadísticas mensajes</h2>
                        <CalendarChart />
                    </Col>
                    <Col className='mw-80-vh overflow-auto'>
                        <ContactList />
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default AdminPage