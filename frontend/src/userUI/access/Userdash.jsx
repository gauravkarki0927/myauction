import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'
import Filter from '../Filter'
import Footer from '../Footer'
import Allproducts from '../Allproducts'
import axios from 'axios'

function Userdash() {
  
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
        console.log(response.data);

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
      <Filter />
      <Allproducts />
      <Footer />
    </>
  )
}

export default Userdash
