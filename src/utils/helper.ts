
import { colors } from '@/styles'
import { Platform } from 'react-native';

export const truncateText = (text: string, maxLength: number): string => {
    if (!text || text === "") return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

export const isIOS = Platform.OS === "ios";

export const getSeatColor = (seatType: string, isSelected: boolean): string => {
    if (isSelected) return colors.yellow
    switch (seatType) {
        case 'vip': return colors.purple
        case 'unavailable': return colors.lightGray
        default: return colors.primary
    }
}