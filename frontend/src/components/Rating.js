import React from 'react'

const Rating = ({ rating, numReviews }) => {

    return (
        <>
            <span>
                <i
                    style={{ color: 'orange', margin: '0.1rem' }}
                    className={rating >= 1
                        ? 'fa fa-star'
                        : rating >= 0.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'}>
                </i>
            </span>
            <span>
                <i
                    style={{ color: 'orange', margin: '0.1rem' }}
                    className={rating >= 2
                        ? 'fa fa-star'
                        : rating >= 1.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'}>
                </i>
            </span>
            <span>
                <i
                    style={{ color: 'orange', margin: '0.1rem' }}
                    className={rating >= 3
                        ? 'fa fa-star'
                        : rating >= 2.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'}>
                </i>
            </span>
            <span>
                <i
                    style={{ color: 'orange', margin: '0.1rem' }}
                    className={rating >= 4
                        ? 'fa fa-star'
                        : rating >= 3.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'}>
                </i>
            </span>
            <span>
                <i
                    style={{ color: 'orange', margin: '0.1rem' }}
                    className={rating >= 5
                        ? 'fa fa-star'
                        : rating >= 4.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'}>
                </i>
            </span>
            <span style={{ marginLeft: '0.5rem' }}>{`${numReviews} reviews`}</span>
        </>
    )
}
export default Rating