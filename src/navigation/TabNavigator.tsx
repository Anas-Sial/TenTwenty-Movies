import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationParamList } from '@/types'
import CustomTabBar from '@/components/layout/CustomTabBar'
import { WatchMovie } from '@/features/watchMovies/screens'
import WatchStack from './WatchStack'

const Tab = createBottomTabNavigator<NavigationParamList>()

const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="Watch"
            
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={WatchMovie}
                options={{
                    tabBarLabel: 'Dashboard',
                }}
            />
            <Tab.Screen
                name="Watch"
                component={WatchStack}
                options={{
                    tabBarLabel: 'Watch',
                }}
            />
            <Tab.Screen
                name="MediaLibrary"
                component={WatchMovie}
                options={{
                    tabBarLabel: 'Media Library',
                }}
            />
            <Tab.Screen
                name="More"
                component={WatchMovie}
                options={{
                    tabBarLabel: 'More',
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator