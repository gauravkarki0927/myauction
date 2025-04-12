import React from 'react'
import user from '../pictures/user.jpg';

function Update() {
    return (
        <>
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">PID</th>
                        <th className="py-3 px-6 text-left">UID</th>
                        <th className="py-3 px-6 text-left">Image</th>
                        <th className="py-3 px-6 text-left">Product Name</th>
                        <th className="py-3 px-6 text-left">Other Name</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Auction Days</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">1</td>
                        <td className="py-3 px-6 text-left">
                            <img className="h-12" src={user} alt="" />
                        </td>
                        <td className="py-3 px-6 text-left">Abhiraj k</td>
                        <td className="py-3 px-6 text-left">abhi@kerala.com</td>
                        <td className="py-3 px-6 text-left">9812345678</td>
                        <td className="py-3 px-6 text-left">Divertole</td>
                        <td className="py-3 px-6 text-left">Rupandehi</td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                                <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                    <i className="fa-regular fa-eye text-yellow-500"></i>
                                </button>
                                <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                    <i className="fa-solid fa-check text-green-500"></i>
                                </button>
                                <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Update
