import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '/supabaseClient';

function LoginPage({ setUserId }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    const { data, error } = await supabase
      .from('users')
      .select('id, username')
      .eq('username', username)
      .eq('password', password); // Note: this is for simplicity; no compared hashed passwords

    if (error) {
      alert('Login failed: ' + error.message);
    } else if (data && data.length > 0) {
      const user = data[0];
      alert('Success! Logged in as ' + user.username);
      setUserId(user.id); // set user id in parent component -> for watchlist, profile etc.
      navigate('/');
    } else {
      alert('Login failed: Invalid username or password');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}
      className="flex flex-col flex-wrap bg-blue-950 bg-opacity-90 justify-center rounded-lg shadow-lg p-4">
        <h2 className='text-2xl font-semibold text-white mb-6'>Login</h2>
        <label className='text-white'>Username:</label>
        <input
          className="text-lg text-blue-950 bg-white-400 bg-opacity-90 rounded-lg font-semibold p-2 px-4 my-4"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;