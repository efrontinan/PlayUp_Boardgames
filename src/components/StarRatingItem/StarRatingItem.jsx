import { Star, StarFill, StarHalf } from "react-bootstrap-icons"

import "../StarRatingItem/StarRatingItem.css"

const StarRatingItem = ({ rating }) => {

    const starRatingInput = (rating / 2)
    const fullStars = Math.floor(starRatingInput)
    const halfStars = starRatingInput % 1 !== 0

    return (
        <div className="StarRatingItem" >
            {[...Array(5)].map((_, index) => {

                if (index < fullStars) {
                    return <StarFill key={index} />
                }
                else if (index === fullStars && halfStars) {
                    return <StarHalf key={index} />
                }
                else {
                    return <Star key={index} />
                }
                
            })}
        </div>
    )
}

export default StarRatingItem