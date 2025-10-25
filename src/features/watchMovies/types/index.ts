// Api Types
export interface TMDBMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TMDBResponse {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: TMDBMovie[];
    total_pages: number;
    total_results: number;
}

export interface MoviesRequestParams {
    page?: number;
    limit?: number;
}

export interface SearchMoviesRequestParams {
    query: string;
    page?: number;
}

export interface TMDBGenre {
    id: number;
    name: string;
}

export interface TMDBGenresResponse {
    genres: TMDBGenre[];
}

// Component Types
export interface MovieItemProps {
    movie: TMDBMovie
    onPress?: (movie: TMDBMovie) => void
}

export interface GenreItemProps {
    genre: Genre
    onPress?: (genre: Genre) => void
}

// Genre Types
export interface Genre {
    id: string
    name: string
    imageUrl: string
}

export interface GenreWithImage extends TMDBGenre {
    imageUrl: string;
}

export interface GenreCardProps {
    genre: GenreWithImage
    onPress?: (genre: GenreWithImage) => void
}

export interface SearchHeaderProps {
    onSearch?: (query: string) => void
    onSubmitEditing?: (query: string) => void
}

export interface SearchResultItemProps {
    movie: TMDBMovie
    onPress?: (movie: TMDBMovie) => void
}

export interface MovieDetailBannerProps {
    movie: TMDBMovie
    onGetTickets?: () => void
    onWatchTrailer?: () => void
}

export interface GenreTagsProps {
    genres: string[]
}

export interface MovieOverviewProps {
    overview: string
}

export interface SeatProps {
    id: string
    row: number
    number: number
    type: 'regular' | 'vip' | 'unavailable'
    price: number
    isSelected: boolean
}

export interface SeatSelectionHeaderProps {
    movieTitle: string
    showtime: string
    hall: string
}

export interface SeatSelectionFooterProps {
    selectedSeats: SeatProps[]
    onRemoveSeat: (seatId: string) => void
    onProceedToPay: () => void
}

export interface Showtime {
    id: string
    time: string
    hall: string
    price: number
    bonus: number
    availableSeats: number
    totalSeats: number
}
