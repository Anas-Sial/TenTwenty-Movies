import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { AppText } from '@/components/common'
import { colors, spacing, hp, wp } from '@/styles'
import { Variant } from '@/types'
import commonStyles from '@/styles/commonStyles'
import { Showtime } from '../types'
import { IMAGES } from '@/assets/images'

interface ShowtimeCardProps {
    showtime: Showtime
    isSelected: boolean
    onSelect: (showtime: Showtime) => void
}

const ShowtimeCard: React.FC<ShowtimeCardProps> = ({ showtime, isSelected, onSelect }) => {
    const renderSeatMapPreview = () => {
        // Use the exact same seat layout as SeatMap
        const seatLayout = [
            { row: 1, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }, // 18 seats
            { row: 2, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, // 22 seats
            { row: 3, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, // 22 seats
            { row: 4, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, // 22 seats
            { row: 5, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
            { row: 6, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
        ]

        // Use the same unavailable seats as SeatMap
        const unavailableSeats = ['1-5', '2-8', '3-11', '4-2', '5-14', '6-6']

        const renderSeatGroup = (rowSeats: { id: string; color: string }[], groupIndex: number) => {
            const totalSeats = rowSeats.length
            let groups = []

            if (totalSeats >= 18) {
                // For rows with 18+ seats: left, 14 center, right
                const leftCount = Math.floor((totalSeats - 14) / 2)

                groups = [
                    rowSeats.slice(0, leftCount),                    // Left section
                    rowSeats.slice(leftCount, leftCount + 14),       // Center section (14 seats)
                    rowSeats.slice(leftCount + 14, totalSeats)      // Right section
                ]
            } else {
                // For rows with less than 18 seats: distribute evenly
                const groupSize = Math.ceil(totalSeats / 3)
                groups = [
                    rowSeats.slice(0, groupSize),
                    rowSeats.slice(groupSize, groupSize * 2),
                    rowSeats.slice(groupSize * 2, totalSeats)
                ]
            }

            return groups.map((group, index) => (
                <View key={`group-${groupIndex}-${index}`} style={commonStyles.flexRow}>
                    {group.map((seat, seatIndex) => (
                        <View
                            key={`${groupIndex}-${seatIndex}`}
                            style={[styles.seatDot, { backgroundColor: seat.color }]}
                        />
                    ))}
                    {index < groups.length - 1 && <View style={styles.aisle} />}
                </View>
            ))
        }

        const renderRow = (rowNumber: number) => {
            const rowSeats: { id: string; color: string }[] = []
            const seatNumbers = seatLayout[rowNumber - 1].seats

            seatNumbers.forEach((num) => {
                const seatId = `${rowNumber}-${num}`
                const isUnavailable = unavailableSeats.includes(seatId)
                const seatColor = isUnavailable ? colors.lightGray : colors.primary

                rowSeats.push({
                    id: seatId,
                    color: seatColor
                })
            })

            return (
                <View key={rowNumber} style={styles.row}>
                    <View style={styles.seatsWrapper}>
                        <View style={commonStyles.rowCenter}>
                            {renderSeatGroup(rowSeats, rowNumber)}
                        </View>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.seatMapPreview}>
                <ImageBackground source={IMAGES.ellipse} style={styles.screen} >
                    {Array.from({ length: 6 }, (_, i) => i + 1).map(renderRow)}
                </ImageBackground>
            </View>
        )
    }

    return (
        <View>
            <View style={commonStyles.flexRowGap}>
                <AppText variant={Variant.captionMedium}>
                    {showtime.time}
                </AppText>
                <AppText variant={Variant.caption} color={colors.darkGray}>
                    {showtime.hall}
                </AppText>
            </View>

            <TouchableOpacity
                style={[
                    styles.showtimeCard,
                    isSelected && styles.selectedShowtimeCard
                ]}
                onPress={() => onSelect(showtime)}
            >
                {renderSeatMapPreview()}
            </TouchableOpacity>

            <View style={styles.priceContainer}>
                <AppText variant={Variant.captionBold} color={colors.darkGray}>
                    From{"  "}
                    <AppText variant={Variant.captionBold}>{showtime.price}$</AppText>{" "}or{" "}<AppText variant={Variant.captionBold}>{showtime.bonus}$</AppText> bonus
                </AppText>
            </View>
        </View>
    )
}

export default ShowtimeCard

const styles = StyleSheet.create({
    showtimeCard: {
        backgroundColor: colors.white,
        borderRadius: hp(1.2),
        padding: spacing.lg,
        marginRight: spacing.md,
        width: wp(65),
        borderWidth: 1,
        borderColor: colors.lightGray,
        height: hp(20)
    },
    selectedShowtimeCard: {
        borderColor: colors.primary,
        borderWidth: 2
    },
    seatMapPreview: {
        marginBottom: spacing.md,
        ...commonStyles.center
    },
    screen: {
        width: '100%',
        resizeMode: 'contain',
        paddingTop: hp(2)
    },
    row: {
        ...commonStyles.flexRow,
        marginBottom: spacing.xs,
        minHeight: 12,
        width: '100%'
    },
    seatsWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    seatDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 0.5
    },
    aisle: {
        width: wp(1.5),
        height: 1
    },
    priceContainer: {
        marginTop: hp(1)
    }
})
