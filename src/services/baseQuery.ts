import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APP_CONFIG } from '@/constants/config';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
        // Add common headers if needed
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

export const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers, { getState }) => {
        // Add API key to all requests
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});
