import React from 'react'
import { BANNER_URL } from '../utils/constant';
import { useDispatch } from "react-redux";
import { getId, setOpen } from '../redux/movieSlice';

const MovieCard = ({posterpath, movieId}) => {
  const dispatch = useDispatch();

  if (posterpath === null) return null;

  const handleOpen = () => {
    dispatch(getId(movieId));
    dispatch(setOpen(true));
  }
  return (
    <div className='w-48 pr-2' onClick={handleOpen}>
      <img src={`${BANNER_URL}/${posterpath}`} alt="movie-banner" />
    </div>
  )
}

export default MovieCard