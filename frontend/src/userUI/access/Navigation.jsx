import React, { useState } from 'react';

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="w-full flex justify-between items-center border-b border-gray-300 xl:px-16 lg:px-12 md:px-10 px-6 py-3 fixed top-0 left-0 bg-white z-1000">
                <div>
                    <p className="font-semibold text-[24px] xl:text-[20px] md:text[16px]"> <a href="/"><span className="text-rose-700">My</span>Auction</a> </p>
                </div>
                <div className="flex text-[13px] gap-2 px-2 items-center py-[6px] border-none bg-gray-100 rounded-[50px] xl:w-[600px] lg:w-[400px] md:w-[500px] sm:w-[400px] w-[160px]">
                    <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                    <input className="outline-none text-gray-800 w-full" type="text" placeholder="Search your items here...." />
                </div>
                <div className="hidden xl:flex lg:flex">
                    <ul className="flex gap-4 text-[13px] font-semibold">
                        <li className="hover:text-red-600"><a href="/userdash"><i className="fa-solid fa-house mx-1"></i>Home</a></li>
                        <li className="hover:text-red-600"><a href="/products"><i className="fa-solid fa-list mx-1"></i>Items</a></li>
                        <li className="hover:text-red-600"><a href="/payments"><i className="fa-solid fa-receipt mx-1"></i>Payments</a></li>
                        <li className="hover:text-red-600"><a href="/givereview"><i className="fa-solid fa-comment mx-1"></i>Review</a></li>
                        <li className="hover:text-red-600"><a href="/givereview"><i className="fa-solid fa-user mx-1"></i>Profile</a></li>
                    </ul>
                </div>
                <div className="xl:flex lg:flex hidden">
                    <div className="flex gap-2">
                        <button className="px-3 py-[3px] text-[13px] effectHover">
                            <a href="/login"><span className="navanimate"></span>Logout</a>
                        </button>
                    </div>
                </div>
                <div className="flex xl:hidden lg:hidden p-2 shadow-md cursor-pointer" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>

            {isMenuOpen && (
                <div className="flex flex-col justify-center px-10 py-4 bg-gray-100 fixed top-14 left-0 w-full z-50 shadow-lg">
                    <div className="flex">
                        <ul className="flex flex-col px-8 gap-4 text-[13px] font-semibold">
                            <li><a href="/userdash"><i class="fa-solid fa-house"></i>Home</a></li>
                            <li><a href="/products"><i class="fa-solid fa-list"></i>Items</a></li>
                            <li><a href="/payments"><i class="fa-solid fa-receipt"></i>Payments</a></li>
                            <li><a href="/givereview"><i class="fa-solid fa-comment"></i>Review</a></li>
                            <li><a href="/userprofile">Profile</a></li>
                            <li><a href="/logout">Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navigation;
