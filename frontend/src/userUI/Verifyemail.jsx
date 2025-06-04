import React, { useRef } from 'react';
import logo from '../pictures/auclogo.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'

function Verifyemail() {
    const digit1Ref = useRef(null);
    const digit2Ref = useRef(null);
    const digit3Ref = useRef(null);
    const digit4Ref = useRef(null);
    const digit5Ref = useRef(null);
    const digit6Ref = useRef(null);
    const navigate = useNavigate();

    const moveToNext = (current, nextFieldRef) => {
        if (current.value.length >= 1) {
            nextFieldRef.current.focus();
        }
    };

    const moveToPrevious = (event, current, prevFieldRef) => {
        if (event.key === "Backspace" && current.value.length === 0) {
            prevFieldRef.current.focus();
        }
    };

    const email = localStorage.getItem('pendingSignupEmail');

    const handleSubmit = (event) => {
        event.preventDefault();
        const a = document.getElementById('value1').value;
        const b = document.getElementById('value2').value;
        const c = document.getElementById('value3').value;
        const d = document.getElementById('value4').value;
        const e = document.getElementById('value5').value;
        const f = document.getElementById('value6').value;

        const enteredOtp = [a, b, c, d, e, f].join('');

        axios.post('http://localhost:3000/verify-otp', {
            email: email,
            otp: enteredOtp
        })
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
                localStorage.clear();
                navigate('/login');
            })
            .catch(() => {
                toast.error("Invalid or expired verification code.", { position: "top-right" });
            });
    };

    return (
        <div className="min-h-screen">
            <div className="h-screen flex justify-center items-center">
                <div id="ff0001" className="border-[1px] border-[#81808053] p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex justify-center mb-6">
                        <img className="mx-auto h-12" src={logo} alt="logo" />
                    </div>
                    <div className="text-center mb-6">
                        <h4 className="text-xl font-semibold my-2">Email Verification</h4>
                        <p className="text-gray-900">Please enter the OTP sent to your provided email to verify your email address.</p>
                    </div>
                    <div className="inp">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex space-x-2 justify-center mt-2">
                                <input
                                    type="text"
                                    maxLength="1"
                                    id="value1"
                                    className="w-12 h-12 bg-transparent text-gray-900 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    ref={digit1Ref}
                                    onInput={(event) => moveToNext(event.target, digit2Ref)}
                                    onKeyDown={(event) => moveToPrevious(event, event.target, digit1Ref)}
                                    autoFocus
                                />
                                <input
                                    type="text"
                                    maxLength="1"
                                    id="value2"
                                    className="w-12 h-12 bg-transparent text-gray-900 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    ref={digit2Ref}
                                    onInput={(event) => moveToNext(event.target, digit3Ref)}
                                    onKeyDown={(event) => moveToPrevious(event, event.target, digit1Ref)}
                                />
                                <input
                                    type="text"
                                    maxLength="1"
                                    id="value3"
                                    className="w-12 h-12 bg-transparent text-gray-900 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    ref={digit3Ref}
                                    onInput={(event) => moveToNext(event.target, digit4Ref)}
                                    onKeyDown={(event) => moveToPrevious(event, event.target, digit2Ref)}
                                />
                                <input
                                    type="text"
                                    maxLength="1"
                                    id="value4"
                                    className="w-12 h-12 bg-transparent text-gray-900 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    ref={digit4Ref}
                                    onInput={(event) => moveToNext(event.target, digit5Ref)}
                                    onKeyDown={(event) => moveToPrevious(event, event.target, digit3Ref)}
                                />
                                <input
                                    type="text"
                                    maxLength="1"
                                    id="value5"
                                    className="w-12 h-12 bg-transparent text-gray-900 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    ref={digit5Ref}
                                    onInput={(event) => moveToNext(event.target, digit6Ref)}
                                    onKeyDown={(event) => moveToPrevious(event, event.target, digit4Ref)}
                                />
                                <input
                                    type="text"
                                    maxLength="1"
                                    id="value6"
                                    className="w-12 h-12 bg-transparent text-gray-900 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    ref={digit6Ref}
                                    onInput={(event) => moveToNext(event.target, digit6Ref)}
                                    onKeyDown={(event) => moveToPrevious(event, event.target, digit5Ref)}
                                />
                            </div>
                            <button
                                className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none cursor-pointer"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verifyemail;
