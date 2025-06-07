import { React, useEffect, useState } from 'react'
import user from '../pictures/user.jpg';
import API from '../api/API';
import { BASE_URL } from '../api/BaseUrrlForImage';

function Reviews() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        API.get('/getReviews')
            .then(res => {
                const allReviews = res.data;
                setReviews(allReviews);

            })
            .catch(err => console.error(err));
    });

    return (
        <>
            <section className="body-font xl:px-16 lg:px-12 md:px-10 px-6 py-3" id="reviews">
                <div className="container px-5 py-24 mx-auto">
                    <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">What others say?</h1>
                    <div className="flex flex-wrap -m-4">
                        <div className="flex flex-wrap bg-gray-100 w-full">
                            {reviews.map(data => (
                                <div className="px-2 py-4 lg:w-1/3 md:w-full" key={data.rid}>
                                    <div className="space-y-2 rounded-md p-2 bg-white">
                                        <div className="flex gap-4">
                                            <div className="w-16 h-16 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full overflow-hidden">
                                                {data.profile && (
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={data.profile ? `${BASE_URL}/uploads/${data.profile}` : user}
                                                        alt="User Avatar"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h2 className="text-gray-900 text-lg title-font font-medium">{data.user_name}</h2>
                                                <p className="text-gray-900 text-[13px] mb-3">{new Date(data.created_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <p className="leading-relaxed">{data.review}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Reviews
