import axios from "axios"
import { useEffect, useState } from "react"

import Loader from "../Loader/Loader"

const API_URL = "http://localhost:5005"

const ReviewsList = () => {

    const [isLoading, setIsLoading] = useState(false)

    return (
        isLoading ? <Loader /> :
            <div className="ReviewsList">
                <p>Seré una review</p>
            </div>
    )

}

export default ReviewsList