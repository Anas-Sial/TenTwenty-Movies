import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppText, SvgElements } from '@/components/common'
import { colors, hp, spacing } from '@/styles'
import { LeftWhiteIcon } from '@/assets/svg'
import { Variant } from '@/types'
import commonStyles from '@/styles/commonStyles'
import { isIOS } from '@/utils/helper'

const MovieDetailHeader: React.FC = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <SvgElements
                        name={LeftWhiteIcon}
                    />
                </TouchableOpacity>
                <AppText variant={Variant.subTitle} color={colors.white}>
                    Watch
                </AppText>
            </View>
        </View>
    )
}

export default MovieDetailHeader

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingTop: isIOS ? hp(4) : hp(0),
    },
    header: {
        ...commonStyles.flexRow,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        gap: spacing.md,
    },
    backButton: {
        padding: spacing.xs,
    }
})