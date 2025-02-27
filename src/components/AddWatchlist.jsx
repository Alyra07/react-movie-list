import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '/supabaseClient';

function AddWatchlist({ movie, userId }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkIfInWatchlist = async () => {
      if (!userId) return;
      const { data, error } = await supabase
        .from('watchlists')
        .select('id')
        .eq('user_id', userId)
        .eq('movie_id', movie.id);

      if (error) {
        console.error('Error checking watchlist:', error.message);
      }

      setIsActive(data && data.length > 0);
    };

    checkIfInWatchlist();
  }, [movie, userId]);

  const addToWatchlist = async () => {
    if (!userId) {
      alert("You need to be logged in to add movies to your watchlist.");
      return;
    }
    
    // Store the TMDB movie details in the watchlist
    const { error } = await supabase
      .from('watchlists')
      .insert([{ 
        user_id: userId,
        movie_id: movie.id,
        title: movie.title || movie.name,
        language: movie.original_language,
        poster_path: movie.poster_path,
        release_date: movie.release_date || movie.first_air_date,
        overview: movie.overview,
        original_title: movie.original_title || movie.name,
      }]);

    if (error) {
      alert('Error adding to watchlist: ' + error.message);
    } else {
      setIsActive(true);
    }
  };

  return (
    <div>
      <button onClick={addToWatchlist}>
        <img 
          className="min-w-20 max-w-20"
          src={isActive ? '/img/watchlist-active.png' : '/img/watchlist-nope.png'} 
          alt="Add to watchlist" 
        />
      </button>
    </div>
  );
}

AddWatchlist.propTypes = {
  movie: PropTypes.object.isRequired,
  userId: PropTypes.string,
};

export default AddWatchlist;