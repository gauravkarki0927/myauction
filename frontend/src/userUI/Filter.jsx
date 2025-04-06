import React from 'react'

function Filter() {
    return (
        <>
            <div className="flex flex-col gap-2 border-b border-gray-300 xl:px-16 lg:px-12 md:px-10 px-6 py-3 mt-16" id="home">
                <div className="flex flex-wrap gap-4">
                <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        All items
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        New items
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Populars
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Upcoming items
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Antique
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Artifact
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Clothings
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Communication
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Electronics
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Softwares
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Sclupture
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Transports
                    </button>
                </div>
            </div>
        </>
    )
}

export default Filter
