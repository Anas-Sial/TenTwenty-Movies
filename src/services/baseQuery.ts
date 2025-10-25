import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APP_CONFIG } from '@/constants/config';

export const baseQuery = fetchBaseQuery({
    baseUrl: APP_CONFIG.API_BASE_URL,
    prepareHeaders: (headers) => {
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        return headers;
    },
})

export const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: APP_CONFIG.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        return headers;
    },
})
