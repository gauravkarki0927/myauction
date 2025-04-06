import React, { useState, useEffect } from 'react';

const Reviewbox = ({ initialUsername, initialMessage, onSubmit }) => {
    const [review, setReview] = useState(initialMessage);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    useEffect(() => {
        setReview(initialMessage);
    }, [initialMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, review });
    };

    const onClose = () =>{
        var box = document.getElementById('reviewBox');
        if(box.style.display != 'none'){
            box.style.display = "none";
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white p-6 rounded border border-gray-200 shadow-md" id="reviewBox">
            <i
                className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-red-600 fa fa-times"
                onClick={onClose}
            ></i>
            <h2 className="text-center mb-5 text-lg font-semibold">Give Your Review</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="block mb-2">
                   User Name:
                </label>
                <input
                    type="text"
                    id="name"
                    value={initialUsername}
                    className="w-full p-2 mb-5 rounded border border-gray-300 focus:outline-none focus:border-green-500"
                    required
                />
                <label htmlFor="review" className="block mb-2">
                    Review:
                </label>
                <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows="4"
                    className="w-full p-2 mb-5 rounded border border-gray-300 resize-none focus:outline-none focus:border-green-500"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="w-full text-white cursor-pointer bg-gray-600 shadow-md p-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Reviewbox;