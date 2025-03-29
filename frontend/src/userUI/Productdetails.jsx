import React, { useState, useEffect } from "react";
import Usernav from "./Usernav";
import Related from "./Related";
import Footer from "./Footer";

function Productdetails() {

    const [mainImageSrc, setMainImageSrc] = useState("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080");

    const changeImage = (src) => {
        setMainImageSrc(src);
    };

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleShare = async (url) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    url,
                });
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
        else if (parseInt(value, 10) <= 1000) {
            setErrorMessage("Please enter higher amount.");
        }
        else {
            setErrorMessage("");
        }

        setBiddingAmount(value);
    };



    return (
        <>
            <Usernav />
            <div class="bg-white">
                <div class="container mx-auto px-6 py-8">
                    <div class="flex flex-wrap -mx-4">

                        <div class="w-full md:w-1/2 px-4 mb-8">
                            <img src={mainImageSrc} alt="Product"
                                class="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage" />
                            <div class="flex gap-4 py-4 justify-center overflow-x-auto">
                                <button onClick={() => changeImage("https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080")}>
                                    <img src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 1"
                                        class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300" />
                                </button>
                                <button onClick={() => changeImage("https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080")}>
                                    <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 2"
                                        class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    />
                                </button>
                                <button onClick={() => changeImage("https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080")}>
                                    <img src="https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 3"
                                        class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    />
                                </button>
                                <button onClick={() => changeImage("https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080")}>
                                    <img src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 4"
                                        class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    />
                                </button>
                            </div>
                        </div>

                        <div class="w-full md:w-1/2 px-4">
                            <h2 class="text-3xl font-bold mb-2">Premium Wireless Headphones</h2>
                            <p class="text-gray-600 mb-4">SKU: WH1000XM4</p>
                            <div class="mb-4">
                                <span class="text-2xl font-bold mr-2">Rs.500/-</span>
                            </div>
                            <p class="text-gray-700 mb-6">Experience premium sound quality and industry-leading noise cancellation
                                with
                                these wireless headphones. Perfect for music lovers and frequent travelers.</p>

                            <div class="mb-6">
                                <h3 class="text-lg font-semibold mb-2">Highest Bid:</h3>
                                <div class="flex space-x-2">
                                    <input disabled value="1000"
                                        class="w-20 border border-gray-300 px-4 py-2 rounded shadow-md" />
                                    <div className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded shadow-md">
                                        <p>Time: </p>
                                        <input disabled value={time}
                                            class="w-20" />
                                    </div>

                                </div>
                            </div>

                            <form action="">
                                <div class="mb-6">
                                    <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Bid your amount:</label>

                                    <input
                                        type="text"
                                        id="biddingAmount"
                                        name="biddingAmount"
                                        placeholder="$$$$"
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

                                <div class="flex space-x-4 mb-6">
                                    <button type="submit"
                                        class="bg-green-600 flex gap-2 items-center text-white px-6 py-2 rounded hover:bg-green-700 outline-none cursor-pointer">
                                        Submit
                                    </button>
                                    <a href="#" onClick={handleShare} url="http://localhost:5173/product" className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 outline-none">Share
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>
                                    </a>
                                </div>
                            </form>
                            <div>
                                <h3 class="text-lg font-semibold mb-2">Key Features:</h3>
                                <ul class="list-disc list-inside text-gray-700">
                                    <li>Industry-leading noise cancellation</li>
                                    <li>30-hour battery life</li>
                                    <li>Touch sensor controls</li>
                                    <li>Speak-to-chat technology</li>
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

export default Productdetails
