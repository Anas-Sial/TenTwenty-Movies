import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppText, SvgElements } from '@/components/common'
import { colors, hp, spacing } from '@/styles'
import { SearchIcon } from '@/assets/svg'
import { StackMovieParamList, Variant } from '@/types'
import commonStyles from '@/styles/commonStyles'
import { SCREENS } from '@/constants/screens'

type WatchHeaderNavigationProp = StackNavigationProp<StackMovieParamList>

interface WatchHeaderProps {
    title?: string
}

const WatchHeader: React.FC<WatchHeaderProps> = ({ title = "Watch" }) => {
    const navigation = useNavigation<WatchHeaderNavigationProp>()
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText variant={Variant.subTitle}>
                    {title}
                </AppText>
                <SvgElements
                    name={SearchIcon}
                    width={24}
                    height={24}
                    color={colors.text}
                    onPress={() => navigation.navigate(SCREENS.MOVIE_GENER)}
                />
            </View>
        </View>
    )
}

export default WatchHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingVertical: hp(2),
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    header: {
        ...commonStyles.rowJustify,
        paddingHorizontal: spacing.md,
    }
})