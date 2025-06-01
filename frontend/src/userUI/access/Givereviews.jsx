import Navigation from './Navigation';
import Footer from '../Footer';
import Reviewbox from './Reviewbox';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Givereviews() {
  const navigate = useNavigate();
  const [user_id, setUser_id] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [hasGivenReview, setHasGivenReview] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editText, setEditText] = useState('');


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

  useEffect(() => {
    if (user_id) {
      axios.get(`http://localhost:3000/getReviews`)
        .then(res => {
          const allReviews = res.data;
          setReviews(allReviews);

          const userReviewExists = allReviews.some(review => review.uid === user_id);
          setHasGivenReview(userReviewExists);
        })
        .catch(err => console.error(err));
    }
  }, [user_id]);

  const handleEdit = (rid, newReview) => {
    axios.put(`http://localhost:3000/updateReview/${rid}`, { review: newReview })
      .then(() => {
        setReviews(prev =>
          prev.map(r => r.rid === rid ? { ...r, review: newReview } : r)
        );
        alert("Review updated successfully!");
      })
      .catch(err => {
        console.error("Error updating review:", err);
        alert("Failed to update the review. Please try again.");
      });
  };

  const handleDelete = async (rid) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/deleteReview/${rid}`);
      setReviews(prev => prev.filter(r => r.rid !== rid));
      alert("Review deleted successfully!");
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete the review. Please try again.");
    }
  };


  return (
    <>
      <Navigation />
      {!hasGivenReview && <Reviewbox />}
      <div>
        <div className="flex flex-wrap justify-left mt-16 xl:px-16 lg:px-12 md:px-10 px-6 py-3">
          {reviews.map(data => (
            <div className="px-2 py-4 lg:w-1/3 md:w-full" key={data.rid}>
              <div className="space-y-2 border-2 rounded-lg border-gray-200 border-opacity-50 p-2">
                <div className="flex gap-4">
                  <div className="w-16 h-16 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full overflow-hidden">
                    {data.profile && (
                      <img
                        className="w-full h-full object-cover"
                        src={`http://localhost:3000/uploads/${data.profile}`}
                        alt="Profile"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-lg title-font font-medium">{data.user_name}</h2>
                    <p className="text-gray-900 text-[13px] mb-3">{new Date(data.created_at).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex flex-wrap">
                  {editingReviewId === data.rid ? (
                    <>
                      <textarea
                        className="w-full border border-gray-300 outline-none resize-none rounded p-2 mb-2"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                          onClick={() => {
                            handleEdit(data.rid, editText);
                            setEditingReviewId(null);
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-400 text-white px-3 py-1 rounded cursor-pointer"
                          onClick={() => setEditingReviewId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="leading-relaxed">{data.review}</p>
                  )}
                </div>

                {data.uid === user_id && editingReviewId !== data.rid && (
                  <div className="flex gap-2 mt-3">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                      onClick={() => {
                        setEditingReviewId(data.rid);
                        setEditText(data.review);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                      onClick={() => handleDelete(data.rid)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Givereviews;
