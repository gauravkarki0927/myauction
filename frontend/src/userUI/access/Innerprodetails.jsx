import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import Navigation from "./Navigation";
import Footer from "../Footer";
import Related from "../Related";
import Filter from "../Filter";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Innerprodetails() {

    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('pid');

    useEffect(() => {
        const fetchProduct = async () => {

            try {
                const response = await axios.get(`http://localhost:3000/productDetails/${productId}`);

                if (response.ok) {
                    const data = await response.json();

                    const productData = data[0];
                    setProduct(productData);

                    try {
                        const parsedImages = JSON.parse(productData.proImage);
                        setImages(parsedImages);

                        const initialImage = `http://localhost:3000/productImage/${parsedImages[0]}`;
                        setMainImageSrc(initialImage);
                    } catch (err) {
                        console.error("Invalid JSON in proImage", err);
                    }
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                alert("Failed to fetch product details.");
            }
        };

        fetchProduct();
    }, [searchParams]);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [mainImageSrc, setMainImageSrc] = useState(null);
    const changeImage = (src) => {
        setMainImageSrc(src);
    };

    const [remainingTime, setRemainingTime] = useState("");

    useEffect(() => {
        if (!product.submitted || !product.days) return;

        const postDate = new Date(product.submitted);
        const endDate = new Date(postDate);
        endDate.setDate(endDate.getDate() + product.days);

        endDate.setMinutes(endDate.getMinutes() - 30);

        const updateRemainingTime = () => {
            const now = new Date();
            const timeDiff = endDate - now;

            if (timeDiff <= 0) {
                setRemainingTime("Auction Ended");
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDiff / 1000) % 60);

            setRemainingTime(
                `${days}d:${hours}h:${minutes}m:${seconds}s`
            );
        };

        updateRemainingTime();
        const timer = setInterval(updateRemainingTime, 1000);

        return () => clearInterval(timer);
    }, [product.submitted, product.days]);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ url });
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            alert('Share not supported on this browser. Please copy the URL manually.');
        }
    };


    const [biddingAmount, setBiddingAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleKeyUp = (e) => {
        const value = e.target.value;

        if (value === "") {
            setErrorMessage("Empty field.");
        }
        else if (!/^\d+$/.test(value)) {
            setErrorMessage("Please enter a valid number.");
        }
        else if (parseInt(value, 10) <= product.price) {
            setErrorMessage("Please enter higher amount.");
        }
        else {
            setErrorMessage("");
        }

        setBiddingAmount(value);
    };

    let keyPointsList = [];
    try {
        keyPointsList = JSON.parse(product.keyPoints || '[]');
    } catch (err) {
        console.error("Failed to parse keyPoints", err);
    }

    const [user_id, setUser_id] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get("http://localhost:3000/access/innerproduct", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUser_id(response.data.userId);


            } catch (err) {
                console.error(err);
                //   navigate('/login');
            }
        };
        getUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user_id) {
            if (!errorMessage && biddingAmount) {
                try {
                    const response = await fetch("http://localhost:3000/submitBid", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            productId: productId,
                            userId: user_id,
                            amount: parseInt(biddingAmount, 10),
                        }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert("Bid submitted successfully!");
                    } else {
                        alert(data.message || "Bid submission failed.");
                    }
                } catch (error) {
                    console.error("Bid submission error:", error);
                    alert("Network error occurred while submitting your bid.");
                }
            }
        }
    };

    const [highestBid, setHighestBid] = useState(null);

    useEffect(() => {
        const highBids = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/highestBid/${productId}`);
                setHighestBid(response.data);
            } catch (err) {
                console.error("Error fetching value:", err);
                alert("Failed to fetch value.");
            }
        };
        highBids();
    }, [productId]);



    return (
        <>
            <Navigation />
            <Filter />
            <div className="bg-white">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-wrap -mx-4">

                        <div className="w-full md:w-1/2 px-4 mb-8">
                            <img src={mainImageSrc} alt="Product"
                                className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage" />
                            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                                {images.map((img, index) => (
                                    <button key={index} onClick={() => changeImage(`http://localhost:3000/productImage/${img}`)}>
                                        <img
                                            src={`http://localhost:3000/productImage/${img}`}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 px-4">
                            <h2 className="text-3xl font-bold mb-2">{product.productName}</h2>
                            <p className="text-gray-600 mb-4">{product.otherName}</p>

                            <div className="mb-4 flex flex-col">
                                <span className={`text-2xl font-bold mr-2 ${highestBid && highestBid.user === user_id
                                    ? "border-green-500 text-green-600"
                                    : "border-red-500 text-red-600"}`}>{highestBid !== null ? `Rs.${highestBid.highBid}` : `Rs.${product.price}`}</span>
                                <span className="text-[16px]">or Best Offer</span>
                            </div>

                            <p className="text-gray-700 mb-6">
                                {product.description}
                            </p>

                            <div className="flex flex-wrap md:flex-nowrap gap-4">
                                <div className="mb-6 flex flex-col justify-center items-center">
                                    <h3 className="text-md font-semibold mb-2">Remaining Time</h3>
                                    <div className="flex space-x-2">
                                        <div className="flex items-center space-x-2 border border-gray-300 px-2 py-2 rounded shadow-md">
                                            <input disabled value={remainingTime}
                                                className="w-28" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Bid your amount:</label>

                                    <input
                                        type="text"
                                        id="biddingAmount"
                                        name="biddingAmount"
                                        placeholder="Rs."
                                        value={biddingAmount}
                                        onChange={(e) => setBiddingAmount(e.target.value)}
                                        onKeyUp={handleKeyUp}
                                        className={`w-20 border ${errorMessage ? "border-red-500" : "border-gray-300"
                                            } px-4 text-center py-2 rounded outline-none`}
                                        required
                                    />

                                    {errorMessage && (
                                        <p className="text-red-600 text-sm my-2">{errorMessage}</p>
                                    )}

                                </div>

                                <div className="flex space-x-4 mb-6">
                                    <button type="submit"
                                        className="bg-[#0e0e0f] flex gap-2 items-center text-white px-6 py-2 rounded outline-none cursor-pointer">
                                        Submit
                                    </button>
                                    <a onClick={handleShare} className="bg-gray-200 flex gap-2 items-center cursor-pointer text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 outline-none">Share
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>
                                    </a>
                                </div>
                            </form>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                                <ul className="list-disc ml-6">
                                    {keyPointsList.map((point, index) => (
                                        <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Related />
            <Footer />
        </>
    )
}

export default Innerprodetails
