import { Container, Row, Col } from 'react-bootstrap'
import ContactList from '../../components/ContactList/ContactList'
import { getCalendarChartData } from '../../utils/data-preprocesors-utils'

const AdminPage = () => {
    return (
        <div className="AdminPage m-3 m-md-5">
            <Container className="full-heigth-min">
                <Row>
                    <Col>
                        <p>{getCalendarChartData()}</p>
                    </Col>
                    <Col>
                        <ContactList />
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default AdminPage