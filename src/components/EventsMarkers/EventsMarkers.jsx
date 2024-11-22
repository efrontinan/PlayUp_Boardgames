import axios from 'axios'
import { Marker } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

import Loader from '../Loader/Loader'

const API_URL = import.meta.env.VITE_APP_API_URL

const EventsMarkers = () => {

    const [events, setEvents] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = () => {
        axios
            .get(`${API_URL}/events`)
            .then(response => {
                setEvents(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }


    return (
        isLoading ? <Loader /> :
            <>
                {
                    events.map(elm => {
                        return (
                            <Marker key={elm.id} position={{ lat: elm.address.lat, lng: elm.address.lng }} />
                        )
                    })
                }
            </>
    )

}

export default EventsMarkers