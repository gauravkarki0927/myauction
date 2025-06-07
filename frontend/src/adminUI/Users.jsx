import React, { useState, useEffect, useRef } from 'react';
import img1 from '../pictures/user.jpg';
import API from '../api/API';
import { BASE_URL } from '../api/BaseUrrlForImage';
import toast from 'react-hot-toast'

function Tets() {
    const [activeSection, setActiveSection] = useState('records');
    const [profilePicSrc, setProfilePicSrc] = useState(img1);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({});

    const inputFileRef = useRef(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await API.get('/users');
                setUsers(response.data);
            } catch (err) {
                toast.error('Error fetching data!', {position: "top-right"});
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            setFormData({ ...selectedUser });
            setProfilePicSrc(
                selectedUser.user_profile
                    ? `${BASE_URL}/uploads/${selectedUser.user_profile}`
                    : img1
            );
        }
    }, [selectedUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicSrc(URL.createObjectURL(file));
            setFormData((prev) => ({
                ...prev,
                user_profile_file: file,
            }));
        }
    };

    const handleUploadClick = () => {
        inputFileRef.current.click();
    };

    const handleButtonClick = (sectionId, user = null) => {
        setActiveSection(sectionId);
        if (sectionId === 'edit') {
            setSelectedUser(user);
        }
    };

    const handleDeleteClick = async (userId) => {
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                const response = await API.delete(`/delete/${userId}`);
                toast.success(response.data.message || 'User deleted successfully', {position: "top-right"});
                setUsers(users.filter(user => user.user_id !== userId));
            } catch (error) {
                alert('Error deleting user');
            }
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await API.post('/updateUser', formData);
            if (response.status = 200) {
                toast.success('User updated successfully', {position: "top-right"});
                setActiveSection('records');

                const updatedUsers = await API.get('/users');
                setUsers(updatedUsers.data);
            }
        } catch (err) {
                toast.error('Update failed. Please try again.', {position: "top-right"});
        }
    };

    return (
        <>
            <div id="records" className={`overflow-x-auto bg-white p-2 ${activeSection === 'records' ? 'block' : 'hidden'}`}>
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
                                    <img className="h-12" src={user.user_profile ? `${BASE_URL}/uploads/${user.user_profile}` : profilePicSrc} alt="" />
                                </td>
                                <td className="py-3 px-6 text-left">{user.user_name}</td>
                                <td className="py-3 px-6 text-left">{user.user_email}</td>
                                <td className="py-3 px-6 text-left">{user.user_phone}</td>
                                <td className="py-3 px-6 text-left">{user.user_street}</td>
                                <td className="py-3 px-6 text-left">{user.user_district}</td>
                                <td className="py-3 px-6 text-left">{user.user_state}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" onClick={() => handleButtonClick('edit', user)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110" onClick={() => handleDeleteClick(user.user_id)}>
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
            </div>

            <div id="edit" className={`p-2 ${activeSection === 'edit' ? 'block' : 'hidden'}`}>
                <div className="flex flex-col md:flex-row">
                    <main className="flex-1">
                        {selectedUser && (
                            <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-md px-4 sm:px-6 py-2">
                                <div className="flex flex-wrap justify-around w-full">
                                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Management</h3>
                                        <div className="flex flex-col items-center px-4">
                                            <div className="w-36 h-42 rounded overflow-hidden mb-4">
                                                <img src={profilePicSrc} alt="User Avatar" className="w-full h-full object-cover" />
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
                                                    onClick={handleUploadClick}
                                                >
                                                    Upload Photo
                                                </label>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2">
                                            <div>
                                                <label className="block text-sm font-medium text-[#1b1b1ee6] my-2">User Login</label>
                                                <input
                                                    name="user_email"
                                                    type="email"
                                                    placeholder="login email"
                                                    value={formData.user_email || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full border-gray-300 text-[14px] placeholder:text-[14px] outline-none px-2 py-1 rounded border border-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1b1b1ee6] my-2">User Password</label>
                                                <input
                                                    name="password"
                                                    type="password"
                                                    placeholder="********"
                                                    onChange={handleInputChange}
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
                                                        name="user_name"
                                                        type="text"
                                                        value={formData.user_name || ''}
                                                        onChange={handleInputChange}
                                                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    />
                                                    <input type="hidden" name="user_id" value={users.user_id}
                                                        onChange={handleInputChange} />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[#1b1b1ee6]">State</label>
                                                    <input
                                                        name="user_state"
                                                        type="text"
                                                        value={formData.user_state || ''}
                                                        onChange={handleInputChange}
                                                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[#1b1b1ee6]">District</label>
                                                    <input
                                                        name="user_district"
                                                        type="text"
                                                        value={formData.user_district || ''}
                                                        onChange={handleInputChange}
                                                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[#1b1b1ee6]">Street/Village</label>
                                                    <input
                                                        name="user_street"
                                                        type="text"
                                                        value={formData.user_street || ''}
                                                        onChange={handleInputChange}
                                                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Info</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-[#1b1b1ee6]">Contact</label>
                                                    <input
                                                        name="user_phone"
                                                        type="text"
                                                        value={formData.user_phone || ''}
                                                        onChange={handleInputChange}
                                                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[#1b1b1ee6]">Postal</label>
                                                    <input
                                                        name="user_postal"
                                                        type="text"
                                                        value={formData.user_postal || ''}
                                                        onChange={handleInputChange}
                                                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[#1b1b1ee6]">WhatsApp</label>
                                                    <input
                                                        name="whatsapp"
                                                        type="text"
                                                        value={formData.whatsapp || ''}
                                                        onChange={handleInputChange}
                                                        className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[#1b1b1ee6]">Website</label>
                                                    <input
                                                        name="website"
                                                        type="text"
                                                        value={formData.website || ''}
                                                        onChange={handleInputChange}
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
                                        value={formData.bio || ''}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 border-gray-300 text-gray-700 text-[14px] outline-none p-2 rounded border border-gray-50 resize-none"
                                        rows="4"
                                    ></textarea>
                                </div>
                                <div className="my-2 flex justify-end items-center">
                                    <button
                                        type="submit"
                                        className="border border-gray-200 px-4 py-2 bg-black text-white outline-none cursor-pointer text-[13px] font-semibold rounded-md"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}

export default Tets;
