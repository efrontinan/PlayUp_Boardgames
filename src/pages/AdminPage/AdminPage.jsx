import { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import ContactList from '../../components/ContactList/ContactList'
import CalendarChart from '../../components/CalendarChart/CalendarChart'

import { AuthContext } from '../../contexts/auth.context'
import { Navigate } from 'react-router-dom'



const AdminPage = () => {

    const { loggedAdmin } = useContext(AuthContext)

    if (!loggedAdmin) {
        return <Navigate to="/" />
    }

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