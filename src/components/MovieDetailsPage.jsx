import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function MovieDetailsPage() {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) {
    return <p>No movie selected.</p>;
  }

  return (
    <div className="flex flex-col flex-wrap bg-blue-950 bg-opacity-90 justify-center rounded-lg shadow-lg">
      <h2 className="text-2xl text-white text-center font-bold mt-4">{movie.name ? movie.name : movie.title}</h2>
      <div className="flex flex-col md:flex-row justify-center max-w-3xl m-4 bg-white rounded-lg shadow-lg overflow-hidden">
        <img className="w-64 md:w-1/2 object-cover mx-auto" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        <div className="flex flex-col p-4">
          <p className="text-xl text-blue-950 mb-2"><strong>Language:</strong> {movie.original_language}</p>
          <p className="text-xl text-blue-950 mb-2"><strong>{movie.first_air_date ? 'First Air Date: ' : 'Release Date: '}</strong>
            {movie.first_air_date ? movie.first_air_date : movie.release_date}
          </p>
          <p className="text-xl text-blue-950 mb-4"><strong>Original Title:</strong> {movie.original_title ? movie.original_title : movie.original_name}</p>
          <p className="text-xl text-blue-950 mb-2"><strong>Overview:</strong></p>
          <p className="text-lg text-blue-950">{movie.overview ? movie.overview : 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
}

MovieDetailsPage.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string,
    first_air_date: PropTypes.string,
    title: PropTypes.string,
    original_language: PropTypes.string,
    release_date: PropTypes.string,
    original_title: PropTypes.string,
    poster_path: PropTypes.string,
    overview: PropTypes.string,
  }),
};

export default MovieDetailsPage;