import { useEffect } from "react";
import axios from "axios";
import { UPCOMING_API, options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getUpcomingMovies } from "../redux/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(UPCOMING_API, options);
        dispatch(getUpcomingMovies(response.data.results));
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
    fetchMovies();
  }, [dispatch]);
};

export default useUpcomingMovies;
