import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const MovieContainer = () => {
  const movie = useSelector(store => store.movie);
  console.log(movie);
  return (
    <div className="bg-black">
      <div className="relative z-10 ">
        <MovieList title={"Popular Movies"} movies={movie.popularMovies} />
        <MovieList title={"Now Playing Movies"} movies={movie.nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movie.topRatedMovies} />
        <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies} />
      </div>
    </div>
  );
};

export default MovieContainer;
