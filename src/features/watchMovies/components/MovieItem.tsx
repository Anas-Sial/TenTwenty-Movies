import React from 'react'
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { AppText } from '@/components/common'
import { colors, hp, spacing, wp } from '@/styles'
import { MovieItemProps } from '../types'
import { APP_CONFIG } from '@/constants/config'
import { truncateText } from '@/utils/helper'
import { Variant } from '@/types'

const MovieItem: React.FC<MovieItemProps> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(movie)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: `${APP_CONFIG.Image_Url}${movie?.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[colors.black_0, colors.black]}
        locations={[0, 1]}
        style={styles.overlay}
      >
        <View style={styles.titleContainer}>
          <AppText variant={Variant.largeSemiBold} color={colors.white}>
            {truncateText(movie?.title, 70)}
          </AppText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default MovieItem

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: 12,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: hp(22),
  },
  titleContainer: {
    flex: 1,
    padding: spacing.sm,
    paddingVertical: hp(1.8),
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  }
})