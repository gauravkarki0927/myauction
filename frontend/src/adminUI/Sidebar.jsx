import React, { useState } from 'react';

function Sidebar() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const handleButtonClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <>
      <div className="w-full flex gap-2 p-2">
        <div className="w-1/5 block space-y-2 text-[14px] font-semibold">
          <button
            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'dashboard' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('dashboard')}
          >
            <i className="fa-regular fa-window-restore mx-2"></i> DashBoard
          </button>
          <button
            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'allitems' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('allitems')}
          >
            <i className="fa-solid fa-list mx-2 mx-2"></i>View Items
          </button>
          <button
            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'users' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('users')}
          >
            <i className="fa-solid fa-users mx-2"></i>View Users
          </button>
          <button
            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'recipt' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('recipt')}
          >
            <i className="fa-regular fa-clipboard mx-2"></i>Payment Recipt
          </button>
          <button
            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'reviews' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('reviews')}
          >
            <i className="fa-brands fa-readme mx-2"></i>User Reviews
          </button>
          <button
            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'adduser' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('adduser')}
          >
            <i className="fa-solid fa-user-plus mx-2"></i>Add User
          </button>
          <button
            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'additems' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('additems')}
          >
            <i className="fa-solid fa-plus mx-2"></i>Add Items
          </button>
          <button
            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'updatereq' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('updatereq')}
          >
            <i className="fa-solid fa-pen-to-square mx-2"></i>Update Request
          </button>
          <button
            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'profile' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('profile')}
          >
            <i className="fa-solid fa-user mx-2"></i>Admin Profile
          </button>
          <button
            className={`flex items-center px-4 w-full py-2 border border-gray-200 rounded-sm cursor-pointer shadow-md ${activeSection === 'editprofile' ? 'bg-gray-600 text-white' : ''
              }`}
            onClick={() => handleButtonClick('editprofile')}
          >
            <i className="fa-solid fa-user-pen mx-2"></i>Edit Admin Profile
          </button>
        </div>
        <div className="w-4/5 bg-gray-200">
          <div
            id="dashboard"
            className={`h-auto w-full bg-red-200 ${activeSection === 'dashboard' ? 'block' : 'hidden'
              }`} >
                Dashboard
          </div>
          <div
            id="allitems"
            className={`h-auto w-full bg-green-200 ${activeSection === 'allitems' ? 'block' : 'hidden'
              }`} >
                All Items
          </div>
          <div
            id="users"
            className={`h-auto w-full bg-orange-200 ${activeSection === 'users' ? 'block' : 'hidden'
              }`} >
                Users
          </div>
          <div
            id="recipt"
            className={`h-auto w-full bg-blue-200 ${activeSection === 'recipt' ? 'block' : 'hidden'
              }`} >
                Recipts
          </div>
          <div
            id="reviews"
            className={`h-auto w-full bg-pink-200 ${activeSection === 'reviews' ? 'block' : 'hidden'
              }`} >
                Reviews
          </div>
          <div
            id="adduser"
            className={`h-auto w-full bg-emerald-200 ${activeSection === 'adduser' ? 'block' : 'hidden'
              }`} >
                Add User
          </div>
          <div
            id="additems"
            className={`h-auto w-full bg-rose-200 ${activeSection === 'additems' ? 'block' : 'hidden'
              }`} >
                Add Items
          </div>
          <div
            id="updatereq"
            className={`h-auto w-full bg-teal-200 ${activeSection === 'updatereq' ? 'block' : 'hidden'
              }`} >
                Update Request
          </div>
          <div
            id="profile"
            className={`h-auto w-full bg-black ${activeSection === 'profile' ? 'block' : 'hidden'
              }`} >
                Profile
          </div>
          <div
            id="editprofile"
            className={`h-auto w-full ${activeSection === 'editprofile' ? 'block' : 'hidden'
              }`} >
                Edit Profile
          </div>
          <div
            id="notify"
            className={`h-auto w-full bg-black ${activeSection === 'notify' ? 'block' : 'hidden'
              }`} >
                Notification
          </div>
          <div
            id="sendmail"
            className={`h-auto w-full ${activeSection === 'sendmail' ? 'block' : 'hidden'
              }`} >
                Send Mail to user
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
