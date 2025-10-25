import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ScreenWrapper from '@/components/layout/ScreenWrapper'
import { SearchHeader, GenreCard, SearchResultItem } from '../components'
import { LoadingIndicator, AppText, SvgElements } from '@/components/common'
import { useGetMovieGenresQuery, useSearchMoviesQuery } from '../services/moviesApi'
import { mapGenresWithImages } from '../utils/genreMapping'
import { useDebounce } from '../hooks/useDebounce'
import { colors, hp, spacing, wp } from '@/styles'
import { Variant } from '@/types'
import commonStyles from '@/styles/commonStyles'
import { LeftArrowIcon } from '@/assets/svg'
import { StackMovieParamList } from '@/types'
import { SCREENS } from '@/constants/screens'

const MovieGener: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<StackMovieParamList>>()
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchSubmitted, setIsSearchSubmitted] = useState(false)
    const [searchPage, setSearchPage] = useState(1)
    const [allSearchResults, setAllSearchResults] = useState<any[]>([])
    const [submittedQuery, setSubmittedQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const { data: genresData, isLoading: genresLoading } = useGetMovieGenresQuery()

    const activeQuery = isSearchSubmitted ? submittedQuery : debouncedSearchQuery

    const { data: searchData, isLoading: searchLoading } = useSearchMoviesQuery(
        { query: activeQuery, page: searchPage },
        { skip: !activeQuery || activeQuery.length < 2 }
    )

    const handleSearchSubmit = (query: string) => {
        setSearchQuery(query)
        setSubmittedQuery(query)
        setIsSearchSubmitted(true)
        setSearchPage(1)
    }

    const handleClearSearch = () => {
        setSearchQuery('')
        setSubmittedQuery('')
        setIsSearchSubmitted(false)
        setSearchPage(1)
        setAllSearchResults([])
    }

    useEffect(() => {
        if (searchData?.results) {
            if (searchPage === 1) {
                setAllSearchResults(searchData.results)
            } else {
                setAllSearchResults(prev => {
                    const existingIds = new Set(prev.map(movie => movie.id))
                    const newMovies = searchData.results.filter(movie => !existingIds.has(movie.id))
                    return [...prev, ...newMovies]
                })
            }
        }
    }, [searchData, searchPage])


    const handleLoadMoreSearch = () => {
        if (!searchLoading && searchData?.results && searchData.results.length > 0) {
            setSearchPage(prev => prev + 1)
        }
    }

    const renderGenreItem = ({ item }: { item: any }) => (
        <GenreCard
            genre={item}
            onPress={(genre) => {
                navigation.navigate(SCREENS.WATCH, { genreId: genre.id, genreName: genre.name })
            }}
        />
    )

    const renderSearchItem = ({ item }: { item: any }) => (
        <SearchResultItem
            movie={item}
            onPress={(movie) => {
                navigation.navigate(SCREENS.MOVIE_DETAIL, { movie })
            }}
        />
    )

    const genresWithImages = genresData ? mapGenresWithImages(genresData?.genres) : []

    const renderSearchResultsHeader = () => (
        <View style={styles.searchResultsHeader}>
            <TouchableOpacity onPress={handleClearSearch} style={styles.backButton}>
                <SvgElements name={LeftArrowIcon} width={24} height={24} color={colors.text} />
            </TouchableOpacity>
            <AppText variant={Variant.subTitle} color={colors.text}>
                {searchLoading && searchPage === 1 ? 'Searching...' :
                    allSearchResults.length > 0 ? `${searchData?.total_results || allSearchResults.length} Results Found` :
                        'No Results Found'}
            </AppText>
        </View>
    )

    return (
        <ScreenWrapper backgroundColor={colors.white}>

            {isSearchSubmitted ? renderSearchResultsHeader() :
                <SearchHeader onSearch={setSearchQuery}
                    onSubmitEditing={handleSearchSubmit} />}

            {(isSearchSubmitted || (searchQuery && searchQuery.length >= 2)) ? (
                <View style={styles.searchContainer}>
                    {!isSearchSubmitted && (
                        <View style={styles.searchHeader}>
                            <AppText variant={Variant.captionMedium}>Top Results</AppText>
                        </View>
                    )}
                    {searchLoading && searchPage === 1 ? (
                        <LoadingIndicator />
                    ) : allSearchResults.length === 0 && !searchLoading && activeQuery ? (
                        <View style={styles.noResultsContainer}>
                            <AppText variant={Variant.body} color={colors.darkGray}>
                                No results found for "{activeQuery}"
                            </AppText>
                        </View>
                    ) : allSearchResults.length > 0 ? (
                            <FlatList
                                data={allSearchResults}
                                renderItem={renderSearchItem}
                                keyExtractor={(item, index) => `${item?.id}-${index}`}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.listContainer}
                                onEndReached={handleLoadMoreSearch}
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={() => (
                                    searchLoading && searchPage > 1 ? <LoadingIndicator /> : null
                                )}
                            />
                    ) : null}
                </View>
            ) : (
                <>
                    {genresLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <View style={styles.container}>
                            <FlatList
                                data={genresWithImages}
                                renderItem={renderGenreItem}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.listContainer}
                                columnWrapperStyle={styles.row}
                            />
                        </View>

                    )}
                </>
            )}

        </ScreenWrapper >
    )
}

export default MovieGener

const styles = StyleSheet.create({
    container: {
        paddingBottom: wp(15)
    },
    listContainer: {
        paddingBottom: spacing.xl,
        backgroundColor: colors.background,
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
    searchResultsHeader: {
        ...commonStyles.flexRow,
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        gap: spacing.sm,
    },
})