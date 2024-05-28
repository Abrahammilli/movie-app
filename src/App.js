import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavourites from './Components/AddFavourites';
import RemoveFavourites from './Components/RemoveFavourites';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=84cd3373`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            // Fetch additional information for each movie to get streaming links
            const moviesWithLinks = await Promise.all(
                responseJson.Search.map(async (movie) => {
                    const movieDetailResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=84cd3373`);
                    const movieDetail = await movieDetailResponse.json();
                    return { ...movie, streamingLink: movieDetail.Website }; // Assuming the Website field contains the streaming link
                })
            );
            setMovies(moviesWithLinks);
        }
    };

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
    };

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
    };

    return (
        <div className='grid grid-cols-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Movies' />
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className='row'>
                <MovieList 
                    movies={movies}
                    handleFavouritesClick={addFavouriteMovie}
                    favouriteComponent={AddFavourites}
                />
            </div>
            <div className='row align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Favourites' />
            </div>
            <div className='row'>
                <MovieList
                    movies={favourites}
                    handleFavouritesClick={removeFavouriteMovie}
                    favouriteComponent={RemoveFavourites}
                />
            </div>
        </div>
    );
};

export default App;
