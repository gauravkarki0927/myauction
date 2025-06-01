import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from '../Footer';

function UpdateProduct() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pid = queryParams.get('pid');

    const [previousImages, setPreviousImages] = useState([]);
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        pid: '',
        proName: '',
        otherName: '',
        price: '',
        proImage: null,
        type: '',
        days: '',
        description: '',
        keypoints: [''],
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/productDetails/${pid}`);
                if (response.ok) {
                    const data = await response.json();
                    const product = data[0];
                    const parsedImages = product.proImage ? JSON.parse(product.proImage) : [];

                    setPreviousImages(parsedImages);
                    setFormData({
                        pid: product.product_id,
                        proName: product.productName || '',
                        otherName: product.otherName || '',
                        price: product.price?.toString() || '',
                        proImage: null,
                        type: product.type || '',
                        days: product.days?.toString() || '',
                        description: product.description || '',
                        keypoints: JSON.parse(product.keypoints || '[]'),
                    });
                } else {
                    console.error('Failed to fetch product');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };

        if (pid) {
            fetchProductDetails();
        }
    }, [pid]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (name === 'proImage' && type === 'file') {
            setFormData({ ...formData, [name]: files });
            const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setNewImagePreviews(imageUrls);
        } else {
            setFormData({ ...formData, [name]: value });
        }

        setErrors({ ...errors, [name]: '' });
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
            newErrors.price = 'Price must be a number';
            isValid = false;
        } else if (parseInt(formData.price, 10) <= 0) {
            newErrors.price = 'Price must be greater than 0';
            isValid = false;
        }

        if (previousImages.length === 0 && (!formData.proImage || formData.proImage.length === 0)) {
            newErrors.proImage = 'At least one product image is required';
            isValid = false;
        } else if (formData.proImage && formData.proImage.length > 4) {
            newErrors.proImage = 'You can select a maximum of 4 new images';
            isValid = false;
        } else if (formData.proImage) {
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
            newErrors.days = 'Number of days is required';
            isValid = false;
        } else if (!/^\d+$/.test(formData.days)) {
            newErrors.days = 'Days must be a valid number';
            isValid = false;
        } else if (parseInt(formData.days, 10) <= 0) {
            newErrors.days = 'Days must be greater than 0';
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Product description is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (validateForm()) {
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

                const response = await fetch(`http://localhost:3000/updateProduct`, {
                    method: 'POST',
                    body: formDataToSend,
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message || 'Product updated successfully!');
                } else {
                    alert(`Error updating product: ${data.message || 'Unknown error'}`);
                }
            } catch (error) {
                alert('Network error occurred');
                console.error(error);
            }
        }
    };


    return (
        <>
            <Navigation />
            <div className="w-full mt-18 xl:px-14 lg:px-16 md:px-10 sm:px-6 px-4">
                <form id="registrationForm" className="p-2" onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <p className="flex text-center w-full items-center justify-center py-2 text-xl">
                            Update Your Product
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
                    {previousImages.length > 0 && (
                        <div className="mb-2">
                            <p className="text-sm italic text-gray-500 mb-1">Previously uploaded images:</p>
                            <div className="flex flex-wrap gap-2">
                                {previousImages.map((imgName, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:3000/productImage/${imgName}`}
                                        alt={`Previous Upload ${index + 1}`}
                                        className="h-16 w-16 object-cover rounded border"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {newImagePreviews.length > 0 && (
                        <div className="mb-2">
                            <p className="text-sm italic text-gray-500 mb-1">Newly selected images:</p>
                            <div className="flex flex-wrap gap-2">
                                {newImagePreviews.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`New Preview ${index + 1}`}
                                        className="h-16 w-16 object-cover rounded border"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
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
                            <option value="Electronics">Electronics</option>
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default UpdateProduct
