'use client';

import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Movie } from '@/types/movie';
import ReactLoading from 'react-loading'


export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async() => {
        await axios({
            method:'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key:'4fc12e9f26376d773ec9dbfd078123f5',
                language: 'pt-BR'
            }

        }).then (response =>{
            setMovies(response.data.results);
        });

        setIsLoading(false);
    }

    if (isLoading) {
        return(
            <div className='loading-container'>
                 (<ReactLoading type="spin" color='#6046ff' height={'5%'} width={'5%'} />);
                    
            </div>
        ) 
           

    }
    
    return (
        <ul className='movie-list'>
        {movies.map((movie) =>
           <MovieCard  
           key={movie.id}
            movie={movie}
        
           />
        )}
        </ul>
    )
}