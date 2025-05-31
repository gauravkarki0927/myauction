import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import logo from '../pictures/auclogo.jpg';
import Addproduct from './Addproduct';
import Adduser from './Adduser';
import Sendmail from './Sendmail';
import Admin from './Admin';
import Editprofile from './Editprofile';
import Userreview from './Userreview';
import Users from './Users';
import Items from './Items';
import Approve from './Approve';
import Update from './Update';
import Recipts from './Recipts';

function Admindash() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const handleButtonClick = (sectionId) => {
        setActiveSection(sectionId);
    };

    const [user_id, setUser_id] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get("http://localhost:3000/access/userdash", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUser_id(response.data.userId);
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };
        getUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <>
            <div className="w-full h-auto">
                <div className="flex justify-between items-center px-4 py-1">
                    <div>
                        <p className="font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                            <a className="outline-none" href="/admin">
                                <span className="text-rose-700">My</span>Auction
                            </a>
                        </p>
                    </div>

                    <div className="flex justify-center items-center gap-2 md:gap-4">
                        <img className="h-6 sm:h-8 md:h-10 lg:h-12" src={logo} alt="Logo" />
                        <p className="hidden md:block text-xl md:text-2xl lg:text-3xl font-semibold p-0 m-0">
                            Online Auction System
                        </p>
                    </div>

                    <div className="flex gap-2 md:gap-4 items-center text-sm md:text-md lg:text-lg px-2 md:px-4 lg:px-8">
                        <button onClick={() => handleButtonClick('notify')}>
                            <i className="fa-regular fa-bell text-blue-700 cursor-pointer border border-gray-100 p-1 md:p-2 bg-gray-100 hover:bg-blue-700 hover:text-white rounded-full"></i>
                        </button>
                        <button onClick={() => handleButtonClick('sendmail')}>
                            <i className="fa-regular fa-envelope text-red-600 cursor-pointer border border-gray-100 p-1 md:p-2 bg-gray-100 hover:bg-red-600 hover:text-white rounded-full"></i>
                        </button>
                        <button onClick={handleLogout}>
                            <i className="fa-solid fa-right-to-bracket cursor-pointer border border-gray-100 p-1 md:p-2 bg-gray-100 hover:bg-black hover:text-white rounded-full"></i>
                        </button>
                    </div>
                </div>
                <div className="w-full flex gap-2 p-2">
                    <div className="w-1/5 block space-y-2 text-[14px] font-semibold md:block md:space-y-2 md:text-[14px] md:font-semibold">
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'dashboard' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('dashboard')}
                        >
                            <i className="fa-regular fa-window-restore mx-2"></i> <span className="hidden lg:inline">DashBoard</span>
                        </button>
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'approve' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('approve')}
                        >
                            <i className="fa-solid fa-square-check mx-2"></i> <span className="hidden lg:inline">Approve Request</span>
                        </button>
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'updatereq' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('updatereq')}
                        >
                            <i className="fa-solid fa-pen-to-square mx-2"></i> <span className="hidden lg:inline">Update Request</span>
                        </button>
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'allitems' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('allitems')}
                        >
                            <i className="fa-solid fa-list mx-2"></i> <span className="hidden lg:inline">View Items</span>
                        </button>
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'users' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('users')}
                        >
                            <i className="fa-solid fa-users mx-2"></i> <span className="hidden lg:inline">View Users</span>
                        </button>
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'recipt' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('recipt')}
                        >
                            <i className="fa-regular fa-clipboard mx-2"></i> <span className="hidden lg:inline">Checkout Recipt</span>
                        </button>
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'reviews' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('reviews')}
                        >
                            <i className="fa-brands fa-readme mx-2"></i> <span className="hidden lg:inline">User Reviews</span>
                        </button>
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'adduser' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('adduser')}
                        >
                            <i className="fa-solid fa-user-plus mx-2"></i> <span className="hidden lg:inline">Add User</span>
                        </button>
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'additems' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('additems')}
                        >
                            <i className="fa-solid fa-plus mx-2"></i> <span className="hidden lg:inline">Add Items</span>
                        </button>
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'profile' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('profile')}
                        >
                            <i className="fa-solid fa-user mx-2"></i> <span className="hidden lg:inline">Admin Profile</span>
                        </button>
                        <button
                            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'editprofile' ? 'bg-gray-600 text-white' : ''
                                }`}
                            onClick={() => handleButtonClick('editprofile')}
                        >
                            <i className="fa-solid fa-user-pen mx-2"></i> <span className="hidden lg:inline">Edit Admin Profile</span>
                        </button>
                    </div>
                    <div className="w-4/5 border-l border-t border-gray-200">
                        <div
                            id="dashboard"
                            className={`h-[600px] w-full overflow-y-scroll ${activeSection === 'dashboard' ? 'block' : 'hidden'
                                }`} >
                            <div className="w-full">
                                <div className="flex flex-wrap md:flex-nowrap bg-gray-100 p-2 justify-between gap-2 mb-4">
                                    <div className="bg-white w-full sm:w-1/2 md:w-1/4 rounded p-2">
                                        <p className="text-xs sm:text-sm md:text-[14px]">Total user</p>
                                        <h1 className="text-sm sm:text-md md:text-[18px] font-semibold px-2 sm:px-4">
                                            5 in total
                                        </h1>
                                        <div className="flex gap-1 text-[10px] sm:text-[12px] md:text-[13px] items-center px-1 sm:px-2">
                                            <i className="fa-solid fa-arrow-up text-green-700"></i>
                                            <i className="fa-solid fa-arrow-down text-red-700"></i>
                                            <span>Since last time</span>
                                        </div>
                                    </div>

                                    <div className="bg-white w-full sm:w-1/2 md:w-1/4 rounded p-2">
                                        <p className="text-xs sm:text-sm md:text-[14px]">Total product</p>
                                        <h1 className="text-sm sm:text-md md:text-[18px] font-semibold px-2 sm:px-4">
                                            5 in total
                                        </h1>
                                        <div className="flex gap-1 text-[10px] sm:text-[12px] md:text-[13px] items-center px-1 sm:px-2">
                                            <i className="fa-solid fa-arrow-up text-green-700"></i>
                                            <i className="fa-solid fa-arrow-down text-red-700"></i>
                                            <span>Since last time</span>
                                        </div>
                                    </div>

                                    <div className="bg-white w-full sm:w-1/2 md:w-1/4 rounded p-2">
                                        <p className="text-xs sm:text-sm md:text-[14px]">Total reviews</p>
                                        <h1 className="text-sm sm:text-md md:text-[18px] font-semibold px-2 sm:px-4">
                                            5 in total
                                        </h1>
                                        <div className="flex gap-1 text-[10px] sm:text-[12px] md:text-[13px] items-center px-1 sm:px-2">
                                            <i className="fa-solid fa-arrow-up text-green-700"></i>
                                            <i className="fa-solid fa-arrow-down text-red-700"></i>
                                            <span>Since last time</span>
                                        </div>
                                    </div>

                                    <div className="bg-white w-full sm:w-1/2 md:w-1/4 rounded p-2">
                                        <p className="text-xs sm:text-sm md:text-[14px]">Total ratio</p>
                                        <h1 className="text-sm sm:text-md md:text-[18px] font-semibold px-2 sm:px-4">
                                            5 in total
                                        </h1>
                                        <div className="flex gap-1 text-[10px] sm:text-[12px] md:text-[13px] items-center px-1 sm:px-2">
                                            <i className="fa-solid fa-arrow-up text-green-700"></i>
                                            <i className="fa-solid fa-arrow-down text-red-700"></i>
                                            <span>Since last time</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 w-full p-2 mb-4 flex justify-around">
                                    <form className="flex gap-2 bg-white w-[300px] px-2 rounded-md border border-gray-200 text-[14px]">
                                        <input type="text"
                                            name="usersearch"
                                            placeholder="Search user..."
                                            className="outline-none px-2 py-1 w-full"
                                        />
                                        <button className="cursor-pointer"
                                            type="submit">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                    </form>
                                    <form className="flex gap-2 bg-white w-[300px] px-2 rounded-md border border-gray-200 text-[14px]">
                                        <input type="text"
                                            name="usersearch"
                                            placeholder="Search product..."
                                            className="outline-none px-2 py-1 w-full"
                                        />
                                        <button className="cursor-pointer"
                                            type="submit">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                    </form>
                                </div>

                                <div>Search Result</div>
                            </div>
                        </div>
                        <div
                            id="approve"
                            className={`h-[600px] w-full overflow-y-scroll p-2 ${activeSection === 'approve' ? 'block' : 'hidden'
                                }`} >
                            <Approve />
                        </div>
                        <div
                            id="updatereq"
                            className={`h-[600px] w-full overflow-y-scroll p-2 ${activeSection === 'updatereq' ? 'block' : 'hidden'
                                }`} >
                            <Update />
                        </div>
                        <div
                            id="allitems"
                            className={`h-[600px] w-full overflow-y-scroll ${activeSection === 'allitems' ? 'block' : 'hidden'
                                }`} >
                            <Items />
                        </div>
                        <div
                            id="users"
                            className={`h-[600px] w-full overflow-y-scroll ${activeSection === 'users' ? 'block' : 'hidden'
                                }`} >
                            <Users />
                        </div>
                        <div
                            id="recipt"
                            className={`h-[600px] w-full overflow-y-scroll p-2 ${activeSection === 'recipt' ? 'block' : 'hidden'
                                }`} >
                            <Recipts />
                        </div>
                        <div
                            id="reviews"
                            className={`h-[600px] w-full overflow-y-scroll ${activeSection === 'reviews' ? 'block' : 'hidden'
                                }`} >
                            <Userreview />
                        </div>
                        <div
                            id="adduser"
                            className={`h-[600px] w-full overflow-y-scroll ${activeSection === 'adduser' ? 'block' : 'hidden'
                                }`} >
                            <Adduser />
                        </div>
                        <div
                            id="additems"
                            className={`h-[600px] w-full overflow-y-scroll ${activeSection === 'additems' ? 'block' : 'hidden'
                                }`} >
                            <Addproduct />
                        </div>
                        <div
                            id="profile"
                            className={`h-[600px] w-full overflow-y-scroll ${activeSection === 'profile' ? 'block' : 'hidden'
                                }`} >
                            <Admin uid={user_id} />
                        </div>
                        <div
                            id="editprofile"
                            className={`h-[600px] w-full overflow-y-scroll ${activeSection === 'editprofile' ? 'block' : 'hidden'
                                }`} >
                            <Editprofile ussid={user_id} />
                        </div>
                        <div
                            id="notify"
                            className={`h-[600px] w-full overflow-y-scroll bg-black ${activeSection === 'notify' ? 'block' : 'hidden'
                                }`} >
                            Notification
                        </div>
                        <div
                            id="sendmail"
                            className={`h-[600px] w-full overflow-y-scroll ${activeSection === 'sendmail' ? 'block' : 'hidden'
                                }`} >
                            <Sendmail />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admindash
