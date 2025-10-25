import React, { useState } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import ScreenWrapper from '@/components/layout/ScreenWrapper'
import { SearchHeader, GenreCard, SearchResultItem } from '../components'
import { LoadingIndicator, AppText } from '@/components/common'
import { useGetMovieGenresQuery, useSearchMoviesQuery } from '../services/moviesApi'
import { mapGenresWithImages } from '../utils/genreMapping'
import { useDebounce } from '../hooks/useDebounce'
import { colors, hp, spacing } from '@/styles'
import { Variant } from '@/types'
import commonStyles from '@/styles/commonStyles'

const MovieGener: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const { data: genresData, isLoading: genresLoading } = useGetMovieGenresQuery()
    const { data: searchData, isLoading: searchLoading } = useSearchMoviesQuery(
        { query: debouncedSearchQuery },
        { skip: !debouncedSearchQuery || debouncedSearchQuery.length < 2 }
    )

    const renderGenreItem = ({ item }: { item: any }) => (
        <GenreCard
            genre={item}
            onPress={(genre) => {
                console.log('Selected genre:', genre.name)
            }}
        />
    )

    const renderSearchItem = ({ item }: { item: any }) => (
        <SearchResultItem
            movie={item}
            onPress={(movie) => {
                console.log('Selected movie:', movie.title)
            }}
        />
    )

    const genresWithImages = genresData ? mapGenresWithImages(genresData?.genres) : []

    return (
        <ScreenWrapper>
            <SearchHeader onSearch={setSearchQuery} />

            {searchQuery && searchQuery.length >= 2 ? (
                <View style={styles.searchContainer}>
                    <View style={styles.searchHeader}>

                        <AppText variant={Variant.captionMedium}>Top Results</AppText>
                        {/* <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.backButton}>
                            <SvgElements name={LeftArrowIcon} width={24} height={24} color={colors.text} />
                        </TouchableOpacity>
                        <AppText variant={Variant.subTitle} color={colors.text}>
                            {searchData?.total_results || 0} Results Found
                        </AppText> */}
                    </View>
                    {searchLoading ? (
                        <LoadingIndicator />
                    ) : searchData?.results?.length === 0 ? (
                        <View style={styles.noResultsContainer}>
                            <AppText variant={Variant.body} color={colors.darkGray}>
                                No results found for "{searchQuery}"
                            </AppText>
                        </View>
                    ) : (
                        <FlatList
                            data={searchData?.results || []}
                            renderItem={renderSearchItem}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContainer}
                        />
                    )}
                </View>
            ) : (
                <>
                    {genresLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <FlatList
                            data={genresWithImages}
                            renderItem={renderGenreItem}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContainer}
                            columnWrapperStyle={styles.row}
                        />
                    )}
                </>
            )}
        </ScreenWrapper>
    )
}

export default MovieGener

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: spacing.xl,
    },
    row: {
        justifyContent: 'space-between',
    },
    searchContainer: {
        flex: 1,
    },
    searchHeader: {
        ...commonStyles.flexRow,
        marginHorizontal: spacing.md,
        paddingBottom: spacing.sm,
        marginTop: hp(3),
        marginBottom: hp(1.8),
        gap: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    backButton: {
        padding: spacing.xs,
    },
    noResultsContainer: {
        ...commonStyles.centerContent,
        paddingVertical: spacing.xl,
    },
})