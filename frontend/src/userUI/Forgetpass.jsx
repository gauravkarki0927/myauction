import React, { useState } from 'react';
import logo from '../pictures/auclogo.jpg';
import { useNavigate } from 'react-router-dom';


function Forgetpass() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/send_otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('pendingSignupEmail', email);
                setMessage('OTP has been sent to your email.');
                navigate('/otp');
            } else {
                setMessage(data.message || 'Something went wrong.');
            }
        } catch (error) {
            setMessage('Server error.', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="border p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <img className="mx-auto h-12" src={logo} alt="logo" />
                </div>
                <div className="text-center mb-6">
                    <h4 className="text-xl text-red-500 font-semibold">Forgot Password</h4>
                    <p className="text-gray-900">Enter your registered email to receive the OTP.</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm">Your Email:</label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className="w-full py-2 px-4 bg-black text-white rounded-md outline-none cursor-pointer"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Get OTP'}
                    </button>
                    {message && <p className="text-center text-sm text-red-500">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default Forgetpass;
