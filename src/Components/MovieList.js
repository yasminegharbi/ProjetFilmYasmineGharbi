// MovieList.js
import React from 'react';
import MovieCard from './MovieCard.js';

const MovieList = ({ movies , onDelete, selectedCategories}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '20px' }}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onDelete={onDelete} selectedCategories={selectedCategories}/>
      ))}
    </div>
  );
};

export default MovieList;
