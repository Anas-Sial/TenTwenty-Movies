import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { AppText, SvgElements } from '@/components/common'
import { colors, hp, spacing } from '@/styles'
import { Variant } from '@/types'
import commonStyles from '@/styles/commonStyles'
import { IMAGES } from '@/assets/images'
import { MinusIcon, PlusIcon } from '@/assets/svg'
import { SeatProps } from '../types'


interface SeatMapProps {
    onSeatSelect: (seat: SeatProps) => void
    selectedSeats: SeatProps[]
}

const SeatMap: React.FC<SeatMapProps> = ({ onSeatSelect, selectedSeats }) => {
    const [zoomLevel, setZoomLevel] = useState(1)

    const [seats] = useState<SeatProps[]>(() => {
        const seatData: SeatProps[] = []

        // Define seat layout with aisles/gaps as per image
        const seatLayout = [
            { row: 1, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }, // 18 seats
            { row: 2, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, // 22 seats
            { row: 3, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, // 22 seats
            { row: 4, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, // 22 seats
            { row: 5, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
            { row: 6, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
            { row: 7, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
            { row: 8, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
            { row: 9, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
            { row: 10, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats (VIP)
        ]

        seatLayout.forEach(({ row, seats: seatNumbers }) => {
            seatNumbers.forEach(num => {
                seatData.push({
                    id: `${row}-${num}`,
                    row,
                    number: num,
                    type: row === 10 ? 'vip' : 'regular',
                    price: row === 10 ? 150 : 50,
                    isSelected: false
                })
            })
        })

        // Mark some seats as unavailable to match the image
        const unavailableSeats = ['1-5', '2-8', '3-11', '4-2', '5-14', '6-6', '7-9', '8-3', '9-12', '10-5']
        return seatData.map(seat => ({
            ...seat,
            type: unavailableSeats.includes(seat.id) ? 'unavailable' : seat.type
        }))
    })

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.2, 2))
    }

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.2, 0.5))
    }

    const getSeatStyle = (seat: SeatProps) => {
        const isSelected = selectedSeats.some(s => s.id === seat.id)
        const seatSize = 16 * zoomLevel

        const baseStyle = {
            width: seatSize,
            height: seatSize,
            borderRadius: 3,
            marginHorizontal: 1,
        }

        if (isSelected) {
            return [baseStyle, styles.selectedSeat]
        }

        switch (seat.type) {
            case 'vip':
                return [baseStyle, styles.vipSeat]
            case 'unavailable':
                return [baseStyle, styles.unavailableSeat]
            default:
                return [baseStyle, styles.regularSeat]
        }
    }

    const renderSeat = (seat: SeatProps) => (
        <TouchableOpacity
            key={seat.id}
            style={getSeatStyle(seat)}
            onPress={() => seat.type !== 'unavailable' && onSeatSelect(seat)}
            disabled={seat.type === 'unavailable'}
        />
    )

    const renderSeatGroup = (rowSeats: SeatProps[], groupIndex: number) => {
        const groupSize = rowSeats.length <= 18 ? 6 : 8
        const groups = []

        for (let i = 0; i < rowSeats.length; i += groupSize) {
            groups.push(rowSeats.slice(i, i + groupSize))
        }

        return groups.map((group, index) => (
            <View key={`group-${groupIndex}-${index}`} style={commonStyles.flexRow}>
                {group.map(renderSeat)}
                {index < groups.length - 1 && <View style={styles.aisle} />}
            </View>
        ))
    }

    const renderRow = (rowNumber: number) => {
        const rowSeats = seats.filter(seat => seat.row === rowNumber)

        return (
            <View key={rowNumber} style={styles.row}>
                <View style={styles.rowNumber}>
                    <AppText
                        variant={Variant.captionBold}
                    >
                        {rowNumber}
                    </AppText>
                </View>

                <View style={styles.seatsWrapper}>
                    <View style={commonStyles.rowCenter}>
                        {renderSeatGroup(rowSeats, rowNumber)}
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.screenContainer}>
                <Image source={IMAGES.ellipse} style={styles.screen} />
            </View>
            <AppText variant={Variant.captionBold} color={colors.darkGray} style={{ textAlign: 'center', marginTop: hp(1) }}>
                SCREEN
            </AppText>


            <View style={styles.seatMapContainer}>
                <ScrollView
                    horizontal
                    style={styles.horizontalScrollContainer}
                    contentContainerStyle={styles.seatMapContent}
                >
                    <View style={styles.seatMap}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(renderRow)}
                    </View>
                </ScrollView>
            </View>

            <View style={styles.zoomControls}>
                <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
                    <SvgElements name={PlusIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
                    <SvgElements name={MinusIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SeatMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    screenContainer: {
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    screen: {
        width: '100%',
        resizeMode: 'contain',
        position: 'absolute',
    },
    seatMapContainer: {
        flex: 1,
        paddingHorizontal: spacing.md,
    },
    horizontalScrollContainer: {
        flex: 1,
    },
    seatMapContent: {
        paddingBottom: spacing.xl,
    },
    seatMap: {
        paddingLeft: spacing.lg,
      ...commonStyles.center,
        width: '100%',
    },
    row: {
        ...commonStyles.flexRow,
        marginBottom: spacing.sm,
        minHeight: 24,
        width: '100%',
    },

    rowNumber: {
        width: 30,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    seatsWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    aisle: {
        width: 8,
        height: 1,
    },
    regularSeat: {
        backgroundColor: colors.primary,
    },
    vipSeat: {
        backgroundColor: colors.purple,
    },
    unavailableSeat: {
        backgroundColor: colors.lightGray,
    },
    selectedSeat: {
        backgroundColor: colors.yellow,
    },
    zoomControls: {
        position: 'absolute',
        right: spacing.md,
        bottom: hp(2),
        gap: spacing.sm,
        ...commonStyles.flexRow,
    },
    zoomButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.lightGray,
       ...commonStyles.center,
    },
})
