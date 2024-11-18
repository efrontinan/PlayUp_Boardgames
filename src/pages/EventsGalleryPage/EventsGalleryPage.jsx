import { Container, Row, Col } from 'react-bootstrap'

import './EventsGalleryPage.css'
import EventsList from '../../components/EventsList/EventsList'
import ReactGoogleMap from '../../components/ReactGoogleMap/ReactGoogleMap'

const EventsGalleryPage = () => {

    return (
        <div className="EventsGalleryPage m-5">
            <Container className="full-heigth-min">
                <Row className='mb-5'>
                    <Col md={{ span: 8, offset: 2 }} >
                        <ReactGoogleMap />
                    </Col>
                    <Col>
                        <EventsList />
                    </Col>
                </Row>

            </Container>

        </div>
    )
}

export default EventsGalleryPage