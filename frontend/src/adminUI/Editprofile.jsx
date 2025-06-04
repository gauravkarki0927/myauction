import React, { useState, useEffect, useRef } from 'react';
import user_img from '../pictures/user.jpg';
import axios from 'axios';

function Editprofile({ ussid }) {
  const [profilePicSrc, setProfilePicSrc] = useState(user_img);
  const inputFileRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfilePicSrc(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    inputFileRef.current.click();
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post("http://localhost:3000/userProfile", {
          userId: ussid,
        });
        if (response.data.length > 0) {
          setUser(response.data[0]);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchProduct();
  }, [ussid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (selectedFile) {
      formData.append('profile_pic', selectedFile);
    }

    try {
      const response = await axios.post('http://localhost:3000/updateUser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <>
      <div className="p-2">
        <div className="flex flex-col md:flex-row">
          <main className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md px-4 sm:px-6 py-2">
              <div className="flex flex-wrap justify-around w-full">
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Management</h3>
                  <div className="flex flex-col items-center px-4">
                    <div className="w-36 h-42 rounded overflow-hidden mb-4">
                      <img src={user.user_profile ? `http://localhost:3000/uploads/${user.user_profile}` : profilePicSrc} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full flex justify-center items-center h-12 rounded border border-gray-200 bg-gray-100">
                      <input
                        type="file"
                        accept="image/*"
                        ref={inputFileRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <label
                        htmlFor="image"
                        className="text-gray-600 border border-gray-200 px-16 py-1 bg-white outline-none cursor-pointer text-[13px] font-semibold rounded-md"
                      >
                        Upload Photo
                      </label>
                    </div>

                  </div>
                  <div className="px-4 py-2">
                    <div>
                      <label className="block text-sm font-medium text-[#1b1b1ee6] my-2">User Login</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="Your login email"
                        value={user.user_email || ""}
                        onChange={(e) => setUser({ ...user, user_email: e.target.value })}
                        className="w-full border-gray-300 placeholder:text-[14px] text-[14px] outline-none px-2 py-1 rounded border border-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1b1ee6] my-2">User Password</label>
                      <input
                        name="password"
                        type="password"
                        placeholder="Your password.."
                        className="w-full border-gray-300 placeholder:text-[14px] text-[14px] outline-none px-2 py-1 rounded border border-gray-50"
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
                          name="user"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                          value={user.user_name || ""}
                          onChange={(e) => setUser({ ...user, user_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">State</label>
                        <input
                          name="state"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                          value={user.user_state || ""}
                          onChange={(e) => setUser({ ...user, user_state: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">District</label>
                        <input
                          name="district"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                          value={user.user_district || ""}
                          onChange={(e) => setUser({ ...user, user_district: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Street/Village</label>
                        <input
                          name="street"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                          value={user.user_street || ""}
                          onChange={(e) => setUser({ ...user, user_street: e.target.value })}
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
                          name="postal"
                          type="postal"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                          value={user.user_phone || ""}
                          onChange={(e) => setUser({ ...user, user_phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Postal</label>
                        <input
                          name="social1"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">WhatsApp</label>
                        <input
                          name="social2"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Website</label>
                        <input
                          name="social3"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
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
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
              </div>
              <div className="my-2 flex justify-end items-center">
                <button type="submit" className="border border-gray-200 px-4 py-2 bg-black text-white outline-none cursor-pointer text-[13px] font-semibold rounded-md">
                  Update
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export default Editprofile;