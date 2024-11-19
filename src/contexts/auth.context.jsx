import { createContext } from "react";


const AuthContext = createContext()

function AuthorProviderWrapper(props) {

    // const loggedAdmin = {
    //     username: "playupadmin"
    // }

    const loggedAdmin = undefined

    return (<AuthContext.Provider value={{ loggedAdmin }}>
        {props.children}
    </AuthContext.Provider>)
}

export { AuthContext, AuthorProviderWrapper }