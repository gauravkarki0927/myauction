import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'
import Footer from '../Footer'
import Allproducts from '../Allproducts'
import axios from 'axios'
import Ifilter from './Ifilter';

function Userdash() {

  const [user_id, setUser_id] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get("http://localhost:3000/access/userdash", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setUser_id(response.data.userId);

      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <Navigation />
      <Ifilter />
      <Allproducts user_id={user_id} />
      <Footer />
    </>
  )
}

export default Userdash
