import { useEffect } from "react";
import axios from "axios";
import { POPULAR_API, options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getPopularMovies } from "../redux/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(POPULAR_API, options);
        dispatch(getPopularMovies(response.data.results));
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchMovies();
  }, [dispatch]);
};

export default usePopularMovies;
