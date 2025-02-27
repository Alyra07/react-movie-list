import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";
import MovieDetailsPage from "./components/MovieDetailsPage";
import LoginPage from "./components/Login";
import RegistrationPage from "./components/Register";
import Profile from "./components/Profile";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <img
        src={"/img/profile.jpg"}
        alt="Profile Icon"
        className="absolute top-1 right-24 cursor-pointer w-20 mt-4 mr-4 ml-4 
            xxs:w-16 xxs:right-10 xxs:mt-2 xxs:mr-9 xxs:ml-2 
            sm:w-16 sm:right-12 sm:mt-2 sm:mr-5 sm:ml-2 
            md:w-20 md:right-24 md:mt-4 md:mr-4 md:ml-4"
        onClick={() => navigate("/profile")}
      />
      <img
        src={"/img/favorites.png"}
        alt="Watchlist Icon"
        className="absolute top-0 right-0 cursor-pointer w-24 mt-4 mr-4 
            xxs:w-20 xxs:mt-2 xxs:mr-2 
            sm:w-20 sm:mt-2 sm:mr-2 
            md:w-24 md:mt-4 md:mr-4"
        onClick={() => navigate("/watchlist")}
      />

      <div className="flex flex-col items-center mt-12">
        <h1 className="text-4xl font-bold sm:text-4xl mt-4">
          FopList
        </h1>
        <p className="text-xl text-blue-950 font-normal my-4 sm:text-lg">
          YOUR FAVORITE MOVIES & MORE
        </p>

        <nav>
          <ul className="flex flex-wrap justify-center space-x-4">
            <li className="text-lg text-blue-950 bg-rose-300 rounded-lg font-semibold p-2 px-4 my-2 hover:bg-rose-400 hover:underline">
              <Link to="/">Home</Link>
            </li>
            <li className="text-lg text-blue-950 bg-rose-200 rounded-lg font-semibold p-2 px-4 my-2 hover:bg-rose-300 hover:underline">
              <Link to="/register">Register</Link>
            </li>
            <li className="text-lg text-blue-950 bg-rose-200 rounded-lg font-semibold p-2 px-4 my-2 hover:bg-rose-300 hover:underline">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-grow">
        <Routes>
          <Route path="/profile" element={<Profile userId={userId} />} />
          <Route
            path="/watchlist"
            element={
              <Watchlist onMovieClick={handleMovieClick} userId={userId} />
            }
          />
          <Route
            path="/"
            element={
              <MovieList onMovieClick={handleMovieClick} userId={userId} />
            }
          />
          <Route
            path="/movies/:id"
            element={<MovieDetailsPage movie={selectedMovie} />}
          />
          <Route path="/login" element={<LoginPage setUserId={setUserId} />} />
          <Route
            path="/register"
            element={<RegistrationPage setUserId={setUserId} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;