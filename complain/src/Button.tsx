import React from 'react'
import { ColorConfig, getColours } from './colorConfig'


function Button(props: {
    label: string,
    onClick: () => void,
    className?: string,
    disabled?: boolean,
    background?: ColorConfig,
    textColor?: ColorConfig,
    disabledBackground?: ColorConfig,
    hoverBackground?: ColorConfig,
    ringColor?: ColorConfig
}) {
    const [lightBackground, darkBackground] = getColours(props.background, { light: 'blue-800', dark: 'blue-200' })
    const [lightTextColor, darkTextColor] = getColours(props.textColor, { light: 'white', dark: 'black' })
    const [lightDisabledBackground, darkDisabledBackground] = getColours(props.disabledBackground, { light: 'gray-300', dark: 'gray-600'})
    const [lightHoverBackground, darkHoverBackground] = getColours(props.hoverBackground, { light: 'blue-900', dark: 'blue-300' })
    const [lightRingColor, darkRingColor] = getColours(props.ringColor, { light: 'blue-200', dark: 'blue-600' })


    return (
        <input type="submit" value={props.label} tabIndex={0} className={`mx-auto text-lg font-bold py-2 px-5 rounded-md select-none bg-${lightBackground} dark:bg-${darkBackground} text-${lightTextColor} dark:text-${darkTextColor} ring-${lightRingColor} dark:ring-${darkRingColor} ring-0 outline-none focus:ring-4 cursor-pointer disabled:bg-${lightDisabledBackground} dark:disabled:bg-${darkDisabledBackground} disabled:cursor-default hover:bg-${lightHoverBackground} dark:hover:bg-${darkHoverBackground} transition ${props.className ?? ''}`}
            onClick={props.onClick}
            disabled={props.disabled ?? false} />
    )
}


export default Button