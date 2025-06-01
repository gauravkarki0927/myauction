import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Reviewbox() {
  const [user_id, setUser_id] = useState(null);
  const [user, setUser] = useState({});
  const [review, setReview] = useState('');
  const navigate = useNavigate();

  const onClose = () => {
    const box = document.getElementById('reviewBox');
    if (box) box.style.display = 'none';
  };

  // Step 1: Get user_id from token
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get("http://localhost:3000/access/givereview", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser_id(response.data.userId);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    getUserData();
  }, [navigate]);

  // Step 2: Fetch user profile using user_id
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user_id) return;

      try {
        const response = await axios.post("http://localhost:3000/userProfile", {
          userId: user_id,
        });

        if (response.data.length > 0) {
          setUser(response.data[0]);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUserProfile();
  }, [user_id]);

  // Step 3: Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        user_id,
        user_name: user.user_name,
        user_profile: user.user_profile,
        review,
      };

      const response = await axios.post('http://localhost:3000/reviews', payload);

      if (response.status === 200) {
        alert('Review submitted successfully!');
        setReview('');
        onClose();
      } else {
        alert('Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Error submitting review');
    }
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white p-6 rounded border border-gray-200 shadow-md"
      id="reviewBox"
    >
      <i
        className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-red-600 fa fa-times"
        onClick={onClose}
      ></i>
      <h2 className="text-center mb-5 text-lg font-semibold">Give Your Review</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-2">User Name:</label>
        <input
          type="text"
          id="name"
          value={user?.user_name || ''}
          readOnly
          className="w-full p-2 mb-5 rounded border border-gray-300 focus:outline-none focus:border-green-500"
        />

        <input
          type="hidden"
          value={user?.user_profile || ''}
        />

        <label htmlFor="review" className="block mb-2">Review:</label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="4"
          className="w-full p-2 mb-5 rounded border border-gray-300 resize-none focus:outline-none focus:border-green-500"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full text-white cursor-pointer bg-gray-600 shadow-md p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Reviewbox;