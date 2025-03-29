import React from 'react'

function Related() {
    return (
        <>
            <div className="flex flex-col gap-2 py-4">
                <div className="flex justify-between items-center py-3 xl:px-14 lg:px-10 md:px-8 sm:px-6 px-4">
                    <h1 className="text-xl font-semibold">Related Products</h1>
                    <a className="text-pink-900 text-[13px]" href="/viewmore">View more <i class="px-1 fa-solid fa-angle-right"></i></a>
                </div>
                <div className="flex flex-wrap justify-left gap-3 h-auto w-full xl:px-14 lg:px-10 md:px-8 sm:px-6 px-2">
                    <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]">
                        <div className="relative">
                            <a href="/product">
                                <img className="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image" />
                                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded text-sm font-medium">
                                    Available
                                </div>
                            </a>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-1">Product Title</h3>
                            <p className="text-gray-800 text-sm mb-4">
                                Product Type
                            </p>
                            <p className="text-red-800 text-[13px]">Ends at 03-22-2025, 10:00 AM</p>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">$19.99</span>
                                <button className="bg-transparent text-gray-900 border border-gray-800 rounded-[100px] font-bold py-2 px-4 text-[13px] hover:bg-black hover:text-white outline-none cursor-pointer">
                                    <a href="/product">Bid Now</a>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]">
                        <div className="relative">
                            <a href="/product">
                                <img className="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image" />
                                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded text-sm font-medium">
                                    Available
                                </div>
                            </a>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-1">Product Title</h3>
                            <p className="text-gray-800 text-sm mb-4">
                                Product Type
                            </p>
                            <p className="text-red-800 text-[13px]">Ends at 03-22-2025, 10:00 AM</p>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">$19.99</span>
                                <button className="bg-transparent text-gray-900 border border-gray-800 rounded-[100px] font-bold py-2 px-4 text-[13px] hover:bg-black hover:text-white outline-none cursor-pointer">
                                    <a href="/product">Bid Now</a>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]">
                        <div className="relative">
                            <a href="/product">
                                <img className="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image" />
                                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded text-sm font-medium">
                                    Available
                                </div>
                            </a>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-1">Product Title</h3>
                            <p className="text-gray-800 text-sm mb-4">
                                Product Type
                            </p>
                            <p className="text-red-800 text-[13px]">Ends at 03-22-2025, 10:00 AM</p>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">$19.99</span>
                                <button className="bg-transparent text-gray-900 border border-gray-800 rounded-[100px] font-bold py-2 px-4 text-[13px] hover:bg-black hover:text-white outline-none cursor-pointer">
                                    <a href="/product">Bid Now</a>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]">
                        <div className="relative">
                            <a href="/product">
                                <img className="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image" />
                                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded text-sm font-medium">
                                    Available
                                </div>
                            </a>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-1">Product Title</h3>
                            <p className="text-gray-800 text-sm mb-4">
                                Product Type
                            </p>
                            <p className="text-red-800 text-[13px]">Ends at 03-22-2025, 10:00 AM</p>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">$19.99</span>
                                <button className="bg-transparent text-gray-900 border border-gray-800 rounded-[100px] font-bold py-2 px-4 text-[13px] hover:bg-black hover:text-white outline-none cursor-pointer">
                                    <a href="/product">Bid Now</a>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Related
