import React from 'react'
import Usernav from './userUI/Usernav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './userUI/Home';
import Login from './userUI/Login';
import Productdetails from './userUI/Productdetails';
import Viewmore from './userUI/Viewmore';
import AboutUS from './userUI/AboutUS';
import Contactus from './userUI/Contactus';
import Review from './userUI/Review';
import Services from './userUI/Services';
import Outersearch from './userUI/Outersearch';
import Signup from './userUI/Signup';
import Userdash from './userUI/access/Userdash';
import Myitems from './userUI/access/Myitems';
import Givereviews from './userUI/access/Givereviews';
import Payments from './userUI/access/Payments';
import Profile from './userUI/access/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usernav" element={<Usernav />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/forget" element={<Forgetpass />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset" element={<Resetpass />} /> */}
        <Route path="/product" element={<Productdetails />} />
        <Route path="/viewmore" element={<Viewmore />} />
        <Route path="/aboutus" element={<AboutUS />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/service" element={<Services />} />
        <Route path="/review" element={<Review />} />
        <Route path="/search" element={<Outersearch />} />
        <Route path="/userdash" element={<Userdash />} />
        <Route path="/products" element={<Myitems />} />
        <Route path="/givereview" element={<Givereviews />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/userprofile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
