import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import img1 from '../pictures/user.jpg';

function Users() {

    const [activeSection, setActiveSection] = useState('records');
    const [profilePicSrc, setProfilePicSrc] = useState(img1);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUsers(response.data);
            } catch (err) {
                alert('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, []);

    const inputFileRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicSrc(URL.createObjectURL(file));
        }
    };

    const handleUploadClick = () => {
        inputFileRef.current.click();
    };

    const handleButtonClick = (sectionId) => {
        setActiveSection(sectionId);
    };

    const handleDeleteClick = async (userId) => {
        const smt = confirm("Are you sure you want to delete this user?");
        if (smt) {
            try {
                const response = await fetch(`http://localhost:3000/delete/${userId}`, {
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
            <div id="records" className={`overflow-x-auto bg-white p-2 ${activeSection === 'records' ? 'block' : 'hidden'
                }`}
            >
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
                        {users.map(user => (
                            <tr className="border-b border-gray-200 hover:bg-gray-100" key={user.user_id}>
                                <td className="py-3 px-6 text-left">{user.user_id}</td>
                                <td className="py-3 px-6 text-left">
                                    <img className="h-12" src={user.user_profile ? `http://localhost:3000/uploads/${user.user_profile}` : profilePicSrc}alt="" />
                                </td>
                                <td className="py-3 px-6 text-left">{user.user_name}</td>
                                <td className="py-3 px-6 text-left">{user.user_email}</td>
                                <td className="py-3 px-6 text-left">{user.user_phone}</td>
                                <td className="py-3 px-6 text-left">{user.user_street}</td>
                                <td className="py-3 px-6 text-left">{user.user_district}</td>
                                <td className="py-3 px-6 text-left">{user.user_state}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" onClick={() => handleButtonClick('edit')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110" onClick={() => handleDeleteClick(user.user_id)}>
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
            </div>
            <div id="edit" className={`p-2 ${activeSection === 'edit' ? 'block' : 'hidden'
                }`}
            >
                <div className="flex flex-col md:flex-row">
                    <main className="flex-1">
                    {users.map(user => (
                        <form className="bg-white rounded-lg shadow-md px-4 sm:px-6 py-2" key={user.user_id}>
                            <div className="flex flex-wrap justify-around w-full">
                                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Management</h3>
                                    <div className="flex flex-col items-center px-4">
                                        <div className="w-36 h-42 rounded overflow-hidden mb-4">
                                            <img src={user.user_profile ? `http://localhost:3000/uploads/${user.user_profile}` : profilePicSrc} alt="User Avatar" className="w-full h-full object-cover" />
                                        </div>

                                        <div className="w-full flex justify-center items-center h-12 rounded border border-gray-200 bg-gray-100">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="image"
                                                ref={inputFileRef}
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                            />
                                            <label
                                                htmlFor="image"
                                                className="text-gray-600 border border-gray-200 px-16 py-1 bg-white outline-none cursor-pointer text-[13px] font-semibold rounded-md"
                                            >
                                                Upload Photo
                                            </label>
                                        </div>

                                    </div>
                                    <div className="px-4 py-2">
                                        <div>
                                            <label className="block text-sm font-medium text-[#1b1b1ee6] my-2">User Login</label>
                                            <input
                                                name="email"
                                                type="email"
                                                placeholder="Your login email"
                                                value={user.user_email}
                                                className="w-full border-gray-300 text-[14px] placeholder:text-[14px] outline-none px-2 py-1 rounded border border-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#1b1b1ee6] my-2">User Password</label>
                                            <input
                                                name="password"
                                                type="password"
                                                placeholder="Your password.."
                                                className="w-full border-gray-300 placeholder:text-[14px] outline-none px-2 py-1 rounded border border-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-3/4 space-y-8">
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
                                            <div className="cursor-pointer" onClick={() => handleButtonClick('records')}>
                                                <i className="fa-solid fa-circle-xmark text-[20px] text-red-600"></i>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#1b1b1ee6]">Username</label>
                                                <input
                                                    name="user"
                                                    type="text"
                                                    className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    value={user.user_name}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1b1b1ee6]">State</label>
                                                <input
                                                    name="state"
                                                    type="text"
                                                    className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    value={user.user_state}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1b1b1ee6]">District</label>
                                                <input
                                                    name="district"
                                                    type="text"
                                                    className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    value={user.user_district}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1b1b1ee6]">Street/Village</label>
                                                <input
                                                    name="street"
                                                    type="text"
                                                    className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    value={user.user_street}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Info</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#1b1b1ee6]">Postal</label>
                                                <input
                                                    name="postal"
                                                    type="postal"
                                                    className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    value=""
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1b1b1ee6]">WhatsApp</label>
                                                <input
                                                    name="social1"
                                                    type="text"
                                                    className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1b1b1ee6]">Website</label>
                                                <input
                                                    name="social2"
                                                    type="text"
                                                    className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1b1b1ee6]">Telegram</label>
                                                <input
                                                    name="social3"
                                                    type="text"
                                                    className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">About the User</h3>
                                <textarea
                                    name="bio"
                                    className="w-full mt-1 border-gray-300 text-gray-700 text-[14px] outline-none p-2 rounded border border-gray-50 resize-none"
                                    rows="4"
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </textarea>
                            </div>
                            <div className="my-2 flex justify-end items-center">
                                <button type="submit" className="border border-gray-200 px-4 py-2 bg-black text-white outline-none cursor-pointer text-[13px] font-semibold rounded-md">
                                    Update
                                </button>
                            </div>
                        </form>
                    ))}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Users
