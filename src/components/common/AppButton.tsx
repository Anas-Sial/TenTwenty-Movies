import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import AppText from './AppText'
import { AppButtonProps, Variant } from '@/types'
import { colors, spacing, wp } from '@/styles'
import commonStyles from '@/styles/commonStyles'

const AppButton: React.FC<AppButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    style,
    addLeft,
    disabled,
    ...props
}) => {
    const isPrimary = variant === 'primary'

    return (
        <TouchableOpacity
            style={[
                styles.buttonBase,
                isPrimary ? styles.primaryButton : styles.secondaryButton,
                style
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
            {...props}
        >
            {addLeft && <View style={styles.leftContainer}>{addLeft}</View>}
            <AppText variant={Variant.bodyBold} color={colors.white}>
                {title}
            </AppText>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    buttonBase: {
        ...commonStyles.rowCenter,
        // paddingVertical: spacing.md,
        height: wp(14),
        paddingHorizontal: spacing.lg,
        borderRadius: wp(2.5),
        width: wp(65),
        gap: spacing.sm,
    },
    primaryButton: {
        backgroundColor: colors.primary,
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: colors.primary,
    },
    leftContainer: {
        marginRight: spacing.xs,
    },
})
