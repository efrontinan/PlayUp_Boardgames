import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import ContactCard from "../ContactCard/ContactCard"

const API_URL = "http://localhost:5005"

const ContactList = () => {

    const [contacts, setContacts] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchList()
    }, [])

    const fetchList = () => {
        axios
            .get(`${API_URL}/contact`)
            .then(response => {
                setContacts(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (isLoading ? <Loader /> :
        <div className="ContactList">

            <h1>Mensajes recibidos ({contacts.length})</h1>

            { contacts.length===0? <p className="my-3">Aún no hay planazos. ¡Se el primero en crear uno!</p> :
                contacts.map (elm => {

                    return (
                        <ContactCard key={elm.id} {...elm}/>
                    )

                })

            }

        </div >
    )

}

export default ContactList