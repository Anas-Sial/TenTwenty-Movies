import React from 'react'
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import { AppText, SvgElements } from '@/components/common'
import { colors, spacing, wp } from '@/styles'
import { SearchResultItemProps } from '../types'
import { APP_CONFIG } from '@/constants/config'
import { Variant } from '@/types'
import { ThreeDotIcon } from '@/assets/svg'
import commonStyles from '@/styles/commonStyles'

const SearchResultItem: React.FC<SearchResultItemProps> = ({ movie, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress?.(movie)}
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: `${APP_CONFIG?.Image_Url}${movie?.poster_path}` }}
                style={styles.poster}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <AppText variant={Variant.bodySemiBold} color={colors.text} style={styles.title}>
                    {movie?.title}
                </AppText>
                <AppText variant={Variant.caption} color={colors.darkGray}>
                    {movie?.genre_ids.length > 0 ? `Genre ${movie?.genre_ids[0]}` : 'Movie'}
                </AppText>
            </View>
            <SvgElements name={ThreeDotIcon} color={colors.darkGray} />
        </TouchableOpacity>
    )
}

export default SearchResultItem

const styles = StyleSheet.create({
    container: {
       ...commonStyles.flexRow,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    poster: {
        width: wp(36),
        height: wp(23),
        borderRadius: 8,
    },
    content: {
        flex: 1,
        marginLeft: spacing.md,
    },
    title: {
        marginBottom: spacing.xs,
    }
})