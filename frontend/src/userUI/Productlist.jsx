import React from "react";
import pic1 from '../pictures/gamala.jpg';
import pic2 from '../pictures/tuxedo.jpg';
import pic3 from '../pictures/watch.jpg';
import pic4 from '../pictures/nature.jpg';
import pic5 from '../pictures/clothing.jpg';
import pic6 from '../pictures/shoes.jpg';
import pic7 from '../pictures/watch1.jpg';
import pic8 from '../pictures/camera.jpg';
import pic9 from '../pictures/laptop.jpg';
import pic10 from '../pictures/headphone.jpg';
import pic11 from '../pictures/shoes2.jpg';

function Productlist() {
    return (
        <>
            <div className="flex flex-col gap-2 py-4" id="product">
                <div className="flex justify-between items-center py-3 xl:px-14 lg:px-16 md:px-18 sm:px-6 px-4">
                    <h1 className="text-xl font-semibold">Products for Bids</h1>
                    <a className="text-pink-900 text-[13px]" href="/viewmore">View more <i class="px-1 fa-solid fa-angle-right"></i></a>
                </div>
                <div className="flex flex-wrap justify-center gap-3 h-auto w-full">
                    <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]">
                        <div className="relative">
                            <a href="/product">
                                <img className="w-full" src={pic7} alt="Product Image" />
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
                                <img className="w-full" src={pic1} alt="Product Image" />
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
                                <img className="w-full" src={pic2} alt="Product Image" />
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
                                <img className="w-full" src={pic3} alt="Product Image" />
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
                                <img className="w-full" src={pic4} alt="Product Image" />
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
                                <img className="w-full" src={pic5} alt="Product Image" />
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
                                <img className="w-full" src={pic6} alt="Product Image" />
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
                                <img className="w-full" src={pic7} alt="Product Image" />
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
                                <img className="w-full" src={pic8} alt="Product Image" />
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
                                <img className="w-full" src={pic9} alt="Product Image" />
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
                                <img className="w-full" src={pic10} alt="Product Image" />
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
                                <img className="w-full" src={pic11} alt="Product Image" />
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
    );
}

export default Productlist;
