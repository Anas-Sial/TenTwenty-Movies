import React from 'react'
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import { AppText } from '@/components/common'
import { colors, hp, spacing } from '@/styles'
import { Variant } from '@/types'
import { GenreCardProps } from '../types'


const GenreCard: React.FC<GenreCardProps> = ({ genre, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress?.(genre)}
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: genre.imageUrl }}
                style={styles.image}
                resizeMode="cover"
            />
            <View
                style={styles.overlay}
            >
                <AppText variant={Variant.bodyBold} color={colors.white}>
                    {genre.name}
                </AppText>
            </View>
            <View style={{ ...StyleSheet.absoluteFill, backgroundColor: colors.black_3 }} />
        </TouchableOpacity>
    )
}

export default GenreCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: spacing.sm,
        marginVertical: spacing.sm,
        borderRadius: 12,
        overflow: 'hidden',
        height: hp(15),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.sm,
        justifyContent: 'flex-end',
        zIndex: 1,
    },
})
