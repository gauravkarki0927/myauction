import React from 'react'
import logo from '../pictures/logo.png';

function Login() {
    return (
        <>
            <div className="flex justify-center items-center h-[100vh] custom-bg">
                <div className="p-10 rounded-md w-auto bg-[#24242aab] backdrop-blur-sm">
                    <div className="flex flex-col gap-1 items-center">
                        <p className="font-semibold text-white text-[24px] xl:text-[28px] md:text[16px]"> <a href="#home"><span className="text-rose-700">My</span>Auction</a> </p>
                    </div>
                    <form action="#" method="POST">

                        <div className="mb-4">
                            <label for="username" className="block text-gray-200">Username</label>
                            <input type="text" id="username" name="username" className="w-full text-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between">
                                <label for="password" className="block text-gray-200">Password</label>
                                <a href="#" className="text-[13px] text-red-500 hover:underline">Forgot Password?</a>
                            </div>
                            <input type="password" id="password" name="password" className="w-full text-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                    </form>
                    <div className="mt-2 text-center text-white">
                        Don't have an account ?<a href="/signup" className="px-2 hover:underline italic text-blue-400">Register Now</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
