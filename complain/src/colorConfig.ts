type ColorConfig = { light: string, dark: string } | string

function getColours(
    config: ColorConfig | null | undefined,
    defaultColors: ColorConfig = { light: 'white', dark: 'black' }
): [string, string] {
    let defLight, defDark
    if (defaultColors && typeof defaultColors === 'string') {
        defLight = defDark = defaultColors
    } else if (defaultColors && typeof defaultColors === 'object') {
        defLight = defaultColors.light
        defDark = defaultColors.dark
    }

    let light = '', dark = ''
    if (typeof config === 'string') {
        light = dark = config
    } else {
        light = config?.light || defLight || ''
        dark = config?.dark || defDark || ''
    }

    return [light, dark]
}


export {
    getColours
}

export type {
    ColorConfig
}