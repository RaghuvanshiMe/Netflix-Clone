import React from 'react';
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'

const MainContainer = () => {
  const movie = useSelector(store => store.movie?.nowPlayingMovies);
  if(!movie || movie.length < 5) return null;
  console.log(movie);
  const {overview, id, title} = movie[4];
  console.log(overview, id, title);

  return (
    <div>
        <VideoTitle title = {title} overview={overview}/>
        <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer
