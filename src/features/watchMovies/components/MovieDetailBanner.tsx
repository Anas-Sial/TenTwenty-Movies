import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { AppText, SvgElements } from '@/components/common'
import { colors, fonts, hp, spacing } from '@/styles'
import { MovieDetailBannerProps } from '../types'
import { APP_CONFIG } from '@/constants/config'
import { Variant } from '@/types'
import AppButton from '@/components/common/AppButton'
import { PlayIcon } from '@/assets/svg'
import commonStyles from '@/styles/commonStyles'

const MovieDetailBanner: React.FC<MovieDetailBannerProps> = ({
    movie,
    onGetTickets,
    onWatchTrailer
}) => {
    const formatReleaseDate = (dateString: string) => {
        const date = new Date(dateString)
        return `In Theaters ${date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })}`
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `${APP_CONFIG.Image_Url}${movie.backdrop_path}` }}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <LinearGradient
                colors={[colors.black_0, colors.black]}
                end={{ x: 0.5, y: 1 }}
                start={{ x: 0.5, y: 0 }}
                style={styles.overlay}
            >
                <View style={styles.content}>
                    <AppText variant={Variant.subTitle} style={styles.title}>
                        {movie.title}
                    </AppText>

                    <AppText variant={Variant.body} color={colors.white} style={styles.releaseDate}>
                        {formatReleaseDate(movie.release_date)}
                    </AppText>

                    <View style={styles.buttonContainer}>
                        <AppButton
                            title='Get Tickets'
                            onPress={onGetTickets} />

                        <AppButton
                            title=' Watch Trailer'
                            onPress={onWatchTrailer}
                            addLeft={<SvgElements name={PlayIcon} />}
                            variant={'secondary'} />
                    </View>

                </View>
            </LinearGradient>
        </View >
    )
}

export default MovieDetailBanner

const styles = StyleSheet.create({
    container: {
        height: hp(45),
        position: 'relative',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.lg,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: spacing.sm,
        color: colors.white,
        fontFamily: fonts.medium
    },
    releaseDate: {
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    buttonContainer: {
        ...commonStyles.rowCenter,
        flexWrap: 'wrap',
        gap: spacing.md,
    },
})
