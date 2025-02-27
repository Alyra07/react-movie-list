import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import AddWatchlist from './AddWatchlist';
import "../App.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MovieList({ onMovieClick, userId }) {
  const [movieList, setMovies] = useState([]);
  const [select, setSelect] = useState('movie');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch movies / tv shows from API
  const getMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/${select}?api_key=ee9e9c9c1c339e786293338394739613`);
      const data = await response.json();
      setMovies(data.results);
      console.log('Fetched Movies:', data.results); // Log fetched movies
    } catch (error) {
      console.error('Error fetching movies:', error); // Log errors if any
    }
  };

  useEffect(() => {
    getMovies();
  }, [select]);

  // Filter movies based on search term
  const filteredMovies = movieList.filter(movie => 
    (movie.title ? movie.title.toLowerCase().includes(searchTerm.toLowerCase()) : false) || 
    (movie.name ? movie.name.toLowerCase().includes(searchTerm.toLowerCase()) : false)
  );

  const navigate = useNavigate();

  // Handle movie click to navigate to details page
  const handleMovieClick = (movie) => {
    onMovieClick(movie);
    navigate(`/movies/${movie.id}`, { state: { movie } });
  };

  // Pagination logic
  const moviesPerPage = 5;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mb-6">
        <SearchBar onSearch={setSearchTerm} />
      </div>

      {/* Buttons for selecting movie / tv list */}
      <div className="flex flex-wrap justify-center sm:justify-start">
        <button onClick={() => setSelect('movie')} 
                className="font-semibold text-lg text-white py-2 px-4 mr-1
                bg-rose-500 hover:bg-rose-300 focus:ring focus:ring-blue-950">
          Movies
        </button>
        <button onClick={() => setSelect('tv')} 
                className="font-semibold text-lg text-white py-2 px-4 mr-1
                bg-rose-500 hover:bg-rose-300 focus:ring focus:ring-blue-950">
          TV Shows
        </button>
      </div>

      {/* Movie Table */}
      <div className="flex justify-center">
        <table className="movie-table min-w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Language</th>
              <th>Release Date</th>
              <th className='movie-poster'> </th>
              <th>Add Title</th>
            </tr>
          </thead>
          <tbody>
            {currentMovies.length > 0 ? (
              currentMovies.map((movie) => (
                <tr key={movie.id} className="cursor-pointer">
                  <td className='movie-title' onClick={() => handleMovieClick(movie)}>
                    {select === 'movie' ? movie.title : movie.name}
                  </td>
                  <td onClick={() => handleMovieClick(movie)}> {movie.original_language}</td>
                  <td onClick={() => handleMovieClick(movie)}> {select === 'movie' ? movie.release_date : movie.first_air_date}</td>
                  <td onClick={() => handleMovieClick(movie)}
                  className='movie-poster'>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{ width: "150px" }} alt={movie.title || movie.name} />
                  </td>
                  <td>
                    <AddWatchlist movie={movie} userId={userId} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No titles found matching your search term.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center space-x-2 xxs:space-x-1 md:space-x-2 lg:space-x-3 xl:space-x-4 mt-6">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`text-lg xxs:text-base md:text-lg lg:text-xl text-blue-950 bg-rose-200 rounded-lg font-semibold p-2 xxs:p-1 md:p-2 lg:p-3 px-4 xxs:px-2 md:px-3 lg:px-4 my-4 xxs:my-2 md:my-3 lg:my-4 ml-4 xxs:ml-2 md:ml-3 lg:ml-4 hover:underline ${
              currentPage === number ? "focus:ring focus:ring-blue-950" : ""
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default MovieList;