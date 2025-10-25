export interface Genre {
    id: string;
    name: string;
    imageUrl: string;
}

export const movieGenres: Genre[] = [
    {
        id: '1',
        name: 'Comedies',
        imageUrl: 'https://image.tmdb.org/t/p/w500/8kOWDBK6XlOKz8G0cWpM8k9R0kM.jpg',
    },
    {
        id: '2',
        name: 'Crime',
        imageUrl: 'https://image.tmdb.org/t/p/w500/6PX0r5TRRU5y0jZ70y1tZWJ5dBU.jpg',
    },
    {
        id: '3',
        name: 'Family',
        imageUrl: 'https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg',
    },
    {
        id: '4',
        name: 'Documentaries',
        imageUrl: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAFnpi.jpg',
    },
    {
        id: '5',
        name: 'Dramas',
        imageUrl: 'https://image.tmdb.org/t/p/w500/4q2hz2m8UXgG4jwuWigD2X0F6Rz.jpg',
    },
    {
        id: '6',
        name: 'Fantasy',
        imageUrl: 'https://image.tmdb.org/t/p/w500/8Qsr8pvDL3s1jNZQ4HK1d1XlvFq.jpg',
    },
    {
        id: '7',
        name: 'Holidays',
        imageUrl: 'https://image.tmdb.org/t/p/w500/6VX3TrYBtnHOHzTZy41sX71s4VH.jpg',
    },
    {
        id: '8',
        name: 'Horror',
        imageUrl: 'https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg',
    },
    {
        id: '9',
        name: 'Sci-Fi',
        imageUrl: 'https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxpDf3Vq3HUVahOb.jpg',
    },
    {
        id: '10',
        name: 'Thriller',
        imageUrl: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
    },
];
