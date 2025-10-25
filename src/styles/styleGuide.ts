import { Dimensions } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

const screenWidth = Dimensions.get("window").width

const getFontSize = (baseSize: number) => {
    const scaleFactor = screenWidth / 375
    const newSize = baseSize * scaleFactor
    return Math.round(newSize)
}

export {
    getFontSize,
    wp,
    hp,
}