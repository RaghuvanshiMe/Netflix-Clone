import React, { use, useEffect } from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from "./MainContainer";
import MovieContainer from "./MovieContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import getPopularMovies from "../redux/movieSlice";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import getTopRatedMovies from "../redux/movieSlice";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import getUpcomingMovies from "../redux/movieSlice";
import SearchMovie from "./SearchMovie";
import MovieDialog from "./MovieDialog";

const Browse = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //custom hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <React.Fragment>
      <div>
        <Header />
        <div>
          {toggle ? (
            <SearchMovie />
          ) : (
            <>
              <MainContainer />
              <MovieContainer />
            </>
          )}
        </div>
      </div>
      <MovieDialog />
    </React.Fragment>
  );
};

export default Browse;
