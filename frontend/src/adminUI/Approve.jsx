import React, { useState, useEffect } from 'react';
import axios from 'axios';
import user from '../pictures/user.jpg';

function Approve() {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:3000/allitems');
                setProduct(response.data);
            } catch (err) {
                alert('Error fetching products:', err);
            }
        };

        fetchProduct();
    }, []);

    const handleApproveClick = async (proID) => {
        const smt = confirm("Are you sure you want to approve this post?");
        if (smt) {
            try {
                const response = await fetch(`http://localhost:3000/approvePro/${proID}`, {
                    method: 'POST',
                });

                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                } else {
                    const errorData = await response.json();
                    alert('Error approving post:', errorData.error || errorData.message);
                }
            } catch (error) {
                alert('Network error:', error);
            }
        }
    };

    const handleDeleteClick = async (proID) => {
        const smt = confirm("Are you sure you want to delete this user?");
        if (smt) {
            try {
                const response = await fetch(`http://localhost:3000/deletepro/${proID}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                } else {
                    const errorData = await response.json();
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
                        <th className="py-3 px-6 text-left">ProductID</th>
                        <th className="py-3 px-6 text-left">UserID</th>
                        <th className="py-3 px-6 text-left">Image</th>
                        <th className="py-3 px-6 text-left">Product Name</th>
                        <th className="py-3 px-6 text-left">Other Name</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Submitted</th>
                        <th className="py-3 px-6 text-left">Auction Days</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {product.map(data => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={data.pid}>
                            <td className="py-3 px-6 text-left">{data.pid}</td>
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
                            <td className="py-3 px-6 text-left">{data.Price}</td>
                            <td className="py-3 px-6 text-left">{data.type}</td>
                            <td className="py-3 px-6 text-left">{data.submitted}</td>
                            <td className="py-3 px-6 text-left">{data.days}</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                        <i className="fa-regular fa-eye text-yellow-500"></i>
                                    </button>
                                    <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" onClick={() => handleApproveClick(data.pid)}>
                                        <i className="fa-solid fa-check text-green-500"></i>
                                    </button>
                                    <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110" onClick={() => handleDeleteClick(data.pid)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

export default Approve
