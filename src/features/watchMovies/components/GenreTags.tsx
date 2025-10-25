import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from '@/components/common'
import { colors, hp, spacing } from '@/styles'
import { Variant } from '@/types'
import { GenreTagsProps } from '../types'

const GenreTags: React.FC<GenreTagsProps> = ({ genres }) => {
    const genreColors = [
        colors.aquaGreen,
        colors.pink,
        colors.purple,
        colors.yellow,
    ]

    return (
        <View style={styles.container}>
            <AppText variant={Variant.largeSemiBold} style={styles.title}>
                Genres
            </AppText>
            <View style={styles.tagsContainer}>
                {genres.map((genre, index) => (
                    <View
                        key={index}
                        style={[
                            styles.tag,
                            { backgroundColor: genreColors[index % genreColors.length] }
                        ]}
                    >
                        <AppText variant={Variant.captionBold} color={colors.white}>
                            {genre}
                        </AppText>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default GenreTags

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg,
    },
    title: {
        marginBottom: spacing.md,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    tag: {
        paddingHorizontal: spacing.md,
        paddingVertical: hp(.5),
        borderRadius: hp(2),
    },
})