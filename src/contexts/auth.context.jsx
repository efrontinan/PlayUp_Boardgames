import { createContext, useState } from "react";


const AuthContext = createContext()

function AuthorProviderWrapper(props) {

    const [loggedAdmin, setLoggedAdmin] = useState(undefined)

    const login = user => setLoggedAdmin(user)
    const logout = () => {
        setLoggedAdmin(undefined)
        alert("sesión cerrada")
    }

    return (<AuthContext.Provider value={{ loggedAdmin, login, logout }}>
        {props.children}
    </AuthContext.Provider>)
}

export { AuthContext, AuthorProviderWrapper }