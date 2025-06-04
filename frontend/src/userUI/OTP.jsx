import React, { useRef, useState } from 'react';
import logo from '../pictures/auclogo.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OTP() {
    const digit1Ref = useRef(null);
    const digit2Ref = useRef(null);
    const digit3Ref = useRef(null);
    const digit4Ref = useRef(null);
    const digit5Ref = useRef(null);
    const digit6Ref = useRef(null);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [resending, setResending] = useState(false);


    const moveToNext = (current, nextFieldRef) => {
        if (current.value.length >= 1 && nextFieldRef.current) {
            nextFieldRef.current.focus();
        }
    };

    const moveToPrevious = (event, current, prevFieldRef) => {
        if (event.key === "Backspace" && current.value.length === 0 && prevFieldRef.current) {
            prevFieldRef.current.focus();
        }
    };

    const getOtpValue = () => {
        const values = [
            digit1Ref.current.value,
            digit2Ref.current.value,
            digit3Ref.current.value,
            digit4Ref.current.value,
            digit5Ref.current.value,
            digit6Ref.current.value,
        ];
        return values.join('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        var email = sessionStorage.getItem('pendingSignupEmail');

        const otp = getOtpValue();

        if (otp.length !== 6) {
            setError('Please enter all 6 digits.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/verify_otp', { email, otp });
            if (response.status === 200) {
                setSuccess('OTP verified!');
                sessionStorage.setItem('userOtp', otp);
                navigate('/reset');
            } else {
                setError('Invalid OTP.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'OTP verification failed.');
        }
    };

    const handleResend = async () => {
        setResending(true);
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('http://localhost:3000/resend_otp', { email });
            if (response.status === 200) {
                setSuccess('OTP has been resent to your email.');
            } else {
                setError('Failed to resend OTP.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error resending OTP.');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="border p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <img className="mx-auto h-12" src={logo} alt="logo" />
                </div>
                <div className="text-center mb-4">
                    <h4 className="text-xl text-red-500 font-semibold my-2">Forget Password</h4>
                    <p className="text-gray-900">Enter the OTP sent to your email to verify your account.</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex space-x-2 justify-center mt-2">
                        {[digit1Ref, digit2Ref, digit3Ref, digit4Ref, digit5Ref, digit6Ref].map((ref, idx) => (
                            <input
                                key={idx}
                                type="text"
                                maxLength="1"
                                id={`value${idx + 1}`}
                                ref={ref}
                                className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-sm outline-none"
                                onInput={(e) => moveToNext(e.target, [digit2Ref, digit3Ref, digit4Ref, digit5Ref, digit6Ref, null][idx])}
                                onKeyDown={(e) => moveToPrevious(e, e.target, [null, digit1Ref, digit2Ref, digit3Ref, digit4Ref, digit5Ref][idx])}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md outline-none cursor-pointer"
                    >
                        Submit
                    </button>

                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resending}
                        className="w-full py-2 px-4 mt-2 bg-green-600 text-white font-semibold rounded-md border outline-none cursor-pointer"
                    >
                        {resending ? 'Resending...' : 'Resend OTP'}
                    </button>

                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-center text-sm">{success}</p>}
                </form>
            </div>
        </div>
    );
}

export default OTP;
