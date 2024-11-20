import { createContext, useState, useContext } from "react"

import { UserMessageContext } from "./userMessage.context"

const AuthContext = createContext()

function AuthorProviderWrapper(props) {

    const {createAlert} = useContext(UserMessageContext)

    const [loggedAdmin, setLoggedAdmin] = useState(undefined)

    const login = user => {
        setLoggedAdmin(user)
        createAlert('Bienvenido AMO')
    }
    const logout = () => {
        setLoggedAdmin(undefined)
        createAlert('Sesión cerrada ')
    }

    return (<AuthContext.Provider value={{ loggedAdmin, login, logout }}>
        {props.children}
    </AuthContext.Provider>)
}

export { AuthContext, AuthorProviderWrapper }