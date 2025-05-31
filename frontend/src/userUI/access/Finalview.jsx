import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CryptoJS from "crypto-js";
import esewa from '../../pictures/esewa_og.webp';
import khalti from '../../pictures/khalti.jpg';
import imepay from '../../pictures/imepay.jpg';
import Navigation from './Navigation';
import Footer from '../Footer';

const Finalview = () => {

    const location = useLocation();
    const checkout_data = location.state;
    const [formData, setformData] = useState({
        amount: checkout_data.price,
        tax_amount: "0",
        total_amount: checkout_data.price,
        transaction_uuid: checkout_data.tuid,
        product_service_charge: "0",
        product_delivery_charge: "0",
        product_code: "EPAYTEST",
        success_url: "http://localhost:5173/access/success",
        failure_url: "http://localhost:5173/access/failure",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: "",
        secret: "8gBm/:&EnhH.1/q",
    });

    const generateSignature = (
        total_amount,
        transaction_uuid,
        product_code,
        secret
    ) => {
        const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
        const hash = CryptoJS.HmacSHA256(hashString, secret);
        const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
        return hashedSignature;
    };

    // useeffect
    useEffect(() => {
        const { total_amount, transaction_uuid, product_code, secret } = formData;
        const hashedSignature = generateSignature(
            total_amount,
            transaction_uuid,
            product_code,
            secret
        );

        setformData({ ...formData, signature: hashedSignature });
    }, [formData.amount]);

    return (
        <>
            <Navigation />
            <form className="flex flex-col lg:flex-row justify-center mt-16 xl:px-16 lg:px-12 md:px-10 px-6 py-3">
                <div className="w-full lg:w-3/5 lg:mr-5">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-semibold">CONFIRM CHECKOUT</h2>
                        <button className="bg-transparent border-none cursor-pointer text-[14px]">
                            Have a Trust Issue? <a className="font-semibold" href="#" download>Check T&P</a>
                        </button>
                    </div>

                    <div className="mb-5">
                        <h3 className="text-[16px] bg-gray-100 p-2 font-semibold mb-2">
                            SHIPPING ADDRESS
                        </h3>
                        <label htmlFor="name" className="block text-sm text-gray-700">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={checkout_data?.user}
                            disabled
                            className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                        />
                        <label htmlFor="email" className="block text-sm text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="text"
                            value={checkout_data?.email}
                            disabled
                            className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                        />
                        <label htmlFor="phone" className="block text-sm text-gray-700">
                            Contact
                        </label>
                        <input
                            id="phone"
                            type="text"
                            value={checkout_data?.phone}
                            disabled
                            className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                        />
                        <div className="flex flex-wrap sm:flex-nowrap gap-y-1 sm:gap-y-0 gap-x-1 mb-2">
                            <div className="w-1/2">
                                <label htmlFor="state" className="block text-sm text-gray-700">
                                    State
                                </label>
                                <input
                                    id="state"
                                    type="text"
                                    value={checkout_data?.state}
                                    disabled
                                    className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="district" className="block text-sm text-gray-700">
                                    District
                                </label>
                                <input
                                    id="district"
                                    type="text"
                                    value={checkout_data?.district}
                                    disabled
                                    className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                                />
                            </div>
                        </div>


                        <label htmlFor="street" className="block text-sm text-gray-700">
                            Street/City
                        </label>
                        <input
                            id="street"
                            type="text"
                            value={checkout_data?.street}
                            disabled
                            className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                        />
                        <label htmlFor="postal" className="block text-sm text-gray-700">
                            Postal
                        </label>
                        <input
                            id="postal"
                            type="text"
                            value={checkout_data?.postal}
                            disabled
                            className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-2 mb-2 w-full"
                        />
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
                            <span>Rs. {checkout_data?.price}</span>
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
                            <strong className="font-semibold">Rs. {checkout_data?.price}</strong>
                        </div>
                        <div className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-3 flex items-center justify-center gap-4">
                            <p className="font-semibold">Click here for payment <i className="fa-solid fa-arrow-right mx-1"></i> </p>
                            <form
                            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                            method="POST"
                            >
                            <div className="field">
                                <input
                                    type="hidden"
                                    id="amount"
                                    name="amount"
                                    autoComplete="off"
                                    value={formData.amount}
                                    onChange={({ target }) =>
                                        setformData({
                                            ...formData,
                                            amount: target.value,
                                            total_amount: target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <input
                                type="hidden"
                                id="tax_amount"
                                name="tax_amount"
                                value={formData.tax_amount}
                                required
                            />
                            <input
                                type="hidden"
                                id="total_amount"
                                name="total_amount"
                                value={formData.total_amount}
                                required
                            />
                            <input
                                type="hidden"
                                id="transaction_uuid"
                                name="transaction_uuid"
                                value={formData.transaction_uuid}
                                required
                            />
                            <input
                                type="hidden"
                                id="product_code"
                                name="product_code"
                                value={formData.product_code}
                                required
                            />
                            <input
                                type="hidden"
                                id="product_service_charge"
                                name="product_service_charge"
                                value={formData.product_service_charge}
                                required
                            />
                            <input
                                type="hidden"
                                id="product_delivery_charge"
                                name="product_delivery_charge"
                                value={formData.product_delivery_charge}
                                required
                            />
                            <input
                                type="hidden"
                                id="success_url"
                                name="success_url"
                                value={formData.success_url}
                                required
                            />
                            <input
                                type="hidden"
                                id="failure_url"
                                name="failure_url"
                                value={formData.failure_url}
                                required
                            />
                            <input
                                type="hidden"
                                id="signed_field_names"
                                name="signed_field_names"
                                value={formData.signed_field_names}
                                required
                            />
                            <input
                                type="hidden"
                                id="signature"
                                name="signature"
                                value={formData.signature}
                                required
                            />
                            <button type="submit" className="border border-gray-200 bg-gray-100 rounded shadow-md cursor-pointer">
                                <img className="h-12 border border-gray-100" src={esewa} alt="" />
                            </button>
                        </form>

                    </div>
                </div>

                <div className="border border-gray-300 outline-none shadow-md rounded placeholder:text-[14px] text-[14px] p-5">
                    <h3 className="text-lg font-semibold mb-3">
                        BAG SUMMARY <span className="text-gray-500">?</span>
                    </h3>
                    <p className="text-xs">Arrives in 4-7 days</p>
                    <div className="flex items-center">
                        <img
                            src="your-hoodie-image.jpg"
                            alt="Hoodie"
                            className="w-20 mr-3"
                        />
                        <div>
                            <p>Men's UA Hustle Fleece Hoodie</p>
                            <p className="text-xs">1300123-025-XL</p>
                            <p className="text-xs">True Gray Heather (025), XL</p>
                            <p className="text-xs line-through">$49.99 CDN</p>
                            <p className="text-red-500">$37.49 CDN x 1</p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-2">
                        <button className="bg-transparent border-none cursor-pointer text-xs">Edit</button>
                        <button className="bg-transparent border-none cursor-pointer text-xs ml-2">Remove</button>
                    </div>
                </div>
            </div>
        </form >
            <Footer />
        </>
    );
};

export default Finalview;