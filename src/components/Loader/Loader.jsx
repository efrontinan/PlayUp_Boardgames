import "../Loader/Loader.css"

import Lottie from "lottie-react"
import spinnerAnimation from "../../assets/loader.json"
import { useContext } from "react"
import { LoaderContext } from "../../contexts/loader.context"

const Loader = () => {

    const {showLoader, setLoader} = useContext(LoaderContext)

    return (showLoader &&
        <div className="Loader">
            <div className="LoaderElement" style={{ width: 100, height: 100 }}>
                <Lottie animationData={spinnerAnimation} loop={true}></Lottie>
            </div>
        </div>
    )
}

export default Loader