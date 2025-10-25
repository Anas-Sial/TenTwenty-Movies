import React, { memo } from 'react'
import { Text, StyleSheet } from 'react-native'
import { AppTextProps } from '@/types'
import { colors, fonts, getFontSize } from '@/styles'

const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  color = colors.text,
  style,
  ...props
}) => {
  return (
    <Text style={[styles[variant], { color }, style]} {...props}>
      {children}
    </Text>
  )
}

export default memo(AppText)

const styles = StyleSheet.create({
  title: {
    fontSize: getFontSize(24),
    fontFamily: fonts.semiBold,
  },
  subTitle: {
    fontSize: getFontSize(18),
    fontFamily: fonts.semiBold,
  },
  largeSemiBold: {
    fontSize: getFontSize(16),
    fontFamily: fonts.semiBold,
  },
  body: {
    fontSize: getFontSize(14),
    fontFamily: fonts.regular,
  },
  bodyMedium: {
    fontSize: getFontSize(14),
    fontFamily: fonts.medium,
  },
  bodyBold: {
    fontSize: getFontSize(14),
    fontFamily: fonts.bold,
  },
  bodySemiBold: {
    fontSize: getFontSize(14),
    fontFamily: fonts.semiBold,
  },
  caption: {
    fontSize: getFontSize(12),
    fontFamily: fonts.regular,
  },
  captionMedium: {
    fontSize: getFontSize(12),
    fontFamily: fonts.medium,
  },
  captionBold: {
    fontSize: getFontSize(12),
    fontFamily: fonts.bold,
  },
  smallCaption: {
    fontSize: getFontSize(10),
    fontFamily: fonts.regular,
  },
})