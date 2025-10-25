import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/services'
import { TMDBResponse, MoviesRequestParams, TMDBGenresResponse, SearchMoviesRequestParams } from '../types'
import { APP_CONFIG } from '@/constants/config';

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery,
    endpoints: (builder) => ({
        getUpcomingMovies: builder.query<TMDBResponse, MoviesRequestParams>({
            query: ({ page = 1 }) => ({
                url: '/movie/upcoming',
                params: {
                    api_key: APP_CONFIG.api_key,
                    page,
                },
            }),
        }),
        getMovieGenres: builder.query<TMDBGenresResponse, void>({
            query: () => ({
                url: '/genre/movie/list',
                params: {
                    api_key: APP_CONFIG.api_key,
                },
            }),
        }),
        searchMovies: builder.query<TMDBResponse, SearchMoviesRequestParams>({
            query: ({ query, page = 1 }) => ({
                url: '/search/movie',
                params: {
                    api_key: APP_CONFIG.api_key,
                    query,
                    page,
                },
            }),
        }),
        getMovieDetails: builder.query<any, { movieId: number }>({
            query: ({ movieId }) => ({
                url: `/movie/${movieId}`,
                params: {
                    api_key: APP_CONFIG.api_key,
                },
            }),
        }),
    }),
})

export const {
    useGetUpcomingMoviesQuery,
    useGetMovieGenresQuery,
    useSearchMoviesQuery,
    useGetMovieDetailsQuery
} = moviesApi
