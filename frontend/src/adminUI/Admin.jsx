import React, { useState, useEffect } from 'react';
import user_img from '../pictures/user.jpg';
import API from '../api/API';
import { BASE_URL } from '../api/BaseUrrlForImage';


function Admin({ uid }) {

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
      const response = await API.post("/userProfile", {
        userId: uid,
      });
      if (response.data.length > 0) {
        setUser(response.data[0]);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
    };

    fetchProduct();
  }, [uid]);


  return (
    <>
      <div className="p-2">
        <div className="flex flex-col md:flex-row">
          <main className="flex-1">
            <div className="bg-white rounded-lg px-4 sm:px-6 py-2">
              <div className="flex flex-wrap justify-around w-full">
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Management</h3>
                  <div className="flex flex-col items-center px-4">
                    <div className="w-36 h-42 border border-gray-200 rounded overflow-hidden mb-4">
                      <img src={user.user_profile ? `${BASE_URL}/uploads/${user.user_profile}` : user_img} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full flex justify-center items-center h-12 rounded border border-gray-200 bg-gray-100">
                      <button className="text-gray-600 border border-gray-200 px-16 py-1 bg-white outline-none cursor-pointer text-[13px] font-semibold rounded-md">
                        Your Profile
                      </button>
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    <div>
                      <label className="block text-sm font-medium text-[#1b1b1ee6] my-2">User Login</label>
                      <input
                      value={user.user_email}
                        className="w-full border-gray-300 placeholder:text-[14px] outline-none px-2 py-1 rounded border border-gray-50 text-gray-700 text-[14px]"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1b1ee6] my-2">User Password</label>
                      <input
                        className="w-full border-gray-300 outline-none px-2 py-1 rounded border border-gray-50 text-gray-700 text-[14px]"
                        placeholder="********"
                        
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/4 space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Username</label>
                        <input
                        value={user.user_name}
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50 text-gray-700 text-[14px]"
                          
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">State</label>
                        <input
                        value={user.user_state}
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50 text-gray-700 text-[14px]"
                          
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">District</label>
                        <input
                        value={user.user_district}
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50 text-gray-700 text-[14px]"
                          
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Street/Village</label>
                        <input
                        value={user.user_street}
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50 text-gray-700 text-[14px]"
                          
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Contact</label>
                        <input
                        value={user.user_phone}
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50 text-gray-700 text-[14px]"
                          
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Postal</label>
                        <input
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50 text-gray-700 text-[14px]"
                          
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">WhatsApp</label>
                        <input
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50 text-gray-700 text-[14px]"
                          
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Website</label>
                        <input
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50 text-gray-700 text-[14px]"
                          
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">About the User</h3>
                <textarea
                  className="w-full mt-1 border-gray-300 text-gray-700 text-[14px] outline-none p-2 rounded border border-gray-50 resize-none"
                  rows="4"
                  defaultValue = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Admin;