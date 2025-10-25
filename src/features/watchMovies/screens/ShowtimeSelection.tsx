import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ScreenWrapper from '@/components/layout/ScreenWrapper'
import { AppText, AppButton } from '@/components/common'
import { colors, spacing, hp, wp } from '@/styles'
import { Variant } from '@/types'
import { StackParamList } from '@/types'
import { SCREENS } from '@/constants/screens'
import commonStyles from '@/styles/commonStyles'
import { SeatSelectionHeader, ShowtimeCard } from '../components'
import { Showtime } from '../types'
import { dates, showtimes } from '../data/ShowTimeData'

type ShowtimeSelectionRouteProp = RouteProp<StackParamList, 'ShowtimeSelection'>
type ShowtimeSelectionNavigationProp = StackNavigationProp<StackParamList>

interface ShowtimeSelectionProps {
    route: ShowtimeSelectionRouteProp
}

const ShowtimeSelection: React.FC<ShowtimeSelectionProps> = ({ route }) => {
    const navigation = useNavigation<ShowtimeSelectionNavigationProp>()
    const { movie } = route.params

    const [selectedDate, setSelectedDate] = useState('5 Mar')
    const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null)

    const handleDateSelect = (date: string) => {
        setSelectedDate(date)
    }

    const handleShowtimeSelect = (showtime: Showtime) => {
        setSelectedShowtime(showtime)
    }

    const handleSelectSeats = () => {
        if (selectedShowtime) {
            navigation.navigate(SCREENS.SEAT_SELECTION, {
                movie,
                showtime: `${selectedDate} | ${selectedShowtime.time}`,
                hall: selectedShowtime.hall
            })
        }
    }

    const renderDateButton = (date: string) => (
        <TouchableOpacity
            key={date}
            style={[
                styles.dateButton,
                selectedDate === date && styles.selectedDateButton
            ]}
            onPress={() => handleDateSelect(date)}
        >
            <AppText
                variant={Variant.captionBold}
                color={selectedDate === date ? colors.white : colors.darkGray}
            >
                {date}
            </AppText>
        </TouchableOpacity>
    )


    return (
        <ScreenWrapper backgroundColor={colors.white}>

            <SeatSelectionHeader
                movieTitle={movie.title}
                showtime={selectedShowtime ? `${selectedDate} | ${selectedShowtime.time}` : 'Select a showtime'}
                hall={selectedShowtime ? selectedShowtime.hall : 'Select a showtime'}
            />


            <View style={styles.content}>
                <View style={styles.section}>
                    <AppText variant={Variant.largeSemiBold}>
                        Date
                    </AppText>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.datesContainer}
                        contentContainerStyle={styles.datesContent}
                    >
                        {dates?.map(renderDateButton)}
                    </ScrollView>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.showtimesContainer}
                    contentContainerStyle={styles.showtimesContent}
                >
                    {showtimes.map((showtime) => (
                        <ShowtimeCard
                            key={showtime.id}
                            showtime={showtime}
                            isSelected={selectedShowtime?.id === showtime.id}
                            onSelect={handleShowtimeSelect}
                        />
                    ))}
                </ScrollView>
            </View>

            <AppButton
                title="Select Seats"
                onPress={handleSelectSeats}
                disabled={!selectedShowtime}
                style={styles.selectSeatsButton}
            />

        </ScreenWrapper>
    )
}

export default ShowtimeSelection

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: spacing.lg
    },
    section: {
        marginBottom: hp(4),
        marginTop: hp(8)
    },
    datesContainer: {
        marginBottom: spacing.sm
    },
    datesContent: {
        paddingRight: spacing.lg
    },
    dateButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: hp(1.2),
        backgroundColor: colors.gray_03,
        marginRight: spacing.sm,
        minWidth: 60,
        ...commonStyles.center
    },
    selectedDateButton: {
        backgroundColor: colors.primary
    },
    showtimesContainer: {
        flex: 1
    },
    showtimesContent: {
        paddingRight: spacing.lg,
        alignSelf: 'flex-start'
    },
    selectSeatsButton: {
        backgroundColor: colors.primary,
        width: wp('92%'),
        alignSelf: 'center',
        marginBottom: hp(2)
    }
})
