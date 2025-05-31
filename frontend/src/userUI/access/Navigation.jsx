import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [search, setSearch] = useState({
        searchItem: ''
    });

    const handleChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/searchItems',
                { searchItem: search.searchItem },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                navigate('/access/isearch', { state: { searchItem: search.searchItem } });
            } else {
                alert('Error searching product: ' + response.statusText);
            }
        } catch (error) {
            alert('Network error: ' + error.message);
        }
    };

    return (
        <>
            <div className="w-full flex justify-between items-center border-b border-gray-300 xl:px-16 lg:px-12 md:px-10 px-6 py-3 fixed top-0 left-0 bg-white z-1000">
                <div>
                    <p className="font-semibold text-[24px] xl:text-[20px] md:text[16px]"> <a className="outline-none" href="/"><span className="text-rose-700">My</span>Auction</a> </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex text-[13px] gap-2 px-2 items-center py-[6px] border-none bg-gray-100 rounded-[50px] xl:w-[600px] lg:w-[400px] md:w-[500px] sm:w-[400px] w-[160px]">
                        <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                        <input name="searchItem" className="outline-none text-gray-800 w-full" type="text" placeholder="Search your items here...." value={search.searchItem} onChange={handleChange} />
                        <button type="submit" className="hidden"></button>
                    </div>
                </form>
                <div className="hidden xl:flex lg:flex">
                    <ul className="flex gap-4 text-[13px] font-semibold">
                        <li className="hover:text-red-600"><a className="flex flex-wrap md:flex-nowrap items-center" href="/access/userdash"><i className="fa-solid fa-house mx-1"></i>Home</a></li>
                        <li className="hover:text-red-600"><a className="flex flex-wrap md:flex-nowrap items-center" href="/access/myitems"><i className="fa-solid fa-list mx-1"></i>Items</a></li>
                        <li className="hover:text-red-600"><a className="flex flex-wrap md:flex-nowrap items-center" href="/access/payments"><i className="fa-solid fa-receipt mx-1"></i>Payments</a></li>
                        <li className="hover:text-red-600"><a className="flex flex-wrap md:flex-nowrap items-center" href="/access/givereview"><i className="fa-solid fa-comment mx-1"></i>Review</a></li>
                        <li className="hover:text-red-600"><a className="flex flex-wrap md:flex-nowrap items-center" href="/access/userprofile"><i className="fa-solid fa-user mx-1"></i>Profile</a></li>
                    </ul>
                </div>
                <div className="xl:flex lg:flex hidden">
                    <div className="flex">
                        <div className="flex">
                            <button className="px-2 py-[3px] text-[13px] effectHover">
                                <a className="flex flex-wrap items-center justify-center" href="/login">
                                    <span className="navanimate"></span>
                                    <i className="fa-solid fa-power-off mr-1 lg:mt-1"></i>
                                    <span className="xl:inline hidden">Logout</span>
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex xl:hidden lg:hidden p-2 shadow-md cursor-pointer" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>

            {isMenuOpen && (
                <div className="flex flex-col justify-center px-10 py-4 bg-gray-100 fixed top-14 left-0 w-full z-50 shadow-lg">
                    <div className="flex">
                        <ul className="flex flex-col px-8 gap-4 text-[13px]">
                            <li><a href="/access/userdash"><i className="fa-solid fa-house mx-2"></i>Home</a></li>
                            <li><a href="/access/myitems"><i className="fa-solid fa-list mx-2"></i>Items</a></li>
                            <li><a href="/access/payments"><i className="fa-solid fa-receipt mx-2"></i>Payments</a></li>
                            <li><a href="/access/givereview"><i className="fa-solid fa-comment mx-2"></i>Review</a></li>
                            <li><a href="/access/userprofile"><i className="fa-solid fa-user mx-2"></i>Profile</a></li>
                            <li><a href="/login"><i className="fa-solid fa-power-off mx-2"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navigation;
