import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StackMovieParamList } from '@/types'
import { SCREENS } from '@/constants/screens'
import { MovieGener, WatchMovie } from '@/features/watchMovies/screens'

const Stack = createStackNavigator<StackMovieParamList>()

const WatchStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.WATCH} component={WatchMovie} />
            <Stack.Screen name={SCREENS.MOVIE_GENER} component={MovieGener} />
        </Stack.Navigator>
    )
}

export default WatchStack
