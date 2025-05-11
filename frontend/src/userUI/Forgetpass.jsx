import React from 'react'
import logo from '../pictures/auclogo.jpg';

function Forgetpass() {
    return (
        <>
            <div className="min-h-screen">
                <div className="h-screen flex justify-center items-center">
                    <div id="ff0001" className="border-[1px] border-[#81808053] p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-center mb-6">
                            <img className="mx-auto h-12" src={logo} alt="logo" />
                        </div>
                        <div className="text-center mb-6">
                            <h4 className="text-xl text-red-500 font-semibold my-2">Forgot Password</h4>
                            <p className="text-gray-900">Please provide your registered email to receive the OTP from the website.</p>
                        </div>
                        <div className="inp">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm">
                                        Your Email:
                                    </label>
                                    <input
                                        className="mt-1 block bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        type="email"
                                        id="email"
                                        name="user_email"
                                        required
                                    />
                                    <input
                                        className="mt-1 block bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        type="hidden"
                                        id="otp_message"
                                        name="message" value={`Your verification code for account registration is Please do not share this message with anyone.`}
                                    />
                                </div>
                                <button
                                    className="w-full py-2 px-4 bg-black text-white cursor-pointer font-semibold rounded-md shadow-md"
                                    type="submit"
                                >
                                    Get OTP
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgetpass
