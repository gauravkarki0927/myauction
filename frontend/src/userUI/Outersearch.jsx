import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Footer from './Footer';
import Filter from './Filter';
import sad from '../pictures/sad.png';

function Outersearch() {

    const [product, setProduct] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [noResultData, setNoResultData] = useState([]);
    const location = useLocation();
    const searchItem = location.state?.searchItem || '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = searchItem.includes('items') ? '/filterItems' : '/searchItems';
                const response = await axios.post(
                    `http://localhost:3000${url}`,
                    { searchItem },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                if (url === '/filterItems') {
                    setSelectedFilter(response.data);
                    if (response.data.length === 0) {
                        setNoResultData(response.data);
                    }
                } else {
                    setProduct(response.data);
                    if (response.data.length === 0) {
                        setNoResultData(response.data);
                    }
                }

            } catch (err) {
                if (err.response?.status === 404) {
                    setNoResultData(response.data);
                } else {
                    alert('Error fetching products: ' + err.message);
                }
            }
        };

        if (searchItem) {
            fetchData();
        }
    }, [searchItem]);

    const navigate = useNavigate();
    const productDetails = (PID) => {
        navigate(`/product?pid=${PID}`);

    };

    return (
        <>
            <Nav />
            <Filter />
            <div className="flex flex-col gap-2 py-4" id="product">
                <div className="flex py-3 xl:px-14 lg:px-16 md:px-18 sm:px-6 px-4">
                    <h1 className="text-xl font-semibold">Search Results</h1>
                </div>

                {product.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-3 h-auto w-full">
                        {product.map(data => (
                            <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]" key={data.product_id}>
                                <div className="relative">
                                    <div className="cursor-pointer">
                                        {JSON.parse(data.proImage)[0] && (
                                            <img
                                                className="w-full"
                                                src={`http://localhost:3000/productImage/${JSON.parse(data.proImage)[0]}`}
                                                alt="Product Image"
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
                                    <p className="text-gray-800 text-sm mb-4">
                                        {data.type}
                                    </p>
                                    {(() => {
                                        const postDate = new Date(data.submitted);
                                        const durationInDays = data.days || 0;

                                        if (isNaN(postDate.getTime())) {
                                            return <p className="text-red-800 text-[13px]">Invalid date</p>;
                                        }

                                        const endDate = new Date(postDate);
                                        endDate.setDate(endDate.getDate() + durationInDays);

                                        const month = String(endDate.getMonth() + 1).padStart(2, '0');
                                        const day = String(endDate.getDate()).padStart(2, '0');
                                        const year = endDate.getFullYear();
                                        let hours = endDate.getHours();
                                        const minutes = String(endDate.getMinutes()).padStart(2, '0');
                                        const ampm = hours >= 12 ? 'PM' : 'AM';
                                        hours = hours % 12 || 12;

                                        const formatted = `${month}-${day}-${year}, ${hours}:${minutes} ${ampm}`;

                                        if (endDate < new Date()) {
                                            return <p className="text-red-800 text-[13px] font-semibold">Auction Ended</p>;
                                        }
                                        return <p className="text-red-800 text-[13px]">Ends at {formatted}</p>;
                                    })()}
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-lg">Rs.{data.price}</span>
                                        <button className="bg-transparent text-gray-900 border border-gray-800 rounded-[100px] font-bold py-2 px-4 text-[13px] hover:bg-black hover:text-white outline-none cursor-pointer" onClick={() => productDetails(data.product_id)}>
                                            Bid Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : selectedFilter.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-3 h-auto w-full">
                        {selectedFilter.map(data => (
                            <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]" key={data.product_id}>
                                <div className="relative">
                                    <div className="cursor-pointer">
                                        {JSON.parse(data.proImage)[0] && (
                                            <img
                                                className="w-full"
                                                src={`http://localhost:3000/productImage/${JSON.parse(data.proImage)[0]}`}
                                                alt="Product Image"
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
                                    <p className="text-gray-800 text-sm mb-4">
                                        {data.type}
                                    </p>
                                    {(() => {
                                        const postDate = new Date(data.submitted);
                                        const durationInDays = data.days || 0;

                                        if (isNaN(postDate.getTime())) {
                                            return <p className="text-red-800 text-[13px]">Invalid date</p>;
                                        }

                                        const endDate = new Date(postDate);
                                        endDate.setDate(endDate.getDate() + durationInDays);

                                        const month = String(endDate.getMonth() + 1).padStart(2, '0');
                                        const day = String(endDate.getDate()).padStart(2, '0');
                                        const year = endDate.getFullYear();
                                        let hours = endDate.getHours();
                                        const minutes = String(endDate.getMinutes()).padStart(2, '0');
                                        const ampm = hours >= 12 ? 'PM' : 'AM';
                                        hours = hours % 12 || 12;

                                        const formatted = `${month}-${day}-${year}, ${hours}:${minutes} ${ampm}`;

                                        return <p className="text-red-800 text-[13px]">Ends at {formatted}</p>;
                                    })()}
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-lg">Rs.{data.price}</span>
                                        <button className="bg-transparent text-gray-900 border border-gray-800 rounded-[100px] font-bold py-2 px-4 text-[13px] hover:bg-black hover:text-white outline-none cursor-pointer" onClick={() => productDetails(data.product_id)}>
                                            Bid Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : noResultData.length === 0 ? (
                    <div className="flex flex-wrap justify-center gap-3 h-auto w-full">
                        <div className="w-full flex justify-center items-center py-10">
                            <div className="text-center">
                                <img src={sad} alt="No Results" className="w-48 mx-auto mb-4" />
                                <p className="text-lg text-gray-600 font-medium">No result found for {searchItem}</p>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <Footer />
        </>
    )
}

export default Outersearch
