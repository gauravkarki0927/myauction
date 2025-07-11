import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import Filter from './Filter';
import sad from '../pictures/sad.png';
import { BASE_URL } from '../api/BaseUrrlForImage';
import API from '../api/API';

function Outersearch() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const searchItem = location.state?.searchItem || '';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const url = searchItem.includes('items') ? '/filterItems' : '/searchItems';
                const response = await API.post(
                    `${url}`,
                    { searchItem },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                setResults(response.data);
            } catch (err) {
                console.error('Fetch error:', err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        if (searchItem) {
            fetchData();
        }
    }, [searchItem]);

    const productDetails = (PID) => {
        navigate(`/product?pid=${PID}`);
    };

    const renderEndDate = (recorded, durationInDays = 0) => {
        const postDate = new Date(recorded);
        if (isNaN(postDate.getTime())) {
            return <p className="text-red-800 text-[13px]">Invalid date</p>;
        }

        const endDate = new Date(postDate);
        endDate.setDate(endDate.getDate() + durationInDays);

        const now = new Date();
        if (endDate < now) {
            return <p className="text-red-800 text-[13px] font-semibold">Auction Ended</p>;
        }

        const month = String(endDate.getMonth() + 1).padStart(2, '0');
        const day = String(endDate.getDate()).padStart(2, '0');
        const year = endDate.getFullYear();
        let hours = endDate.getHours();
        const minutes = String(endDate.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        return (
            <p className="text-red-800 text-[13px]">
                Ends at {`${month}-${day}-${year}, ${hours}:${minutes} ${ampm}`}
            </p>
        );
    };

    return (
        <>
            <Nav />
            <Filter />

            <div className="flex flex-col gap-2 py-4" id="product">
                <div className="flex py-3 xl:px-14 lg:px-16 md:px-18 sm:px-6 px-4">
                    <h1 className="text-xl font-semibold">Search Results</h1>
                </div>

                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : results.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-3 h-auto w-full">
                        {results.map((data) => {
                            let image = '';
                            try {
                                image = JSON.parse(data.proImage || '[]')[0];
                            } catch (e) {
                                image = '';
                            }

                            return (
                                <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]" key={data.product_id}>
                                    <div className="relative">
                                        <div className="cursor-pointer">
                                            {image && (
                                                <img
                                                    className="w-full"
                                                    src={`${BASE_URL}/productImage/${image}`}
                                                    alt="Product"
                                                    onClick={() => productDetails(data.product_id)}
                                                />
                                            )}
                                            <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded text-sm font-medium">
                                                Available
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-medium mb-1">{data.productName}</h3>
                                        <p className="text-gray-800 text-sm mb-4">{data.type}</p>
                                        {renderEndDate(data.recorded, data.days)}
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="font-bold text-lg">Rs.{data.price}</span>
                                            <button
                                                className="bg-transparent text-gray-900 border border-gray-800 rounded-[100px] font-bold py-2 px-4 text-[13px] hover:bg-black hover:text-white outline-none cursor-pointer"
                                                onClick={() => productDetails(data.product_id)}
                                            >
                                                Bid Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-10 w-full">
                        <div className="text-center">
                            <img src={sad} alt="No Results" className="w-48 mx-auto mb-4" />
                            <p className="text-lg text-gray-600 font-medium">No result found for "{searchItem}"</p>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

export default Outersearch;