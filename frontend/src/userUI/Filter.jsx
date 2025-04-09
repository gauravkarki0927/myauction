import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Filter() {

    const navigate = useNavigate();
    const handleFilter = async (filterData) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/filterItems',
                { searchItem: filterData },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            if (response.status === 200) {
                navigate('/search', { state: { searchItem: filterData } });
            } else {
                alert('Error searching product: ' + response.statusText);
            }
        } catch (error) {
            alert('Network error: ' + error.message);
        }
    };
    

    return (
        <>
            <div className="flex flex-col gap-2 border-b border-gray-300 xl:px-16 lg:px-12 md:px-10 px-6 py-3 mt-16" id="home">
                <div className="flex flex-wrap gap-4">
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('allitems')}>
                        All items
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('newitems')}>
                        New items
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('upcoming')}>
                        Upcoming items
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('Antique')}>
                        Antique
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('Artifact')}>
                        Artifact
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('Clothing')}>
                        Clothings
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('Communication')}>
                        Communication
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('Electronic')}>
                        Electronics
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('Software')}>
                        Softwares
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('Sclupture')}>
                        Sclupture
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded" onClick={() => handleFilter('Transport')}>
                        Transports
                    </button>
                </div>
            </div>
        </>
    )
}

export default Filter
