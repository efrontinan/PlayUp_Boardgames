import { createContext, useState } from "react"

const LoaderContext = createContext()

function LoaderProvidedWrapper (props) {

    const [showLoader, setLoader] = useState(false)

    return(
        <LoaderContext.Provider value={{showLoader, setLoader}}>
            {props.children}
        </LoaderContext.Provider>
    )

}

export {LoaderProvidedWrapper, LoaderContext}