import React from "react";
import MovieCard from "./MovieCard";

const MovieContainer = ({title, movies}) => {
    console.log(movies);
  return (
    <div className="px-8">
        <h1 className="text-3xl py-3 text-white font-bold ">{title}</h1>
        <div className="flex overflow-x-auto no-scrollbar cursor-pointer">
            <div className="flex items-center">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} posterpath={movie.poster_path} movieId={movie.id} />
                ))}
            </div>
        </div>
    </div>
  );
}       
export default MovieContainer;