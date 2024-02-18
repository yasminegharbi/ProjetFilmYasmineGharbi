import React, { useState, useEffect } from 'react';
import { movies$ } from './movies.js';
import MovieCard from './Components/MovieCard';
import './App.css'; 
import Header from './Components/Header';
import Footer from './Components/Footer';
import MultipleSelectCheckmarks from './Components/MultipleSelectCheckmarks';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const App = () => {


  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
 
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await movies$;
        setMovies(data);
        setCategories(getUniqueCategories(data));

        console.log('Fetched movies:', data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  const getUniqueCategories = (movies) => {
    const uniqueCategories = movies.reduce((acc, movie) => {
      if (Array.isArray(movie.category)) {
        movie.category.forEach(cat => {
          if (!acc.includes(cat)) {
            acc.push(cat);
          }
        });
      } else if (typeof movie.category === 'string' && !acc.includes(movie.category)) {
        acc.push(movie.category);
      }
      return acc;
    }, []);
    return uniqueCategories;
  };



  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
    setCurrentPage(1);
  };

  const filterMovies = () => {
    let filteredMovies = movies;

    if (selectedCategories.length > 0) {
      filteredMovies = filteredMovies.filter(movie => selectedCategories.includes(movie.category));
    }

    return filteredMovies.slice(startIndex, endIndex);
  };

  const handleDeleteMovie = (movieId) => {
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    setMovies(updatedMovies);
  };


  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };



  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(movies.length / itemsPerPage);



  return (

    <div>
      <Header />
      <MultipleSelectCheckmarks categories={categories} onCategoryChange={handleCategoryChange} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {filterMovies().map((movie) => (
          <MovieCard key={movie.id} movie={movie} onDeleteMovie={handleDeleteMovie}/>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', marginBottom: '400px'  }}>
        <Stack spacing={2} sx={{ color: 'white' }} >
          <Pagination count={totalPages} 
          page={currentPage} 
          onChange={handlePageChange} 
          color="primary" 
          sx={{
            '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: 'red' },
            '& .MuiPaginationItem-icon': { color: 'white' },  // Couleur des icônes de flèches
          }} />
        </Stack>
      </div>
      <Footer />
    </div>
  );
};

export default App;
