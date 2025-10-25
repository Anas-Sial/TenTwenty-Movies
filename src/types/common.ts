import { ReactNode } from "react";
import { StyleProp, TextStyle, TextProps, ViewStyle, StatusBarStyle, ActivityIndicatorProps } from "react-native";
import { SvgProps } from "react-native-svg"
import { TabName } from "./navigation";

export const Variant = {
    title: 'title',
    subTitle: 'subTitle',
    body: 'body',
    bodyMedium: 'bodyMedium',
    bodyBold: 'bodyBold',
    bodySemiBold: 'bodySemiBold',
    caption: 'caption',
    captionMedium: 'captionMedium',
    captionBold: 'captionBold',
    smallCaption: 'smallCaption',
    largeSemiBold: 'largeSemiBold',
} as const

export type VariantType = typeof Variant[keyof typeof Variant];

export interface AppTextProps extends TextProps {
    children: ReactNode;
    variant?: VariantType;
    color?: string;
    style?: StyleProp<TextStyle>;
}

export interface TabConfig {
    name: TabName;
    label: string;
    icon: React.ComponentType<{ width?: number; height?: number; color?: string }>;
    enabled: boolean;
}

export interface ScreenWrapperProps {
    children: ReactNode
    backgroundColor?: string
    style?: StyleProp<ViewStyle>
    statusBarColor?: StatusBarStyle
    withoutStatusBar?: boolean
}

export interface SvgElementProps extends SvgProps {
    name: React.ComponentType<SvgProps>
    color?: string
}

export interface LoadingIndicatorProps extends ActivityIndicatorProps {
    style?: ViewStyle;
}

export interface AppButtonProps {
    title: string
    onPress?: () => void
    variant?: 'primary' | 'secondary'
    style?: ViewStyle
    addLeft?: React.ReactNode
    disabled?: boolean
}