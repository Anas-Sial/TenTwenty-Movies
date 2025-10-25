import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/services'
import { TMDBResponse, MoviesRequestParams, TMDBGenresResponse, SearchMoviesRequestParams } from '../types'
import { APP_CONFIG } from '@/constants/config';

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery,
    endpoints: (builder) => ({
        getUpcomingMovies: builder.query<TMDBResponse, MoviesRequestParams>({
            query: ({ page = 1, limit = APP_CONFIG.ITEMS_PER_PAGE }) => ({
                url: '/movie/upcoming',
                params: {
                    api_key: APP_CONFIG.api_key,
                    page,
                    limit,
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
        getMoviesByGenre: builder.query<TMDBResponse, { genreId: number; page?: number }>({
            query: ({ genreId, page = 1 }) => ({
                url: '/discover/movie',
                params: {
                    api_key: APP_CONFIG.api_key,
                    with_genres: genreId,
                    page,
                },
            }),
        }),
    }),
})

export const {
    useGetUpcomingMoviesQuery,
    useGetMovieGenresQuery,
    useSearchMoviesQuery,
    useGetMovieDetailsQuery,
    useGetMoviesByGenreQuery
} = moviesApi
