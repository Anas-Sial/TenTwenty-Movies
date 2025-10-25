import React, { useRef } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native'
import Video from 'react-native-video'
import { AppText, SvgElements } from '@/components/common'
import { colors, hp, spacing } from '@/styles'
import { StackParamList } from '@/types'
import { LeftWhiteIcon } from '@/assets/svg'
import { Variant } from '@/types'
import ScreenWrapper from '@/components/layout/ScreenWrapper'
import commonStyles from '@/styles/commonStyles'

type VideoPlayerRouteProp = RouteProp<StackParamList, 'VideoPlayer'>

interface VideoPlayerProps {
    route: VideoPlayerRouteProp
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ route }) => {
    const navigation = useNavigation()
    const { videoUrl, movieTitle } = route.params
    const videoRef = useRef<VideoPlayerProps>(null)

    const handleVideoEnd = () => {
        navigation.goBack()
    }

    const handleBackPress = () => {
        navigation.goBack()
    }

    return (
        <ScreenWrapper backgroundColor={colors.black} statusBarColor='light-content'>

            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <SvgElements name={LeftWhiteIcon} width={24} height={24} />
                </TouchableOpacity>
                <AppText variant={Variant.subTitle} color={colors.white} style={styles.title}>
                    {movieTitle}
                </AppText>
            </View>

            <Video
                ref={videoRef}
                source={{ uri: videoUrl }}
                style={styles.video}
                controls={true}
                resizeMode="contain"
                onEnd={handleVideoEnd}
                onError={(error) => {
                    console.log('Video error:', error)
                    navigation.goBack()
                }}
            />
        </ScreenWrapper>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: hp(2),
        left: 0,
        right: 0,
        zIndex: 10,
        ...commonStyles.flexRow,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        gap: spacing.md,
    },
    backButton: {
        padding: spacing.xs,
    },
    title: {
        flex: 1,
        fontSize: 16,
    },
    video: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
})