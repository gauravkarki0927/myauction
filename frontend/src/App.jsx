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
import Innersearch from './userUI/access/Innersearch';
import Allproducts from './userUI/Allproducts';
import CheckoutPage from './userUI/access/Checkout';
import Finalview from './userUI/access/Finalview';
import Reviewbox from './userUI/access/Reviewbox';
import Esewasuccess from './userUI/access/Esewasuccess';
import Esewafailure from './userUI/access/Esewafailure';
import Test from './userUI/access/Test';
import Admindash from './adminUI/Admindash';
import Innerprodetails from './userUI/access/Innerprodetails';
import Ifilter from './userUI/access/Ifilter';
import Forgetpass from './userUI/Forgetpass';
import UpdateProduct from './userUI/access/UpdateProduct';
import Verifyemail from './userUI/Verifyemail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usernav" element={<Usernav />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyemail" element={<Verifyemail />} />
        <Route path="/forget" element={<Forgetpass />} />
        {/* <Route path="/otp" element={<OTP />} /> */}
        {/* <Route path="/reset" element={<Resetpass />} /> */}
        <Route path="/product" element={<Productdetails />} />
        <Route path="/viewmore" element={<Viewmore />} />
        <Route path="/allproducts" element={<Allproducts />} />
        <Route path="/aboutus" element={<AboutUS />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/service" element={<Services />} />
        <Route path="/review" element={<Review />} />
        <Route path="/search" element={<Outersearch />} />
        <Route path="/access/isearch" element={<Innersearch />} />
        <Route path="/access/innerproduct" element={<Innerprodetails />} />
        <Route path="/access/userdash" element={<Userdash />} />
        <Route path="/access/ifilter" element={<Ifilter />} />
        <Route path="/access/updateProduct" element={<UpdateProduct />} />
        <Route path="/access/myitems" element={<Myitems />} />
        <Route path="/access/givereview" element={<Givereviews />} />
        <Route path="/access/reviewbox" element={<Reviewbox />} />
        <Route path="/access/payments" element={<Payments />} />
        <Route path="/access/checkout" element={<CheckoutPage />} />
        <Route path="/access/finalview" element={<Finalview />} />
        <Route path="/access/success" element={<Esewasuccess />} />
        <Route path="/access/failure" element={<Esewafailure />} />
        <Route path="/access/userprofile" element={<Profile />} />
        <Route path="/access/test" element={<Test />} />
        <Route path="/admin" element={<Admindash />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
