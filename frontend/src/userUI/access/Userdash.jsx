import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'
import Footer from '../Footer'
import Allproducts from '../Allproducts'
import API from '../../api/API.js'
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

        const response = await API.get("/access/userdash", {
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
      {user_id !== null && <Allproducts user_id={user_id} />}
      {user_id !== null && <Footer userid={user_id} />}
    </>
  )
}

export default Userdash
