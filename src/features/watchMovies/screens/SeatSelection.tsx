import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native'
import ScreenWrapper from '@/components/layout/ScreenWrapper'
import { SeatSelectionHeader, SeatMap, SeatLegend, SeatSelectionFooter } from '../components'
import { StackParamList } from '@/types'
import { SeatProps } from '../types'
import { colors } from '@/styles'

type SeatSelectionRouteProp = RouteProp<StackParamList, 'SeatSelection'>

interface SeatSelectionProps {
    route: SeatSelectionRouteProp
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ route }) => {
    const navigation = useNavigation()
    const { movie, showtime, hall } = route?.params || {}
    const [selectedSeats, setSelectedSeats] = useState<SeatProps[]>([])

    const handleSeatSelect = (seat: SeatProps) => {
        setSelectedSeats(prev => {
            const isAlreadySelected = prev.some(s => s.id === seat.id)
            if (isAlreadySelected) {
                return prev.filter(s => s.id !== seat.id)
            } else {
                return [...prev, { ...seat, isSelected: true }]
            }
        })
    }

    const handleRemoveSeat = (seatId: string) => {
        setSelectedSeats(prev => prev.filter(s => s.id !== seatId))
    }

    const handleProceedToPay = () => {
        navigation.goBack()
    }

    return (
        <ScreenWrapper backgroundColor={colors.white}>

            <SeatSelectionHeader
                movieTitle={movie.title}
                showtime={showtime}
                hall={hall}
            />

            <View style={styles.content}>
                <SeatMap
                    onSeatSelect={handleSeatSelect}
                    selectedSeats={selectedSeats}
                />
            </View>

            <SeatLegend />

            <SeatSelectionFooter
                selectedSeats={selectedSeats}
                onRemoveSeat={handleRemoveSeat}
                onProceedToPay={handleProceedToPay}
            />
        </ScreenWrapper>
    )
}

export default SeatSelection

const styles = StyleSheet.create({
    content: {
        flex: 1
    }
})