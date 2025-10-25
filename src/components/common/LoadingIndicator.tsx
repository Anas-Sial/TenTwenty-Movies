import { ActivityIndicator, View } from 'react-native'
import React, { memo } from 'react'
import commonStyles from '@/styles/commonStyles'
import { colors } from '@/styles'
import { LoadingIndicatorProps } from '@/types'

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = 'large', style }) => {
    return (
        <View style={[commonStyles.centerContent, style]}>
            <ActivityIndicator
                size={size}
                color={colors.primary} />
        </View>
    )
}

export default memo(LoadingIndicator)