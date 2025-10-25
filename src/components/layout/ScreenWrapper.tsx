import React, { memo } from "react"
import { View, StyleSheet, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "@/styles"
import { ScreenWrapperProps } from "@/types"

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  backgroundColor = colors.background,
  style = {},
  statusBarColor = "dark-content",
  withoutStatusBar = false,
}) => {
  const Wrapper = withoutStatusBar ? View : SafeAreaView

  return (
    <Wrapper style={[styles.wrapper, { backgroundColor }]}>
      {withoutStatusBar ? (
        <StatusBar />
      ) : (
        <StatusBar barStyle={statusBarColor} backgroundColor={colors.black} />
      )}
      <View style={[styles.container, { backgroundColor }, style]}>
        {children}
      </View>
    </Wrapper>
  )
}

export default memo(ScreenWrapper)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
})