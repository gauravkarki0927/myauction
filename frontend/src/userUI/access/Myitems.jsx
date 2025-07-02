import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import API from '../../api/API.js'
import Footer from '../Footer';
import { BASE_URL } from '../../api/BaseUrrlForImage.js';

function Myitems() {
  const [activeSection, setActiveSection] = useState('create');
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

        const response = await API.get("/access/myitems", {
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
  }, []);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userId: user_id,
    proName: '',
    otherName: '',
    price: '',
    proImage: null,
    type: '',
    days: '',
    description: '',
    keypoints: [''],
  });

  const handleButtonClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files : value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = async () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.proName.trim()) {
      newErrors.proName = 'Product Name is required';
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.proName)) {
      newErrors.proName = 'Product Name must contain only alphabets';
      isValid = false;
    }

    if (!formData.otherName.trim()) {
      newErrors.otherName = 'Brand/Nickname is required';
      isValid = false;
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Product Initial Price is required';
      isValid = false;
    } else if (!/^\d+$/.test(formData.price)) {
      newErrors.price = 'Price must be a non symbolic number';
      isValid = false;
    } else if (parseInt(formData.price, 10) <= 0) {
      newErrors.price = 'Price must be greater than 0';
      isValid = false;
    }

    if (!formData.proImage || formData.proImage.length === 0) {
      newErrors.proImage = 'Product Images are required';
      isValid = false;
    } else if (formData.proImage.length > 4) {
      newErrors.proImage = 'You can select a maximum of 4 images';
      isValid = false;
    } else {
      for (let file of formData.proImage) {
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
          newErrors.proImage = 'Only JPG, JPEG, and PNG images are allowed';
          isValid = false;
          break;
        }

        const isValidAspectRatio = await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const ratio = img.width / img.height;
            const expectedRatio = 4 / 3;
            const tolerance = 0.01;
            resolve(Math.abs(ratio - expectedRatio) <= tolerance);
          };
          img.onerror = () => resolve(false);
          img.src = URL.createObjectURL(file);
        });

        if (!isValidAspectRatio) {
          newErrors.proImage = 'Each image must have a 4:3 aspect ratio.';
          isValid = false;
          break;
        }
      }
    }

    if (!formData.type) {
      newErrors.type = 'Product Type is required';
      isValid = false;
    }

    if (!formData.days.trim()) {
      newErrors.days = 'No. of Days is required';
      isValid = false;
    } else if (!/^\d+$/.test(formData.days)) {
      newErrors.days = 'Days must be a non symbolic number';
      isValid = false;
    } else if (parseInt(formData.days, 10) <= 0) {
      newErrors.days = 'Days must be greater than 0';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product Details are required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleKeypointChange = (index, value) => {
    const updatedKeypoints = [...formData.keypoints];
    updatedKeypoints[index] = value;
    setFormData({ ...formData, keypoints: updatedKeypoints });
  };

  const handleAddKeypoint = () => {
    setFormData({ ...formData, keypoints: [...formData.keypoints, ''] });
  };

  const handleRemoveKeypoint = (index) => {
    const updatedKeypoints = formData.keypoints.filter((_, i) => i !== index);
    setFormData({ ...formData, keypoints: updatedKeypoints });
  };


  useEffect(() => {
    if (user_id) {
      setFormData((prevData) => ({
        ...prevData,
        userId: user_id,
      }));
    }
  }, [user_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await validateForm()) {
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          if (key === 'proImage' && formData.proImage) {
            for (let i = 0; i < formData.proImage.length; i++) {
              formDataToSend.append('proImage', formData.proImage[i]);
            }
          } else if (key === 'keypoints') {
            formDataToSend.append('keypoints', JSON.stringify(formData.keypoints));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }

        const response = await API.post('/additems', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const data = response.data;

        if (response.status === 200 || response.status === 201) {
          alert(data.message);
        } else {
          alert(`Error adding product: ${data.message || 'Something went wrong'}`);
        }
      } catch (error) {
        console.error(error);
        alert('Network error occurred');
      }
    }
  };


  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user_id) return;

    API.get(`/userproducts/${user_id}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [user_id]);

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/deleteproduct/${productId}`);

      if (response.status === 200) {
        alert('Product deleted successfully!');
        setProducts(products.filter(item => item.product_id !== productId));
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete product.');
    }
  };

  const [biddedProducts, setBiddedProducts] = useState([]);

  useEffect(() => {
    if (user_id) {
      API.get(`/user-bids/${user_id}`)
        .then(res => setBiddedProducts(res.data))
        .catch(err => console.error(err));
    }
  }, [user_id]);
  console.log(biddedProducts);

  const [participatedProducts, setParticipatedProducts] = useState([]);

  useEffect(() => {
    if (user_id) {
      API.get(`/user-participated-bids/${user_id}`)
        .then(res => setParticipatedProducts(res.data))
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

  const gotoUpdate = (PID) => {
    if (PID) {
      navigate(`/access/updateProduct?pid=${PID}`);
    }
  }


  return (
    <>
      <Navigation />
      <div className="flex flex-col w-full mt-18 xl:px-14 lg:px-16 md:px-10 sm:px-6 px-4">
        <div className="flex flex-wrap md:flex-nowrap justify-around items-center text-[14px] gap-y-1 md:gap-y-0 gap-x-1 font-semibold">
          <button
            className={`w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'create' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('create')}
          >
            Add Item
          </button>
          <button
            className={`w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'myitems' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('myitems')}
          >
            View Items
          </button>
          <button
            className={`w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'mybiddings' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('mybiddings')}
          >
            View Biddings
          </button>
          <button
            className={`w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'allbiddings' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('allbiddings')}
          >
            All biddings
          </button>
        </div>
        <div className="flex w-full py-4">
          <div
            id="create"
            className={`h-auto w-full ${activeSection === 'create' ? 'block' : 'hidden'
              }`}
          >
            <form id="registrationForm" className="p-2" onSubmit={handleSubmit}>
              <div className="mb-4">
                <p className="flex text-center w-full items-center justify-center py-2 text-xl">
                  Insert Your Product
                </p>
                <label htmlFor="proName" className="block text-sm font-medium">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="proName"
                  name="proName"
                  value={formData.proName}
                  onChange={handleInputChange}
                  placeholder="Enter your product name"
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                />
                {errors.proName && (
                  <p className="mt-1 text-sm text-red-500">{errors.proName}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="otherName" className="block text-sm font-medium">
                  Brand/Nickname <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="otherName"
                  name="otherName"
                  value={formData.otherName}
                  onChange={handleInputChange}
                  placeholder="Enter brand or any other name"
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                />
                {errors.otherName && (
                  <p className="mt-1 text-sm text-red-500">{errors.otherName}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium">
                  Product Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter product price"
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="proImage" className="block text-sm font-medium">
                  Product Images [4:3 ratio] <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="proImage"
                  name="proImage"
                  accept="image/jpeg, image/jpg, image/png"
                  multiple
                  onChange={handleInputChange}
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                />
                {errors.proImage && (
                  <p className="mt-1 text-sm text-red-500">{errors.proImage}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="type">
                  Product Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                >
                  <option value="">-Choose Categories-</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Communication">Communication</option>
                  <option value="Transport">Transport</option>
                  <option value="Antique">Antique</option>
                  <option value="Software">Software</option>
                  <option value="Artifact">Artifact</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Sculpture">Sculpture</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="days" className="block text-sm font-medium">
                  No. Of Days <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="days"
                  name="days"
                  value={formData.days}
                  onChange={handleInputChange}
                  placeholder="Enter total days for bidding placement"
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                />
                {errors.days && (
                  <p className="mt-1 text-sm text-red-500">{errors.days}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium">
                  Product Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  placeholder="Enter item details"
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 resize-none"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="keypoints" className="block text-sm font-medium mb-1">
                  Key Points <span className="text-red-500">*</span>
                </label>
                {formData.keypoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleKeypointChange(index, e.target.value)}
                      placeholder={`Key point ${index + 1}`}
                      className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveKeypoint(index)}
                      className="bg-red-500 text-[12px] cursor-pointer text-white px-1 rounded"
                      disabled={formData.keypoints.length === 1}
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddKeypoint}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  + Add another key point
                </button>
              </div>

              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="px-2 py-1 border border-gray-200 shadow-md bg-black text-white cursor-pointer rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div
            id="myitems"
            className={`h-auto w-full ${activeSection === 'myitems' ? 'block' : 'hidden'
              }`}
          >
            <div className="flex flex-col gap-2 py-4" id="product">
              {products.length === 0 ? (
                <p className="text-gray-600 text-center w-full">Currently you have no any products live in the website.</p>
              ) : (
                <div className="flex flex-wrap justify-center gap-3 h-auto w-full">
                  {products.map(data => (
                    <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]" key={data.product_id}>
                      <div className="relative">
                        <div className="cursor-pointer">
                          {JSON.parse(data.proImage)[0] && (
                            <img
                              className="w-full"
                              src={`${BASE_URL}/productImage/${JSON.parse(data.proImage)[0]}`}
                              alt="Product Image"
                              onClick={() => productDetails(data.product_id)}
                            />
                          )}
                          <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded text-sm font-medium">
                            Available
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium mb-1">{data.productName}</h3>
                        <p className="text-gray-800 text-sm mb-4">
                          {data.type}
                        </p>
                        {(() => {
                          const postDate = new Date(data.submitted);
                          const durationInDays = data.days || 0;

                          if (isNaN(postDate.getTime())) {
                            return <p className="text-red-800 text-[13px]">Invalid date</p>;
                          }

                          const endDate = new Date(postDate);
                          endDate.setDate(endDate.getDate() + durationInDays);

                          const month = String(endDate.getMonth() + 1).padStart(2, '0');
                          const day = String(endDate.getDate()).padStart(2, '0');
                          const year = endDate.getFullYear();
                          let hours = endDate.getHours();
                          const minutes = String(endDate.getMinutes()).padStart(2, '0');
                          const ampm = hours >= 12 ? 'PM' : 'AM';
                          hours = hours % 12 || 12;

                          const formatted = `${month}-${day}-${year}, ${hours}:${minutes} ${ampm}`;

                          if (endDate < new Date()) {
                            return <p className="text-red-800 text-[13px] font-semibold">Auction Ended</p>;
                          }
                          return <p className="text-red-800 text-[13px]">Ends at {formatted}</p>;
                        })()}
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">Rs.{data.price}</span>
                          <div className="flex gap-2">
                            <button className="bg-green-800 text-gray-100 border border-gray-400 rounded-[6px] py-2 px-4 text-[13px] hover:bg-green-700 outline-none cursor-pointer" onClick={() => gotoUpdate(data.product_id)}>
                              Update
                            </button>
                            <button className="bg-red-800 text-gray-100 border border-gray-400 rounded-[6px] py-2 px-4 text-[13px] hover:bg-red-700 outline-none cursor-pointer" onClick={() => deleteProduct(data.product_id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div
            id="mybiddings"
            className={`h-auto w-full ${activeSection === 'mybiddings' ? 'block' : 'hidden'
              }`}
          >
            <div className="flex flex-wrap justify-center gap-3 h-auto w-full">
              {biddedProducts.length === 0 ? (
                <p className="text-gray-600 text-center w-full">Currently you are not participating in any bids.</p>
              ) : (
                biddedProducts.map(product => (
                  <div key={product.product_id} className="flex flex-col bg-white rounded overflow-hidden w-[300px]">
                    <div className="relative cursor-pointer">
                      {JSON.parse(product.proImage)[0] && (
                        <img
                          className="w-full"
                          src={`${BASE_URL}/productImage/${JSON.parse(product.proImage)[0]}`}
                          alt="Product"
                          onClick={() => productDetails(product.product_id)}
                        />
                      )}
                      <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded text-sm font-medium">
                        Available
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-1">{product.productName}</h3>
                      <p className="text-gray-800 text-sm mb-4">{product.type}</p>
                      <p className="text-gray-800 text-sm mb-4">
                        {product.type}
                      </p>
                      {(() => {
                        const postDate = new Date(product.submitted);
                        const durationInDays = product.days || 0;

                        if (isNaN(postDate.getTime())) {
                          return <p className="text-red-800 text-[13px]">Invalid date</p>;
                        }

                        const endDate = new Date(postDate);
                        endDate.setDate(endDate.getDate() + durationInDays);

                        const month = String(endDate.getMonth() + 1).padStart(2, '0');
                        const day = String(endDate.getDate()).padStart(2, '0');
                        const year = endDate.getFullYear();
                        let hours = endDate.getHours();
                        const minutes = String(endDate.getMinutes()).padStart(2, '0');
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12 || 12;

                        const formatted = `${month}-${day}-${year}, ${hours}:${minutes} ${ampm}`;

                        if (endDate < new Date()) {
                          return <p className="text-red-800 text-[13px] font-semibold">Auction Ended</p>;
                        }
                        return <p className="text-red-800 text-[13px]">Ends at {formatted}</p>;
                      })()}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">Rs.{product.price}</span>
                        <button
                          className="bg-transparent text-gray-900 border border-gray-800 rounded-[100px] font-bold py-2 px-4 text-[13px] hover:bg-black hover:text-white outline-none cursor-pointer"
                          onClick={() => productDetails(product.product_id)}
                        >
                          Bid Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div
            id="allbiddings"
            className={`h-auto w-full ${activeSection === 'allbiddings' ? 'block' : 'hidden'
              }`}
          >
            <div className="flex flex-wrap justify-center gap-3 h-auto w-full">
              {participatedProducts.length === 0 ? (
                <p className="text-gray-600 text-center w-full">No bids placed yet.</p>
              ) : (
                participatedProducts.map(product => (
                  <div key={product.product_id} className="flex flex-col bg-white rounded overflow-hidden w-[300px]">
                    <div className="relative cursor-pointer">
                      {JSON.parse(product.proImage)[0] && (
                        <img
                          className="w-full"
                          src={`${BASE_URL}/productImage/${JSON.parse(product.proImage)[0]}`}
                          alt="Product"
                        />
                      )}
                      <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded text-sm font-medium">
                        Participated
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-1">{product.productName}</h3>
                      <p className="text-gray-800 text-sm mb-4">{product.type}</p>
                      {(() => {
                        const postDate = new Date(product.submitted);
                        const durationInDays = product.days || 0;

                        if (isNaN(postDate.getTime())) {
                          return <p className="text-red-800 text-[13px]">Invalid date</p>;
                        }

                        const endDate = new Date(postDate);
                        endDate.setDate(endDate.getDate() + durationInDays);

                        const month = String(endDate.getMonth() + 1).padStart(2, '0');
                        const day = String(endDate.getDate()).padStart(2, '0');
                        const year = endDate.getFullYear();
                        let hours = endDate.getHours();
                        const minutes = String(endDate.getMinutes()).padStart(2, '0');
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12 || 12;

                        const formatted = `${month}-${day}-${year}, ${hours}:${minutes} ${ampm}`;

                        if (endDate < new Date()) {
                          return <p className="text-red-800 text-[13px] font-semibold">Auction Ended</p>;
                        }
                        return <p className="text-red-800 text-[13px]">Ends at {formatted}</p>;
                      })()}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">Rs.{product.price}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  );
}

export default Myitems;