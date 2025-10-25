import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { AppText, SvgElements } from '@/components/common'
import { colors, hp, spacing, wp } from '@/styles'
import { Variant } from '@/types'
import commonStyles from '@/styles/commonStyles'
import { IMAGES } from '@/assets/images'
import { MinusIcon, PlusIcon } from '@/assets/svg'
import { SeatMapProps, SeatProps } from '../types'
import { seatLayout, unavailableSeats } from '../data/ShowTimeData'
import { getSeatColor } from '@/utils/helper'

const SeatMap: React.FC<SeatMapProps> = ({ onSeatSelect, selectedSeats }) => {
    const [zoomLevel, setZoomLevel] = useState(1)

    const [seats] = useState<SeatProps[]>(() => {
        const seatData: SeatProps[] = []

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

    const renderSeat = (seat: SeatProps) => {
        const isSelected = selectedSeats.some(s => s.id === seat.id)
        const seatSize = 16 * zoomLevel


        return (
            <TouchableOpacity
                key={seat.id}
                style={styles.seatContainer}
                onPress={() => seat.type !== 'unavailable' && onSeatSelect(seat)}
                disabled={seat.type === 'unavailable'}>
                <View
                    style={[
                        styles.seatShape,
                        {
                            width: seatSize,
                            height: seatSize * 1,
                            backgroundColor: getSeatColor(seat.type, isSelected)
                        }
                    ]}
                />
                <View
                    style={[
                        styles.seatBack,
                        {
                            width: seatSize * 0.8,
                            height: seatSize * 0.2,
                            backgroundColor: getSeatColor(seat.type, isSelected)
                        }
                    ]}
                />
            </TouchableOpacity>
        )
    }

    const renderSeatGroup = (rowSeats: SeatProps[], groupIndex: number) => {
        const totalSeats = rowSeats.length
        let groups = []

        if (totalSeats >= 18) {
            const leftCount = Math.floor((totalSeats - 14) / 2)
            const rightCount = totalSeats - leftCount - 14

            groups = [
                rowSeats.slice(0, leftCount),  
                rowSeats.slice(leftCount, leftCount + 14),   
                rowSeats.slice(leftCount + 14, totalSeats)  
            ]
        } else {
            const groupSize = Math.ceil(totalSeats / 3)
            groups = [
                rowSeats.slice(0, groupSize),
                rowSeats.slice(groupSize, groupSize * 2),
                rowSeats.slice(groupSize * 2, totalSeats)
            ]
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
        width: wp(5),
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    seatsWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    aisle: {
        width: spacing.md,
        height: 20,
        backgroundColor: 'transparent',
    },
    seatContainer: {
        alignItems: 'center',
        marginHorizontal: 1,
    },
    seatShape: {
        borderRadius: 3,

    },
    seatBack: {
        borderRadius: 2,
        marginTop: 1,
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
