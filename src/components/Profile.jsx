import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { supabase } from '/supabaseClient';

function Profile({ userId }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  // Fetch user's data based on user ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('username')
          .eq('id', userId)
          .single();

        if (error) {
          throw error;
        }

        setUser(data);
        setNewUsername(data.username);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Function to handle clicking on profile image
  const handleProfileClick = () => {
    if (userId) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  // Function to handle editing the username
  const handleEdit = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ username: newUsername })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      setIsEditing(false);
      setUser({ ...user, username: newUsername }); // Update the displayed username
    } catch (error) {
      console.error('Error updating username:', error.message);
    }
  };

  // Function to handle deleting the user account
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) {
        throw error;
      }

      navigate('/login');
    } catch (error) {
      console.error('Error deleting user account:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-950 bg-opacity-90 rounded-lg p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-white">Your Profile</h2>

      {/* Login button when no user is logged in */}
      {!userId && (
        <button onClick={() => navigate('/login')} className="text-white underline mt-4">
          Login
        </button>
      )}

      {/* Profile image */}
      <button onClick={handleProfileClick} className="mt-4">
        <img src="/img/profile-pic1.jpg" alt="Profile" className="w-64 h-auto rounded-full" />
      </button>

      {/* Display username */}
      {user && (
        <div className="mt-4">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mr-2"
              />
              <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-semibold text-white">{user.username}</h1>
              <button onClick={() => setIsEditing(true)} className="text-lg text-blue-950 bg-rose-200 rounded-lg font-semibold p-2 px-4 my-4 hover:underline">
                Edit
              </button>
              <button onClick={handleDelete} className="text-lg text-blue-950 bg-rose-200 rounded-lg font-semibold p-2 px-4 my-4 ml-4 hover:underline">
                Delete Account
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {
  userId: PropTypes.string,
};

export default Profile;