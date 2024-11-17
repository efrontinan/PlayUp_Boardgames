import "../Loader/Loader.css"

import Lottie from "lottie-react"
import spinnerAnimation from "../../assets/loader.json"

const Loader = () => {

    return (
        <div className="Loader">
            <div className="LoaderElement" style={{ width: 100, height: 100 }}>
                <Lottie animationData={spinnerAnimation} loop={true}></Lottie>
            </div>
        </div>
    )
}

export default Loader