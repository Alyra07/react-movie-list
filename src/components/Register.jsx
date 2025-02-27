import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '/supabaseClient';

function RegistrationPage({ setUserId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  async function signUp(e) {
    e.preventDefault();
  
    // Check if the username already exists
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('username', username);
  
    if (userError) {
      console.error('Error checking existing username:', userError);
      alert('Error checking existing username: ' + userError.message);
      return;
    }
  
    if (existingUser && existingUser.length > 0) {
      console.log('Username already exists. Please choose a different username.');
      alert('Username already exists. Please choose a different username.');
      return;
    }
  
    // Insert the new user into the users table
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password, username }]);
  
    if (error) {
      console.error('Error signing up:', error);
      alert('Error signing up: ' + error.message);
      return;
    }
  
    // Registration successful
    alert('Registration successful! Redirect to login page.');
    setUserId(data[0].id); // Update userId in the parent component
    navigate('/login');
  }

  return (
    <div>
      <form onSubmit={signUp} className="flex flex-col flex-wrap bg-blue-950 bg-opacity-90 justify-center rounded-lg shadow-lg p-4">
        <h2 className='text-2xl font-semibold text-white mb-6'>Register</h2>
        <label className='text-white'>Username:</label>
        <input
          className="text-lg text-blue-950 bg-white-400 bg-opacity-90 rounded-lg font-semibold p-2 px-4 my-4"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className='text-white'>Email:</label>
        <input
          className="text-lg text-blue-950 bg-white-400 bg-opacity-90 rounded-lg font-semibold p-2 px-4 my-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className='text-white'>Password:</label>
        <input
          className="text-lg text-blue-950 bg-white-400 bg-opacity-90 rounded-lg font-semibold p-2 px-4 my-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="text-lg text-blue-950 bg-rose-200 rounded-lg font-semibold p-2 px-4 my-4 hover:underline">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationPage;