import React from 'react'
import user from '../pictures/user.jpg';

function Update() {
    return (
        <>
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Profile</th>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Contact</th>
                        <th className="py-3 px-6 text-left">Street</th>
                        <th className="py-3 px-6 text-left">District</th>
                        <th className="py-3 px-6 text-left">State</th>
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
                        <td className="py-3 px-6 text-left">Lumbini</td>
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
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">2</td>
                        <td className="py-3 px-6 text-left">
                            <img className="h-12" src={user} alt="" />
                        </td>
                        <td className="py-3 px-6 text-left">Ayyam Perumal</td>
                        <td className="py-3 px-6 text-left">ayyam@kerala.com</td>
                        <td className="py-3 px-6 text-left">9801201201</td>
                        <td className="py-3 px-6 text-left">Divertole</td>
                        <td className="py-3 px-6 text-left">Rupandehi</td>
                        <td className="py-3 px-6 text-left">Lumbini</td>
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
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">3</td>
                        <td className="py-3 px-6 text-left">
                            <img className="h-12" src={user} alt="" />
                        </td>
                        <td className="py-3 px-6 text-left">George Thomas</td>
                        <td className="py-3 px-6 text-left">george@kerala.com</td>
                        <td className="py-3 px-6 text-left">9876543212</td>
                        <td className="py-3 px-6 text-left">Divertole</td>
                        <td className="py-3 px-6 text-left">Rupandehi</td>
                        <td className="py-3 px-6 text-left">Lumbini</td>
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
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">4</td>
                        <td className="py-3 px-6 text-left">
                            <img className="h-12" src={user} alt="" />
                        </td>
                        <td className="py-3 px-6 text-left">Vasudev Menon</td>
                        <td className="py-3 px-6 text-left">vasudev@kerala.com</td>
                        <td className="py-3 px-6 text-left">9812345678</td>
                        <td className="py-3 px-6 text-left">Divertole</td>
                        <td className="py-3 px-6 text-left">Rupandehi</td>
                        <td className="py-3 px-6 text-left">Lumbini</td>
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
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">5</td>
                        <td className="py-3 px-6 text-left">
                            <img className="h-12" src={user} alt="" />
                        </td>
                        <td className="py-3 px-6 text-left">Mandan Pillai</td>
                        <td className="py-3 px-6 text-left">mandan@kerala.com</td>
                        <td className="py-3 px-6 text-left">9876543212</td>
                        <td className="py-3 px-6 text-left">Divertole</td>
                        <td className="py-3 px-6 text-left">Rupandehi</td>
                        <td className="py-3 px-6 text-left">Lumbini</td>
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
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
