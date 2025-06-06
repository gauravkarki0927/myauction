import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import esewa from '../../pictures/esewa_og.webp';
import khalti from '../../pictures/khalti.jpg';
import imepay from '../../pictures/imepay.jpg';
import Navigation from './Navigation';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";

const CheckoutPage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const pid = queryParams.get('pid');
    const bidPrice = queryParams.get('price');
    const transaction_uuid = uuidv4();

    const [state, setState] = useState('');
    const [districts, setDistricts] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        user: '',
        email: '',
        phone: '',
        state: '',
        district: '',
        street: '',
        postal: '',
        pid: pid,
        price: bidPrice,
        tuid: transaction_uuid
    });

    const states = [
        { value: 'koshi', label: 'KOSHI' },
        { value: 'madheshpradesh', label: 'MADESH PRADESH' },
        { value: 'bagmati', label: 'BAGMATI' },
        { value: 'gandaki', label: 'GANDAKI' },
        { value: 'lumbini', label: 'LUMBINI' },
        { value: 'karnali', label: 'KARNALI' },
        { value: 'sudurpaschim', label: 'SUDURPASCHIM' },
    ];

    const districtOptions = {
        koshi: [
            'TAPLEJUNG',
            'TERHRATHUM',
            'PANCHTHAR',
            'SANKHUWASABHA',
            'SOLUKHUMBU',
            'BHOJPUR',
            'KHOTANG',
            'ILLAM',
            'UDAYAPUR',
            'OKHALDHUNGA',
            'JHAPA',
            'DHANKUTA',
            'MORANG',
            'SUNSARI',
        ],
        madheshpradesh: [
            'PARSA',
            'BARA',
            'RAUTAHAT',
            'SARLAHI',
            'MAHOTTARI',
            'DHANUSHA',
            'SIRAHA',
            'SAPTARI',
        ],
        bagmati: [
            'KATHMANDU',
            'LALITPUR',
            'BHAKTAPUR',
            'KAVRE',
            'SINDUPALCHOWK',
            'DOLAKHA',
            'DHADING',
            'NUWAKOT',
            'MAKWANPUR',
            'RASUWA',
            'RAMECHHAP',
            'CHITWAN',
            'SINDHULI',
        ],
        gandaki: [
            'KASKI',
            'GORKHA',
            'NAWALPUR',
            'PARBHAT',
            'TANAHU',
            'BAGLUNG',
            'MYAGDI',
            'LAMJUNG',
            'SYANGJA',
            'MANANG',
            'MUSTANG',
        ],
        lumbini: [
            'PARASI',
            'DANG',
            'GULMI',
            'KAPILVASTU',
            'ARGHAKACHI',
            'PALPA',
            'RUKUM EAST',
            'PYUTHAN',
            'BANKE',
            'BARDIYA',
            'RUPANDEHI',
            'ROLPA',
        ],
        karnali: [
            'RUKUM WEST',
            'MUGU',
            'DAILEKH',
            'DOLPA',
            'JUMLA',
            'JAJARKOT',
            'KALIKOT',
            'SALYAN',
            'SURKHET',
            'HUMLA',
        ],
        sudurpaschim: [
            'KAILALI',
            'KANCHANPUR',
            'ACHHAM',
            'DADELDHURA',
            'DOTI',
            'DARCHULA',
            'BAJHANG',
            'BAJURA',
            'BAITADI',
        ],
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setState(selectedState);
        setDistricts(districtOptions[selectedState] || []);
        setFormData({ ...formData, state: selectedState, district: '' });
        setErrors((prevErrors) => ({ ...prevErrors, state: '' }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.user.trim()) {
            newErrors.user = 'User Name is required';
            isValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.user)) {
            newErrors.proName = 'User Name must contain only alphabets';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^98\d{8}$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number format. Must start with 98 and be 10 digits.';
            isValid = false;
        }
        if (!formData.state) {
            newErrors.state = 'State is required';
            isValid = false;
        }

        if (!formData.district) {
            newErrors.district = 'District is required';
            isValid = false;
        }
        if (!formData.street) {
            newErrors.street = 'Street is required';
            isValid = false;
        }
        if (!formData.postal.trim()) {
            newErrors.postal = 'Postal Code is required';
            isValid = false;
        } else if (!/^\d+$/.test(formData.postal)) {
            newErrors.postal = 'Code must be a non symbolic number';
            isValid = false;
        } else if (parseInt(formData.postal, 10) <= 0) {
            newErrors.postal = 'Code must be greater than 0';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3000/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (response.ok) {
                    navigate('/access/finalview', { state: formData });
                } else {
                    alert(result.message || 'Something went wrong!');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Server error. Try again later.');
            }
        }
    };


    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/productDetails/${pid}`);
                setProduct(response.data);
            } catch (err) {
                alert('Error fetching products:', err);
            }
        };

        fetchProduct();
    }, []);


    return (
        <>
            <Navigation />
            <form className="flex flex-col lg:flex-row justify-center mt-16 xl:px-16 lg:px-12 md:px-10 px-6 py-3" onSubmit={handleSubmit}>
                <div className="w-full lg:w-3/5 lg:mr-5">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-semibold">CHECKOUT</h2>
                        <button className="bg-transparent border-none cursor-pointer text-[14px]">
                            Have a Trust Issue? <a className="font-semibold" href="#" download>Check T&P</a>
                        </button>
                    </div>

                    <div className="mb-5">
                        <h3 className="text-[16px] bg-gray-100 p-2 font-semibold mb-4">
                            SHIPPING ADDRESS <span className="text-gray-500">?</span>
                        </h3>
                        <input
                            type="text"
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            placeholder="User Name *"
                            className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                        />
                        {errors.user && <p className="mb-2 text-sm text-red-500">{errors.user}</p>}
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address *"
                            className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                        />
                        {errors.email && <p className="mb-2 text-sm text-red-500">{errors.email}</p>}
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Contact *"
                            className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                        />
                        {errors.phone && <p className="mb-2 text-sm text-red-500">{errors.phone}</p>}
                        <div className="flex flex-wrap sm:flex-nowrap gap-y-1 sm:gap-y-0 gap-x-1 mb-2">
                            <div className="w-1/2">
                                <select name="state"
                                    value={formData.state}
                                    onChange={handleStateChange}
                                    className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full outline-none"
                                >
                                    <option value="">-Choose state-</option>
                                    {states.map((s) => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.state && <p className="mb-2 text-sm text-red-500">{errors.state}</p>}
                            </div>
                            <div className="w-1/2">
                                <select name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full outline-none"
                                >
                                    <option value="">-Choose district-</option>
                                    {districts.map((d, index) => (
                                        <option key={index} value={d.toLowerCase()}>
                                            {d}
                                        </option>
                                    ))}
                                </select>
                                {errors.district && <p className="mb-2 text-sm text-red-500">{errors.district}</p>}
                            </div>
                        </div>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            placeholder="Street/City *"
                            className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                        />
                        {errors.street && <p className="mb-2 text-sm text-red-500">{errors.street}</p>}
                        <input
                            type="text"
                            name="postal"
                            maxLength="5"
                            value={formData.postal}
                            onChange={handleChange}
                            placeholder="Postal Code *"
                            className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                        />
                        {errors.postal && <p className="mb-2 text-sm text-red-500">{errors.postal}</p>}
                    </div>

                    <div className="mb-5">
                        <h3 className="text font-semibold mb-2">
                            PAYMENT METHOD <span className="text-gray-500">?</span>
                        </h3>
                        <p className="text-[14px]">Currently only eSewa has been used as a main payment method but in the future, we will add some more listed below for user convinent.</p>
                    </div>

                    <div className="my-2">
                        <h3 className="text font-semibold">PAYMENT OPTIONS</h3>
                        <div className="flex flex-wrap md:flex-nowrap gap-2">
                            <a href="https://esewa.com.np/#/home"><img className="h-16 border border-gray-100" src={esewa} alt="" /></a>
                            <a href="https://khalti.com/"><img className="h-16 border border-gray-100" src={khalti} alt="" /></a>
                            <a href="https://www.imepay.com.np/#/"><img className="h-16 border border-gray-100" src={imepay} alt="" /></a>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-2/5">
                    <div className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-5 mb-5">
                        <h3 className="text-lg font-semibold mb-3">ORDER SUMMARY</h3>
                        <div className="flex justify-between mb-1">
                            <span>Subtotal</span>
                            <span>Rs. {bidPrice}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span>Taxes</span>
                            <span>—</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span>Shipping (1 Item)</span>
                            <span>—</span>
                        </div>
                        <hr className="my-3" />
                        <div className="flex justify-between mt-3 mb-5">
                            <strong className="font-semibold">TOTAL</strong>
                            <strong className="font-semibold">Rs. {bidPrice}</strong>
                        </div>
                        <div className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-3 flex items-center justify-between gap-4">
                            <p className="font-semibold">Complete your checkout</p>
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-[2px] shadow-md px-8 py-1 cursor-pointer text-[16px] font-semibold">
                                APPLY
                            </button>
                        </div>
                    </div>

                    <div className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-5">
                        <h3 className="text-lg font-semibold mb-3">
                            YOUR PRODUCT
                        </h3>
                        <p className="text-xs">Arrives in 4-7 days</p>
                        <div className="flex flex-wrap h-auto w-full p-2">
                            {product.map(data => (
                                <div className="flex gap-2 bg-white rounded overflow-hidden w-full" key={data.product_id}>
                                    <div className="relative">
                                            {JSON.parse(data.proImage)[0] && (
                                                <img
                                                    className="w-40 mr-3"
                                                    src={`http://localhost:3000/productImage/${JSON.parse(data.proImage)[0]}`}
                                                    alt="Product Image"
                                                    onClick={() => productDetails(data.product_id)}
                                                />
                                            )}
                                    </div>
                                    <div className="px-4 space-y-1">
                                        <p>{data.productName}</p>
                                        <p className="text-xs">
                                            {data.otherName}
                                        </p>
                                        <p className="text-xs">
                                            {data.type}
                                        </p>
                                        <p className="text-xs">
                                            {data.submitted}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-red-600 text-lg">Rs.{bidPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </>
    );
};

export default CheckoutPage;
