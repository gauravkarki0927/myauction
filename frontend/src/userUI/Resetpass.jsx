import React, { useState, useEffect } from 'react';
import logo from '../pictures/auclogo.jpg';
import API from '../api/API.js';
import { useNavigate } from 'react-router-dom';

function Resetpass() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    var storedEmail = sessionStorage.getItem('pendingSignupEmail');

    useEffect(() => {
        const storedOtp = sessionStorage.getItem('userOtp');

        if (!storedOtp) {
            navigate('/otp');
        }
    }, []);

    const handleForm = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!password) {
            setError('Password is required.');
            return;
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        } else if (!/[a-z]/.test(password)) {
            setError('Password must include at least one lowercase letter.');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setError('Password must include at least one uppercase letter.');
            return;
        } else if (!/\d/.test(password)) {
            setError('Password must include at least one number.');
            return;
        } else if (!/[@$!%*?&]/.test(password)) {
            setError('Password must include at least one special character (@$!%*?&).');
            return;
        }

        if (!confirmPassword) {
            setError('Confirm password is required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await API.post('/reset_password', {
                email: storedEmail,
                newPassword: password,
            });

            if (response.status === 200) {
                setSuccess('Password changed successfully!');
                sessionStorage.clear();
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError('Failed to reset password.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Server error.');
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="border p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <img className="mx-auto h-12" src={logo} alt="logo" />
                </div>
                <div className="text-center text-gray-800 mb-6">
                    <h4 className="text-xl font-semibold">Reset Password</h4>
                    <p>Please enter your new password below.</p>
                </div>
                <form className="space-y-4" onSubmit={handleForm}>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password:
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                            Confirm Password:
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none"
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-md outline-none cursor-pointer"
                        type="submit"
                    >
                        Submit
                    </button>

                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-center text-sm">{success}</p>}
                </form>
            </div>
        </div>
    );
}

export default Resetpass;