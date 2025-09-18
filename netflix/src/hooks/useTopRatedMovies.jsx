import { useEffect } from "react";
import axios from "axios";
import { TOP_RATED_API, options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getTopRatedMovies } from "../redux/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(TOP_RATED_API, options);
        dispatch(getTopRatedMovies(response.data.results));
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };
    fetchMovies();
  }, [dispatch]);
};

export default useTopRatedMovies;
