import { useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import EventsMarkers from '../EventsMarkers/EventsMarkers'

const ReactGoogleMap = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDKOESwdtbPID8SoPVI_cK9Wq7dxPmd3D4"
    })

    const [map, setMap] = useState(null)

    const onLoad = (map) => console.log('Aquí haz lo que necesites tras la carga del mapa')
    const onUnmount = () => setMap(null)

    return (isLoaded && (
        <GoogleMap
            mapContainerStyle={{ height: '50vh', borderRadius: '0px 50px 0px 50px' }}
            zoom={5.5}
            onLoad={onLoad}
            center={{ lat: 40.41769976820468, lng: -3.684093875138128 }}
            onUnmount={onUnmount}
        >
            <EventsMarkers />

        </GoogleMap>
    )

    )
}

export default ReactGoogleMap