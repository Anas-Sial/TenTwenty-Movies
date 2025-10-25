import { colors } from "@/styles"
import { SvgElementProps } from "@/types"
import React, { memo } from "react"

const SvgElement: React.FC<SvgElementProps> = ({ name: Tag, color = colors.white, ...props }) => {
    return <Tag color={color} {...props} />
}

export default memo(SvgElement)
