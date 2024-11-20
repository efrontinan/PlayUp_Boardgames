import axios from 'axios'
import { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

const FormAddress = () => {

    const [addressValue, setAddressValue] = useState({})

    useEffect(() => handleAutocomplete(), [addressValue])

    const handleAutocomplete = () => {

        addressValue.label && geocodeByAddress(addressValue?.label)
            .then(([addressDetails]) => getLatLng(addressDetails))
            .then((coordinates) => {
                setAddressValue({...addressValue, lat: coordinates.lat, lng: coordinates.lng})
            })
            .then(getAddressData(addressValue))
            .catch(error => console.error(error))
    }

    const getAddressData = () => {
        axios
        .get (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${addressValue.lat},${addressValue.lng}&key=AIzaSyDKOESwdtbPID8SoPVI_cK9Wq7dxPmd3D4`)
        .then ( response => {
            setAddressValue( {...addressValue, addressComponents:response.results.addess_components})
            console.log('El AddressValue', addressValue)
        })
    }

    return (
        <div className="FormAddress">

            
                <h2>Prueba de formulario</h2>
                <GooglePlacesAutocomplete
                    selectProps={{
                        addressValue,
                        onChange: setAddressValue,
                    }}
                    apiKey="AIzaSyDKOESwdtbPID8SoPVI_cK9Wq7dxPmd3D4"
                />

        </div>
    )
}

export default FormAddress