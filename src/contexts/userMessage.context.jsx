import { createContext, useState } from "react"

const UserMessageContext = createContext ()

function UserMessageProvidedWrapper(props) {

    const [showMessage, setShowMessage] = useState(false)

    const [message, setMessage] = useState('')

    const [url, setUrl] = useState(false)

    const createAlert = (message, url) => {
        setMessage(message)
        setShowMessage(true)
        setUrl(url)
    }

    return(
    <UserMessageContext.Provider value={{showMessage, setShowMessage, createAlert, message, url }}>
        {props.children}
    </UserMessageContext.Provider>
    )

}

export  {UserMessageContext, UserMessageProvidedWrapper}