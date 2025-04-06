import React, { useState } from 'react';

function Compartment() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const handleButtonClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <>
      <div className="bg-gray-200">
        <div
          id="dashboard"
          className={`h-auto w-full bg-red-200 ${activeSection === 'dashboard' ? 'block' : 'hidden'
            }`} >
        </div>
        <div
          id="allitems"
          className={`h-auto w-full bg-green-200 ${activeSection === 'allitems' ? 'block' : 'hidden'
            }`} >
        </div>
        <div
          id="users"
          className={`h-auto w-full bg-orange-200 ${activeSection === 'users' ? 'block' : 'hidden'
            }`} >
        </div>
        <div
          id="recipt"
          className={`h-auto w-full bg-blue-200 ${activeSection === 'recipt' ? 'block' : 'hidden'
            }`} >
        </div>
        <div
          id="reviews"
          className={`h-auto w-full bg-pink-200 ${activeSection === 'reviews' ? 'block' : 'hidden'
            }`} >
        </div>
        <div
          id="adduser"
          className={`h-auto w-full bg-emerald-200 ${activeSection === 'adduser' ? 'block' : 'hidden'
            }`} >
        </div>
        <div
          id="additems"
          className={`h-auto w-full bg-rose-200 ${activeSection === 'additems' ? 'block' : 'hidden'
            }`} >
        </div>
        <div
          id="updatereq"
          className={`h-auto w-full bg-teal-200 ${activeSection === 'updatereq' ? 'block' : 'hidden'
            }`} >
        </div>
        <div
          id="profile"
          className={`h-auto w-full bg-black ${activeSection === 'profile' ? 'block' : 'hidden'
            }`} >
        </div>
        <div
          id="editprofile"
          className={`h-auto w-full ${activeSection === 'editprofile' ? 'block' : 'hidden'
            }`} >
        </div>
      </div>
    </>
  )
}

export default Compartment
