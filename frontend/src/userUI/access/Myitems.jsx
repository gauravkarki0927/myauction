import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import axios from 'axios';
import Footer from '../Footer';
import pic1 from '../../pictures/gamala.jpg';
import pic2 from '../../pictures/tuxedo.jpg';
import pic3 from '../../pictures/watch.jpg';
import pic4 from '../../pictures/nature.jpg';
import pic5 from '../../pictures/clothing.jpg';
import pic6 from '../../pictures/shoes.jpg';
import pic7 from '../../pictures/watch1.jpg';
import pic8 from '../../pictures/camera.jpg';
import pic9 from '../../pictures/laptop.jpg';
import pic10 from '../../pictures/headphone.jpg';
import pic11 from '../../pictures/shoes2.jpg';

function Myitems() {
  const [activeSection, setActiveSection] = useState('create');
  const [user_id, setUser_id] = useState([]);
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

  const validateForm = () => {
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
      newErrors.price = 'Product Price is required';
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          if (key === 'proImage' && formData.proImage) {
            for (let i = 0; i < formData.proImage.length; i++) {
              formDataToSend.append('proImage', formData.proImage[i]);
            }
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
  
        const response = await fetch('http://localhost:3000/additems', {
          method: 'POST',
          body: formDataToSend,
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.message);
        } else {
          alert(`Error adding product: ${data.message || 'Something went wrong'}`);
        }
      } catch (error) {
        alert('Network error occurred');
      }
    }
  };

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
  }, []);


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
                    Product Images <span className="text-red-500">*</span>
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
                    <option value="Eletronics">Electronics</option>
                    <option value="Communication">Communication</option>
                    <option value="Transport">Transport</option>
                    <option value="Antique">Antique</option>
                    <option value="Softwares">Softwares</option>
                    <option value="Artifacts">Artifacts</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Sclupture">Sclupture</option>
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
            <div
              id="mybiddings"
              className={`h-auto w-full ${activeSection === 'mybiddings' ? 'block' : 'hidden'
                }`}
            >
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
            <div
              id="allbiddings"
              className={`h-auto w-full ${activeSection === 'allbiddings' ? 'block' : 'hidden'
                }`}
            >
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
          </div>
        </div>
        <Footer />
      </>
    );
  }

  export default Myitems;