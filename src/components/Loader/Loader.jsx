import Lottie from "lottie-react"
import spinnerAnimation from "../../assets/loader.json"

const Loader = () => {

    return (
        <div className="Loader" style={{ width: 100, height: 100 }}>
            <h1>TEST</h1>
            <Lottie animationData={spinnerAnimation} loop={true}></Lottie>
        </div>
    )
}

export default Loader