import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ScreenWrapper from '@/components/layout/ScreenWrapper'
import { WatchHeader, MovieItem } from '../components'
import { LoadingIndicator } from '@/components/common'
import { useGetUpcomingMoviesQuery, useGetMoviesByGenreQuery } from '../services/moviesApi'
import { colors, hp, wp } from '@/styles'
import { TMDBMovie } from '../types'
import { StackMovieParamList } from '@/types'
import { SCREENS } from '@/constants/screens'

type WatchMovieNavigationProp = StackNavigationProp<StackMovieParamList>
type WatchMovieRouteProp = RouteProp<StackMovieParamList, 'Watch'>

const WatchMovie: React.FC = () => {
    const navigation = useNavigation<WatchMovieNavigationProp>()
    const route = useRoute<WatchMovieRouteProp>()
    const [page, setPage] = useState(1)
    const [allMovies, setAllMovies] = useState<TMDBMovie[]>([])

    const { genreId, genreName } = route.params || {}

    const { data: upcomingData, isLoading: upcomingLoading } = useGetUpcomingMoviesQuery(
        { page },
        { skip: !!genreId }
    )

    const { data: genreData, isLoading: genreLoading } = useGetMoviesByGenreQuery(
        { genreId: genreId!, page },
        { skip: !genreId }
    )

    const data = genreId ? genreData : upcomingData
    const isLoading = genreId ? genreLoading : upcomingLoading

    useEffect(() => {
        if (data?.results) {
            if (page === 1) {
                setAllMovies(data.results)
            } else {
                setAllMovies(prev => {
                    const existingIds = new Set(prev.map(movie => movie.id))
                    const newMovies = data.results.filter(movie => !existingIds.has(movie.id))
                    return [...prev, ...newMovies]
                })
            }
        }
    }, [data, page])

    const handleLoadMore = () => {
        if (!isLoading && data?.results && data.results.length > 0) {
            setPage(prev => prev + 1)
        }
    }

    const renderMovieItem = ({ item }: { item: TMDBMovie }) => (
        <MovieItem
            movie={item}
            onPress={(movie) => {
                navigation.navigate(SCREENS.MOVIE_DETAIL, { movie })
            }}
        />
    )

    return (
        <ScreenWrapper backgroundColor={colors.white}>

            <WatchHeader
                title={genreName ? genreName : "Watch"} />

            {isLoading && page === 1 ? <LoadingIndicator /> : (
                <View style={styles.container}>
                    <FlatList
                        data={allMovies}
                        renderItem={renderMovieItem}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() => (
                            isLoading && page > 1 ? <LoadingIndicator /> : null
                        )}
                    />
                </View>
            )}

        </ScreenWrapper>
    )
}

export default WatchMovie

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: hp(1.8),
        backgroundColor: colors.background,
    },
    container: {
        paddingBottom: wp(7)
    }
})