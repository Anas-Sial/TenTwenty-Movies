import React, { useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ScreenWrapper from '@/components/layout/ScreenWrapper'
import { WatchHeader, MovieItem } from '../components'
import { LoadingIndicator } from '@/components/common'
import { useGetUpcomingMoviesQuery } from '../services/moviesApi'
import { hp } from '@/styles'
import { TMDBMovie } from '../types'
import { StackMovieParamList } from '@/types'
import { SCREENS } from '@/constants/screens'

type WatchMovieNavigationProp = StackNavigationProp<StackMovieParamList>

const WatchMovie: React.FC = () => {
    const navigation = useNavigation<WatchMovieNavigationProp>()
    const [page, setPage] = useState(1)

    const { data, isLoading } = useGetUpcomingMoviesQuery({ page })

    const renderMovieItem = ({ item }: { item: TMDBMovie }) => (
        <MovieItem
            movie={item}
            onPress={(movie) => {
                navigation.navigate(SCREENS.MOVIE_DETAIL, { movie })
            }}
        />
    )

    return (
        <ScreenWrapper>

            <WatchHeader />

            {isLoading ? <LoadingIndicator /> : (
                <FlatList
                    data={data?.results || []}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            )}

        </ScreenWrapper>
    )
}

export default WatchMovie

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: hp(1.8),
    },
})