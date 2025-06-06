import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import sad from '../../pictures/sad.png';
import Navigation from './Navigation';
import Filter from '../Filter';
import Footer from '../Footer';

function Innersearch() {
    const [product, setProduct] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const location = useLocation();
    const searchItem = location.state?.searchItem || '';
    const navigate = useNavigate();

    // Check user auth
    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                await axios.get("http://localhost:3000/access/myitems", {
                    headers: { Authorization: `Bearer ${token}` }
                });

            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };
        getUserData();
    }, []);

    // Fetch data when searchItem changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = searchItem.includes('items') ? '/filterItems' : '/searchItems';
                const response = await axios.post(
                    `http://localhost:3000${url}`,
                    { searchItem },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                const isEmpty = response.data.length === 0;
                setNoResults(isEmpty);

                if (url === '/filterItems') {
                    setSelectedFilter(response.data);
                    setProduct([]);
                } else {
                    setProduct(response.data);
                    setSelectedFilter([]);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setProduct([]);
                setSelectedFilter([]);
                setNoResults(true);
            }
        };

        if (searchItem) {
            fetchData();
        }
    }, [searchItem]);

    const productDetails = (PID) => {
        navigate(`/innerproduct?pid=${PID}`);
    };

    const renderProductCard = (data) => {
        const image = JSON.parse(data.proImage || '[]')[0];
        const postDate = new Date(data.submitted);
        const durationInDays = data.days || 0;
        const endDate = new Date(postDate);
        endDate.setDate(endDate.getDate() + durationInDays);
        const now = new Date();

        let endDateText = 'Invalid date';
        if (!isNaN(postDate.getTime())) {
            if (endDate < now) {
                endDateText = 'Auction Ended';
            } else {
                const month = String(endDate.getMonth() + 1).padStart(2, '0');
                const day = String(endDate.getDate()).padStart(2, '0');
                const year = endDate.getFullYear();
                let hours = endDate.getHours();
                const minutes = String(endDate.getMinutes()).padStart(2, '0');
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12 || 12;
                endDateText = `Ends at ${month}-${day}-${year}, ${hours}:${minutes} ${ampm}`;
            }
        }

        return (
            <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]" key={data.product_id}>
                <div className="relative">
                    <div className="cursor-pointer">
                        {image && (
                            <img
                                className="w-full"
                                src={`http://localhost:3000/productImage/${image}`}
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
                    <p className="text-red-800 text-[13px] font-semibold">{endDateText}</p>
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
    };

    return (
        <>
            <Navigation />
            <Filter />

            <div className="flex flex-col gap-2 py-4" id="product">
                <div className="flex py-3 xl:px-14 lg:px-16 md:px-18 sm:px-6 px-4">
                    <h1 className="text-xl font-semibold">Search Results</h1>
                </div>

                {(product.length > 0 || selectedFilter.length > 0) ? (
                    <div className="flex flex-wrap justify-center gap-3 h-auto w-full">
                        {(product.length > 0 ? product : selectedFilter).map(renderProductCard)}
                    </div>
                ) : noResults ? (
                    <div className="flex justify-center items-center py-10 w-full">
                        <div className="text-center">
                            <img src={sad} alt="No Results" className="w-48 mx-auto mb-4" />
                            <p className="text-lg text-gray-600 font-medium">
                                No result found for "{searchItem}"
                            </p>
                        </div>
                    </div>
                ) : null}
            </div>

            <Footer />
        </>
    );
}

export default Innersearch;
