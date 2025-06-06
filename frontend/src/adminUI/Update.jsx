import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../api/API';

function Update() {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await API.get('/updateItems');
                setProduct(response.data);
            } catch (err) {
                alert('Error fetching products:', err);
            }
        };

        fetchProduct();
    }, []);

    const handleApproveClick = async (proID) => {
        const smt = confirm("Are you sure you want to approve this request?");
        if (smt) {
            try {
                const response = await API.put(`http://localhost:3000/approveUpdate/${proID}`);

                if (response.ok) {
                    const data = await response.data;
                    alert(data.message);
                } else {
                    const errorData = await response.error;
                    alert('Error approving post: ' + (errorData.error || errorData.message));
                }
            } catch (error) {
                alert('Network error: ' + error.message);
            }
        }
    };

    const handleDeleteClick = async (proID) => {
        const smt = confirm("Are you sure you want to delete this request?");
        if (smt) {
            try {
                const response = await API.delete(`/deleteUpdate/${proID}`);

                if (response.ok) {
                    const data = response.data;
                    alert(data.message);
                } else {
                    const errorData = response.data;
                    alert('Error deleting user:', errorData.error || errorData.message);
                }
            } catch (error) {
                alert('Network error:', error);
            }
        }
    };

    return (
        <>
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">PID</th>
                        <th className="py-3 px-6 text-left">Update ID</th>
                        <th className="py-3 px-6 text-left">Image</th>
                        <th className="py-3 px-6 text-left">Product Name</th>
                        <th className="py-3 px-6 text-left">Other Name</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Type</th>
                        <th className="py-3 px-6 text-left">Submitted</th>
                        <th className="py-3 px-6 text-left">Auction Days</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {product.map(data => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={data.product_id}>
                            <td className="py-3 px-6 text-left">{data.product_id}</td>
                            <td className="py-3 px-6 text-left">{data.update_id}</td>
                            <td className="py-3 px-6 text-left">
                                {JSON.parse(data.proImage)[0] && (
                                    <img
                                        className="h-12"
                                        src={`http://localhost:3000/productImage/${JSON.parse(data.proImage)[0]}`}
                                        alt="Product Image"
                                    />
                                )}
                            </td>
                            <td className="py-3 px-6 text-left">{data.productName}</td>
                            <td className="py-3 px-6 text-left">{data.otherName}</td>
                            <td className="py-3 px-6 text-left">{data.price}</td>
                            <td className="py-3 px-6 text-left">{data.type}</td>
                            <td className="py-3 px-6 text-left">{data.submitted}</td>
                            <td className="py-3 px-6 text-left">{data.days}</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center gap-4 justify-center">
                                    <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" onClick={() => handleApproveClick(data.update_id)}>
                                        <i className="fa-solid fa-check text-green-500"></i>
                                    </button>
                                    <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110" onClick={() => handleDeleteClick(data.update_id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Update
