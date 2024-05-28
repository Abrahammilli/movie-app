import React from 'react';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;

    return (
        <div className='image-grid'>
            {props.movies.map((movie, index) => (
                <div key={index} className='image-container'>
                    <img src={movie.Poster} alt='movie' />
                    <div onClick={() => props.handleFavouritesClick(movie)} className='overlay'>
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
