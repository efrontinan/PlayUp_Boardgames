import "../StarRatingItem/StarRatingItem.css"

const StarRatingItem = ({ rating }) => {

    const starRatingInput = (rating / 2)

    return (
        <div className="StarRatingItem" >
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <span
                        key={index}
                        className={`star ${ratingValue <= starRatingInput ? 'filled' : ''}`}
                        style={
                            { width: `${Math.min(100, Math.max(0, (starRatingInput - index) * 100))}%` }}>
                        ★
                    </span>
                );
            })}
        </div>
    )
}

export default StarRatingItem