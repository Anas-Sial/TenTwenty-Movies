export type StackParamList = {
    TabNavigator: undefined;
    MovieDetail: { movie: any };
    VideoPlayer: { videoUrl: string; movieTitle: string };
    SeatSelection: { movie: any; showtime: string; hall: string };
}

export type StackMovieParamList = {
    Watch: undefined;
    MovieGener: undefined;
}

export type TabParamList = {
    Dashboard: undefined;
    Watch: undefined;
    MediaLibrary: undefined;
    More: undefined;
}

export type NavigationParamList = StackParamList & TabParamList

export type TabName = keyof TabParamList
