import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppText, SvgElements } from '@/components/common'
import { colors, hp, spacing } from '@/styles'
import { LeftArrowIcon } from '@/assets/svg'
import { Variant } from '@/types'
import { SeatSelectionHeaderProps } from '../types'

const SeatSelectionHeader: React.FC<SeatSelectionHeaderProps> = ({
    movieTitle,
    showtime,
    hall
}) => {
    const navigation = useNavigation()

    const handleBackPress = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SvgElements
                    name={LeftArrowIcon}
                    onPress={handleBackPress} />

                <View style={styles.titleContainer}>
                    <AppText variant={Variant.largeSemiBold} style={styles.title}>
                        {movieTitle}
                    </AppText>
                    <AppText variant={Variant.captionMedium} color={colors.primary} style={styles.showtime}>
                        {showtime} | {hall}
                    </AppText>
                </View>
            </View>
        </View>
    )
}

export default SeatSelectionHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: spacing.md,
        paddingVertical: hp(1.5),
        gap: spacing.md,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    showtime: {
        textAlign: 'center',
    }
})