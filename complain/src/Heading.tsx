import React from 'react'
import { ColorConfig, getColours } from './colorConfig'


function Heading(props: { 
    children: React.ReactNode,
    className?: string,
    color?: ColorConfig
}) {
    const [lightColor, darkColor] = getColours(props.color, { light: 'gray-700', dark: 'gray-200' })

    return (
        <h1 className={`${props.className ?? ''} text-4xl text-${lightColor} dark:text-${darkColor} font-bold mx-auto`}>{props.children}</h1>
    )
}


export default Heading