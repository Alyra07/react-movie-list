import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { supabase } from '/supabaseClient';
import "../App.css";

function Watchlist({ userId }) {
  const [watchlist, setWatchlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch watchlist from Supabase
    const fetchWatchlist = async () => {
      try {
        const { data, error } = await supabase
          .from('watchlists')
          .select('movie_id, title, language, poster_path, release_date, overview, original_title')
          .eq('user_id', userId);
  
        if (error) {
          throw error;
        }
  
        setWatchlist(data || []);
      } catch (error) {
        console.error('Error fetching watchlist:', error.message);
      }
    };
  
    if (userId) {
      fetchWatchlist();
    }
  }, [userId]);

  // handling movie click to navigate to details page
  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.movie_id}`, { 
      state: { 
        movie: {
          name: movie.title,
          first_air_date: movie.release_date,
          title: movie.title,
          original_language: movie.language,
          release_date: movie.release_date,
          original_title: movie.original_title,
          poster_path: movie.poster_path,
          overview: movie.overview,
        } 
      } 
    });
  };
  
  // deleting titles from watchlist
  const removeFromWatchlist = async (movieId) => {
    try {
      const { error } = await supabase
        .from('watchlists')
        .delete()
        .eq('movie_id', movieId)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      setWatchlist(watchlist.filter(movie => movie.movie_id !== movieId));
    } catch (error) {
      console.error('Error removing from watchlist:', error.message);
    }
  };

  const filteredWatchlist = watchlist.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  // Pagination logic
  const moviesPerPage = 5;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredWatchlist.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredWatchlist.length / moviesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className= "mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mt-4 mb-6">
        <h2 className="text-xl font-semibold p-4 bg-rose-100 rounded-lg">Your Watchlist</h2>
      </div>

      <div className="flex justify-center">
        <table className="movie-table min-w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Language</th>
              <th className='movie-poster'> </th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {currentMovies.length > 0 ? (
              currentMovies.map((movie) => (
                <tr key={movie.movie_id} className="cursor-pointer">
                  <td className='movie-title' onClick={() => handleMovieClick(movie)}>
                    {movie.title}
                  </td>
                  <td onClick={() => handleMovieClick(movie)}>
                    {movie.language}
                  </td>
                  <td onClick={() => handleMovieClick(movie)}
                  className='movie-poster'>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{ width: "150px" }} alt={movie.title} />
                  </td>
                  <td className=''>
                    <button onClick={() => removeFromWatchlist(movie.movie_id)}>
                      <img 
                        className="min-w-20 max-w-20"
                        src='/img/watchlist-active.png' 
                        alt="Remove from watchlist" 
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No titles in your Watchlist!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center space-x-2 xxs:space-x-1 md:space-x-2 lg:space-x-3 xl:space-x-4 mt-6">
        {pageNumbers.map(number => (
          <button 
            key={number} 
            onClick={() => setCurrentPage(number)}
            className={`text-lg xxs:text-base md:text-lg lg:text-xl text-blue-950 bg-rose-200 rounded-lg font-semibold p-2 xxs:p-1 md:p-2 lg:p-3 px-4 xxs:px-2 md:px-3 lg:px-4 my-4 xxs:my-2 md:my-3 lg:my-4 ml-4 xxs:ml-2 md:ml-3 lg:ml-4 hover:underline ${currentPage === number ? 'focus:ring focus:ring-blue-950' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

Watchlist.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Watchlist;