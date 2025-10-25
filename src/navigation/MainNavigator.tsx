import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StackParamList } from '@/types'
import { SCREENS } from '@/constants/screens'
import TabNavigator from './TabNavigator'
import { MovieDetail, VideoPlayer, ShowtimeSelection, SeatSelection } from '@/features/watchMovies/screens'

const Stack = createStackNavigator<StackParamList>()

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.TAB_NAVIGATOR} component={TabNavigator} />
            <Stack.Screen name={SCREENS.MOVIE_DETAIL} component={MovieDetail} />
            <Stack.Screen name={SCREENS.VIDEO_PLAYER} component={VideoPlayer} />
            <Stack.Screen name={SCREENS.SHOWTIME_SELECTION} component={ShowtimeSelection} />
            <Stack.Screen name={SCREENS.SEAT_SELECTION} component={SeatSelection} />
        </Stack.Navigator>
    )
}

export default MainNavigator
