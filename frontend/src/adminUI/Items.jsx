import React, { useState, useRef } from 'react';
import user from '../pictures/user.jpg';
import axios from 'axios'

function Items() {

    const [activeSection, setActiveSection] = useState('records');
    const [profilePicSrc, setProfilePicSrc] = useState(user);
    const inputFileRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicSrc(URL.createObjectURL(file));
        }
    };

    const handleUploadClick = () => {
        inputFileRef.current.click();
    };

    const handleButtonClick = (sectionId) => {
        setActiveSection(sectionId);
    };

    const deleteButtonClick = (id) => {
        var msg = id;
        const smt = confirm("Are you sure you want to delete this item?");
        if (smt) {
            alert("Item deleted successfully " + msg);
        }
    };

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        proName: '',
        otherName: '',
        price: '',
        proImage: null,
        type: '',
        days: '',
        description: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            axios
                .post('http://localhost:3000/updateitems', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    alert('Product updated successful');
                })
                .catch((err) => {
                    alert('Product updated failed. Please try again.');
                    console.log(err);
                });
        } else {
            console.log('Form has errors');
        }
    };

    const handleDeleteClick = async (proID) => {
        const smt = confirm("Are you sure you want to delete this user?");
        if (smt) {
            try {
                const response = await fetch(`http://localhost:3000/deletepro/${proID}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                } else {
                    const errorData = await response.json();
                    alert('Error deleting user:', errorData.error || errorData.message);
                }
            } catch (error) {
                alert('Network error:', error);
            }
        }
    };

    return (
        <>
            <div id="records" className={`overflow-x-auto bg-white p-2 ${activeSection === 'records' ? 'block' : 'hidden'
                }`}
            >
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Profile</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Contact</th>
                            <th className="py-3 px-6 text-left">Street</th>
                            <th className="py-3 px-6 text-left">District</th>
                            <th className="py-3 px-6 text-left">State</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">1</td>
                            <td className="py-3 px-6 text-left">
                                <img className="h-12" src={user} alt="" />
                            </td>
                            <td className="py-3 px-6 text-left">Abhiraj k</td>
                            <td className="py-3 px-6 text-left">abhi@kerala.com</td>
                            <td className="py-3 px-6 text-left">9812345678</td>
                            <td className="py-3 px-6 text-left">Divertole</td>
                            <td className="py-3 px-6 text-left">Rupandehi</td>
                            <td className="py-3 px-6 text-left">Lumbini</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" onClick={() => handleButtonClick('edit')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110" onClick={() => handleDeleteClick()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">2</td>
                            <td className="py-3 px-6 text-left">
                                <img className="h-12" src={user} alt="" />
                            </td>
                            <td className="py-3 px-6 text-left">Ayyam Perumal</td>
                            <td className="py-3 px-6 text-left">ayyam@kerala.com</td>
                            <td className="py-3 px-6 text-left">9801201201</td>
                            <td className="py-3 px-6 text-left">Divertole</td>
                            <td className="py-3 px-6 text-left">Rupandehi</td>
                            <td className="py-3 px-6 text-left">Lumbini</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" onClick={() => handleButtonClick('edit')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">3</td>
                            <td className="py-3 px-6 text-left">
                                <img className="h-12" src={user} alt="" />
                            </td>
                            <td className="py-3 px-6 text-left">George Thomas</td>
                            <td className="py-3 px-6 text-left">george@kerala.com</td>
                            <td className="py-3 px-6 text-left">9876543212</td>
                            <td className="py-3 px-6 text-left">Divertole</td>
                            <td className="py-3 px-6 text-left">Rupandehi</td>
                            <td className="py-3 px-6 text-left">Lumbini</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" onClick={() => handleButtonClick('edit')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">4</td>
                            <td className="py-3 px-6 text-left">
                                <img className="h-12" src={user} alt="" />
                            </td>
                            <td className="py-3 px-6 text-left">Vasudev Menon</td>
                            <td className="py-3 px-6 text-left">vasudev@kerala.com</td>
                            <td className="py-3 px-6 text-left">9812345678</td>
                            <td className="py-3 px-6 text-left">Divertole</td>
                            <td className="py-3 px-6 text-left">Rupandehi</td>
                            <td className="py-3 px-6 text-left">Lumbini</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" onClick={() => handleButtonClick('edit')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">5</td>
                            <td className="py-3 px-6 text-left">
                                <img className="h-12" src={user} alt="" />
                            </td>
                            <td className="py-3 px-6 text-left">Mandan Pillai</td>
                            <td className="py-3 px-6 text-left">mandan@kerala.com</td>
                            <td className="py-3 px-6 text-left">9876543212</td>
                            <td className="py-3 px-6 text-left">Divertole</td>
                            <td className="py-3 px-6 text-left">Rupandehi</td>
                            <td className="py-3 px-6 text-left">Lumbini</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" onClick={() => handleButtonClick('edit')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="edit" className={`p-2 ${activeSection === 'edit' ? 'block' : 'hidden'
                }`}
            >
                <form id="registrationForm" className="p-2" onSubmit={handleSubmit}>
                    <div className="cursor-pointer flex justify-end" onClick={() => handleButtonClick('records')}>
                        <i className="fa-solid fa-circle-xmark text-[20px] text-red-600"></i>
                    </div>
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
                            <option value="eletronics">Electronics</option>
                            <option value="communication">Communication</option>
                            <option value="transport">Transport</option>
                            <option value="antique">Antique</option>
                            <option value="softwares">Softwares</option>
                            <option value="artifacts">Artifacts</option>
                            <option value="clothing">Clothing</option>
                            <option value="sclupture">Sclupture</option>
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
        </>
    )
}

export default Items
