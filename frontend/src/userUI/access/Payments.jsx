import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from '../Footer';

function Payments() {
  const [user_id, setUser_id] = useState(null);
  const [biddedProducts, setBiddedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get("http://localhost:3000/access/myitems", {
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

  useEffect(() => {
    if (user_id) {
      axios.get(`http://localhost:3000/successfulBid/${user_id}`)
        .then(res => setBiddedProducts(res.data))
        .catch(err => console.error(err));
    }
  }, [user_id]);

  const productDetails = (PID) => {
    if (user_id) {
      navigate(`/access/innerproduct?pid=${PID}`);
    } else {
      navigate(`/product?pid=${PID}`);
    }
  };

  let keyPointsList = [];
  try {
    keyPointsList = JSON.parse(biddedProducts.keyPoints || '[]');
  } catch (err) {
    console.error("Failed to parse keyPoints", err);
  }
  return (
    <>
      <Navigation />
      <div className="font-sans mt-16 xl:px-16 lg:px-12 md:px-10 px-6 py-3 space-y-6">
        <div className="xl:px-16 lg:px-12 md:px-10 px-6">
          <p className="font-semibold text-[18px]">YOUR ITEMS TO PAY</p>
        </div>
        <div className="xl:px-16 lg:px-12 md:px-10 px-6">
          {biddedProducts.length === 0 ? (
            <p className="text-gray-600 text-center w-full">
              Currently no any product for payment. Please enjoy your day.
            </p>
          ) : (
            biddedProducts.map(product => (
              <div
                key={product.product_id}
                className="flex flex-col md:flex-row items-start gap-3 w-full h-auto mx-auto md:px-16 px-2"
              >
                <div className="flex mb-4 md:mb-0">
                  {JSON.parse(product.proImage)[0] && (
                    <img
                      className="w-[430px] object-contain"
                      src={`http://localhost:3000/productImage/${JSON.parse(product.proImage)[0]}`}
                      alt="Product Image"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold mb-1">
                    {product.productName || "Product Name"}
                  </h2>
                  <span className="text-green-500">{product.otherName}</span>
                  <div className="flex items-center mb-1">
                    <span className="text-yellow-500 mr-1">★★★★★</span>
                    <span className="text-sm">{product.review_count || '5'}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="text-xl font-bold mr-1">
                      Rs.{product.user_bid || product.price || 'N/A'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">Delivery within a week</p>
                  <p className="text-sm text-gray-700">Service Not available</p>
                  <h3 className="text-lg font-semibold">Key Features:</h3>

                  {(() => {
                    let keyPoints = [];
                    try {
                      keyPoints = JSON.parse(product.keyPoints || '[]');
                    } catch (err) {
                      console.error("Failed to parse keyPoints for product:", product.product_id, err);
                    }

                    return (
                      <ul className="list-none text-[14px] text-gray-700">
                        {keyPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    );
                  })()}

                  <div>
                    <button className="bg-green-500 shadow-md text-white text-[14px] font-semibold py-2 px-4 rounded mt-3 cursor-pointer">
                      <a href={`/access/checkout?pid=${product.product_id}&price=${product.user_bid}`}>
                        PROCEED TO PAY
                      </a>
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div >
      <Footer />
    </>
  );
}

export default Payments;
