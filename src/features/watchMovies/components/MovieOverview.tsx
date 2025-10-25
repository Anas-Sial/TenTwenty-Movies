import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from '@/components/common'
import { colors, hp, spacing } from '@/styles'
import { Variant } from '@/types'
import { MovieOverviewProps } from '../types'

const MovieOverview: React.FC<MovieOverviewProps> = ({ overview }) => {
    return (
        <View style={styles.container}>
            <AppText variant={Variant.largeSemiBold} style={styles.title}>
                Overview
            </AppText>
            <AppText variant={Variant.body} color={colors.darkGray}>
                {overview}
            </AppText>
        </View>
    )
}

export default MovieOverview

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.md,
        paddingBottom: spacing.xl,
        borderTopWidth: 1,
        borderColor: colors.lightGray,
        paddingTop: hp(1),
    },
    title: {
        marginBottom: spacing.xs,
    },
})
