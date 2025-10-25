import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AppText, SvgElements } from '@/components/common'
import { colors, hp, spacing, wp } from '@/styles'
import { Variant } from '@/types'
import { CloseIcon } from '@/assets/svg'
import { SeatProps, SeatSelectionFooterProps } from '../types'
import AppButton from '@/components/common/AppButton'
import commonStyles from '@/styles/commonStyles'

const SeatSelectionFooter: React.FC<SeatSelectionFooterProps> = ({
    selectedSeats,
    onRemoveSeat,
    onProceedToPay
}) => {
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)

    const renderSelectedSeat = (seat: SeatProps) => (
        <View key={seat.id} style={styles.selectedSeatItem}>
            <AppText variant={Variant.caption}>
                <AppText variant={Variant.bodySemiBold}>{seat.number} / </AppText>
                {seat.row} row
            </AppText>
            <TouchableOpacity onPress={() => onRemoveSeat(seat.id)}>
                <SvgElements name={CloseIcon} height={wp(4.5)} />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>

            <View style={styles.selectedSeatsContainer}>
                {selectedSeats.map(renderSelectedSeat)}
            </View>

            <View style={commonStyles.rowJustify}>
                <View style={styles.totalPriceContainer}>
                    <AppText variant={Variant.caption}>
                        Total Price
                    </AppText>
                    <AppText variant={Variant.largeSemiBold}>
                        $ {totalPrice}
                    </AppText>
                </View>

                <AppButton
                    title="Proceed to pay"
                    style={styles.proceedButton}
                    disabled={selectedSeats.length === 0}
                    onPress={onProceedToPay}
                />
            </View>

        </View>
    )
}

export default SeatSelectionFooter

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: spacing.md,
    },
    selectedSeatsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginBottom: hp(2),
    },
    selectedSeatItem: {
        ...commonStyles.flexRow,
        backgroundColor: colors.gray_03,
        borderRadius: wp(2),
        paddingHorizontal: spacing.sm,
        paddingVertical: hp(.6),
        gap: spacing.xs,
    },
    totalPriceContainer: {
        backgroundColor: colors.gray_03,
        borderRadius: wp(2.5),
        paddingHorizontal: wp(3),
        paddingVertical: wp(1.5),
        width: wp(32),
        height: wp(14),
    },
    proceedButton: {
        width: wp(58)
    },
})
