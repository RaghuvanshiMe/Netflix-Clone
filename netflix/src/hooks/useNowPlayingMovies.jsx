import { useEffect } from "react";
import axios from "axios";
import { NOW_PLAYING_API, options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getNowPlayingMovies } from "../redux/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(NOW_PLAYING_API, options);
        dispatch(getNowPlayingMovies(response.data.results));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [dispatch]);
};

export default useNowPlayingMovies;
