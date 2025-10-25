export type StackParamList = {
    TabNavigator: undefined;
    MovieDetail: { movie: any };
    VideoPlayer: { videoUrl: string; movieTitle: string };
    ShowtimeSelection: { movie: any };
    SeatSelection: { movie: any; showtime: string; hall: string };
}

export type StackMovieParamList = {
    Watch: { genreId?: number; genreName?: string };
    MovieGener: undefined;
    MovieDetail: { movie: any };
}

export type TabParamList = {
    Dashboard: undefined;
    Watch: undefined;
    MediaLibrary: undefined;
    More: undefined;
}

export type NavigationParamList = StackParamList & TabParamList

export type TabName = keyof TabParamList
