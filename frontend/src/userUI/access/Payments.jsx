import React, { useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'
import Footer from '../Footer'
import camera from '../../pictures/camera.jpg';

function Payments() {

  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get("http://localhost:3000/access/payments", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(response.data);

      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <Navigation />
      <div className="font-sans mt-16 xl:px-16 lg:px-12 md:px-10 px-6 py-3 space-y-6">
        <div className="xl:px-16 lg:px-12 md:px-10 px-6">
          <p className="font-semibold text-[18px]">YOUR ITEMS TO PAY</p>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-3 w-full h-auto mx-auto md:px-16 px-2">
          <div className="flex mb-4 md:mb-0">
            <img className="w-[430px] object-contain" src={camera} alt="Product" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-1">
              Samsung Galaxy M13 (Stardust Brown, 4GB, 64GB Storage) | 6000mAh Battery | Upto 8GB RAM with RAM Plus
            </h2>
            <div className="flex items-center mb-1">
              <span className="text-yellow-500 mr-1">★★★★★</span>
              <span className="text-sm">23,339</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-xl font-bold mr-1">₹11,499</span>
              <span className="line-through text-gray-500 mr-1">M.R.P: ₹16,999</span>
              <span className="text-green-500">(32% off)</span>
            </div>
            <p className="text-sm text-gray-700 mb-1">Up to 5% back with Amazon Pay ICICI...</p>
            <p className="text-sm text-green-500 mb-1">✓prime</p>
            <p className="text-sm text-gray-700 mb-1">FREE delivery Sat, 12 Apr</p>
            <p className="text-sm text-gray-700">Service: Installation</p>
            <div>
            <button className="bg-green-500 shadow-md text-white text-[14px] font-semibold py-2 px-4 rounded mt-3 cursor-pointer">
              <a href="/access/checkout">PROCEED TO PAY</a>
            </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-3 w-full h-auto mx-auto md:px-16 px-2">
          <div className="flex mb-4 md:mb-0">
            <img className="w-[430px] object-contain" src={camera} alt="Product" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-1">
              Samsung Galaxy M13 (Stardust Brown, 4GB, 64GB Storage) | 6000mAh Battery | Upto 8GB RAM with RAM Plus
            </h2>
            <div className="flex items-center mb-1">
              <span className="text-yellow-500 mr-1">★★★★★</span>
              <span className="text-sm">23,339</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-xl font-bold mr-1">₹11,499</span>
              <span className="line-through text-gray-500 mr-1">M.R.P: ₹16,999</span>
              <span className="text-green-500">(32% off)</span>
            </div>
            <p className="text-sm text-gray-700 mb-1">Up to 5% back with Amazon Pay ICICI...</p>
            <p className="text-sm text-green-500 mb-1">✓prime</p>
            <p className="text-sm text-gray-700 mb-1">FREE delivery Sat, 12 Apr</p>
            <p className="text-sm text-gray-700">Service: Installation</p>
            <div>
            <button className="bg-green-500 shadow-md text-white text-[14px] font-semibold py-2 px-4 rounded mt-3 cursor-pointer">
              <a href="/access/checkout">PROCEED TO PAY</a>
            </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-3 w-full h-auto mx-auto md:px-16 px-2">
          <div className="flex mb-4 md:mb-0">
            <img className="w-[430px] object-contain" src={camera} alt="Product" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-1">
              Samsung Galaxy M13 (Stardust Brown, 4GB, 64GB Storage) | 6000mAh Battery | Upto 8GB RAM with RAM Plus
            </h2>
            <div className="flex items-center mb-1">
              <span className="text-yellow-500 mr-1">★★★★★</span>
              <span className="text-sm">23,339</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-xl font-bold mr-1">₹11,499</span>
              <span className="line-through text-gray-500 mr-1">M.R.P: ₹16,999</span>
              <span className="text-green-500">(32% off)</span>
            </div>
            <p className="text-sm text-gray-700 mb-1">Up to 5% back with Amazon Pay ICICI...</p>
            <p className="text-sm text-green-500 mb-1">✓prime</p>
            <p className="text-sm text-gray-700 mb-1">FREE delivery Sat, 12 Apr</p>
            <p className="text-sm text-gray-700">Service: Installation</p>
            <div>
            <button className="bg-green-500 shadow-md text-white text-[14px] font-semibold py-2 px-4 rounded mt-3 cursor-pointer">
              <a href="/access/checkout">PROCEED TO PAY</a>
            </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-3 w-full h-auto mx-auto md:px-16 px-2">
          <div className="flex mb-4 md:mb-0">
            <img className="w-[430px] object-contain" src={camera} alt="Product" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-1">
              Samsung Galaxy M13 (Stardust Brown, 4GB, 64GB Storage) | 6000mAh Battery | Upto 8GB RAM with RAM Plus
            </h2>
            <div className="flex items-center mb-1">
              <span className="text-yellow-500 mr-1">★★★★★</span>
              <span className="text-sm">23,339</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-xl font-bold mr-1">₹11,499</span>
              <span className="line-through text-gray-500 mr-1">M.R.P: ₹16,999</span>
              <span className="text-green-500">(32% off)</span>
            </div>
            <p className="text-sm text-gray-700 mb-1">Up to 5% back with Amazon Pay ICICI...</p>
            <p className="text-sm text-green-500 mb-1">✓prime</p>
            <p className="text-sm text-gray-700 mb-1">FREE delivery Sat, 12 Apr</p>
            <p className="text-sm text-gray-700">Service: Installation</p>
            <div>
            <button className="bg-green-500 shadow-md text-white text-[14px] font-semibold py-2 px-4 rounded mt-3 cursor-pointer">
              <a href="/access/checkout">PROCEED TO PAY</a>
            </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-3 w-full h-auto mx-auto md:px-16 px-2">
          <div className="flex mb-4 md:mb-0">
            <img className="w-[430px] object-contain" src={camera} alt="Product" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-1">
              Samsung Galaxy M13 (Stardust Brown, 4GB, 64GB Storage) | 6000mAh Battery | Upto 8GB RAM with RAM Plus
            </h2>
            <div className="flex items-center mb-1">
              <span className="text-yellow-500 mr-1">★★★★★</span>
              <span className="text-sm">23,339</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-xl font-bold mr-1">₹11,499</span>
              <span className="line-through text-gray-500 mr-1">M.R.P: ₹16,999</span>
              <span className="text-green-500">(32% off)</span>
            </div>
            <p className="text-sm text-gray-700 mb-1">Up to 5% back with Amazon Pay ICICI...</p>
            <p className="text-sm text-green-500 mb-1">✓prime</p>
            <p className="text-sm text-gray-700 mb-1">FREE delivery Sat, 12 Apr</p>
            <p className="text-sm text-gray-700">Service: Installation</p>
            <div>
            <button className="bg-green-500 shadow-md text-white text-[14px] font-semibold py-2 px-4 rounded mt-3 cursor-pointer">
              <a href="/access/checkout">PROCEED TO PAY</a>
            </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Payments
