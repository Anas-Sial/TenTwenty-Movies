import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ScreenWrapper from '@/components/layout/ScreenWrapper'
import { 
    MovieDetailHeader, 
    MovieDetailBanner, 
    GenreTags, 
    MovieOverview 
} from '../components'
import { LoadingIndicator } from '@/components/common'
import { useGetMovieDetailsQuery } from '../services/moviesApi'
import { colors } from '@/styles'
import { StackParamList } from '@/types'
import { SCREENS } from '@/constants/screens'

type MovieDetailRouteProp = RouteProp<StackParamList, 'MovieDetail'>
type MovieDetailNavigationProp = StackNavigationProp<StackParamList>

interface MovieDetailProps {
    route: MovieDetailRouteProp
}

const MovieDetail: React.FC<MovieDetailProps> = ({ route }) => {
    const navigation = useNavigation<MovieDetailNavigationProp>()
    const { movie } = route.params
    
    const { data: movieDetails, isLoading, error } = useGetMovieDetailsQuery({ 
        movieId: movie.id 
    })

    const handleGetTickets = () => {
        // Mock showtime and hall data
        const showtime = 'March 5, 2021 | 12:30'
        const hall = 'Hall 1'
        
        navigation.navigate(SCREENS.SEAT_SELECTION, {
            movie: detailedMovie,
            showtime,
            hall
        })
    }

    const handleWatchTrailer = () => {
        console.log('celled')
        const trailerUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        navigation.navigate(SCREENS.VIDEO_PLAYER, { 
            videoUrl: trailerUrl, 
            movieTitle: detailedMovie.title 
        })
    }

    if (isLoading) {
        return (
            <ScreenWrapper withoutStatusBar={true}>
                <MovieDetailHeader />
                <LoadingIndicator />
            </ScreenWrapper>
        )
    }

    const detailedMovie = movieDetails || movie
    const genres = movieDetails?.genres?.map((genre: any) => genre.name) || ['Action', 'Thriller', 'Science', 'Fiction']

    return (
        <ScreenWrapper withoutStatusBar={true}>
            <MovieDetailHeader />
            <MovieDetailBanner 
                movie={detailedMovie}
                onGetTickets={handleGetTickets}
                onWatchTrailer={handleWatchTrailer}
            />
            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <GenreTags genres={genres} />
                <MovieOverview overview={detailedMovie.overview} />
            </ScrollView>
        </ScreenWrapper>
    )
}

export default MovieDetail

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: colors.white,
    },
})