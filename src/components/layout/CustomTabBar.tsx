import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { colors, fonts, hp, spacing } from '@/styles'
import { AppText } from '../common'
import { tabConfigs } from '@/data'
import commonStyle from '@/styles/commonStyles'
import { Variant } from '@/types'

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const tabConfig = tabConfigs?.find((config: any) => config.name === route.name)

        if (!tabConfig) return null

        const isFocused = state.index === index
        const IconComponent = tabConfig.icon

        const onPress = () => {
          if (tabConfig.enabled) {
            const event = navigation.emit({
              type: 'tabPress',
              target: route?.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route?.name, route?.params)
            }
          }
        }

        const onLongPress = () => {
          if (tabConfig.enabled) {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            disabled={!tabConfig.enabled}
          >
            <View style={commonStyle.center}>
              <IconComponent
                width={24}
                height={24}
                color={isFocused ? colors.background : colors.darkGray}
              />
              <AppText
                variant={Variant.smallCaption}
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused ? colors.background : colors.darkGray,
                    fontFamily: isFocused ? fonts.semiBold : fonts.regular,
                  },
                ]}
              >
                {tabConfig.label}
              </AppText>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default CustomTabBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.darkPurple,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderTopLeftRadius: spacing.xl,
    borderTopRightRadius: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    ...commonStyle.centerContent,
    paddingVertical: spacing.sm,
  },
  tabLabel: {
    marginTop: hp(.7),
    textAlign: 'center',
  },
})