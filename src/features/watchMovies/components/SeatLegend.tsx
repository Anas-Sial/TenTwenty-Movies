import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from '@/components/common'
import { colors, hp, spacing, wp } from '@/styles'
import { Variant } from '@/types'
import commonStyles from '@/styles/commonStyles'

const SeatLegend: React.FC = () => {

    const legendItems = [
        { color: colors.yellow, label: 'Selected' },
        { color: colors.purple, label: 'VIP (150$)' },
        { color: colors.lightGray, label: 'Not available' },
        { color: colors.primary, label: 'Regular (50 $)' },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.legend}>
                {legendItems.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                        <AppText variant={Variant.captionMedium} color={colors.darkGray}>
                            {item.label}
                        </AppText>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default SeatLegend

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: spacing.md,
        paddingVertical: hp(2),
    },
    legend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    legendItem: {
        ...commonStyles.flexRowGap,
        minWidth: '45%',
    },
    legendColor: {
        width: wp(4),
        height: wp(4),
        borderRadius: wp(1),
    },
})

