import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Addproduct() {

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    proName: '',
    otherName: '',
    price: '',
    proImage: null,
    type: '',
    days: '',
    description: '',
    keypoints: [''],
  });

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
    } else if (!/^[0-9A-Za-z\s]+$/.test(formData.otherName)) {
      newErrors.otherName = 'Brand/Nickname must not contain any symbols';
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


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      axios
        .post('http://localhost:3000/additems', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          alert('Product added Successful');
          navigate('/login');
        })
        .catch((err) => {
          alert('Product added failed. Please try again.');
          console.log(err);
        });
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <>
      <form className="p-2" onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="flex text-center w-full items-center justify-center py-2 text-xl">
            Insert Your Product
          </p>
          <label htmlFor="proName" className="block text-sm font-medium">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
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
            name="description"
            rows="5"
            placeholder="Enter product details..."
            className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 resize-none"
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
                placeholder={`${index + 1}. Extra key point`}
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
    </>
  )
}

export default Addproduct
