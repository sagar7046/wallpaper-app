import { action } from '../redux/themeReducer';

export const switchTheme = (theme) => {
    return {
        type: action.SWITCH_THEME,
        theme: theme
    }
}

export const switchLanguage = (lang) => {
    return {
        type: action.SWITCH_LANGUAGE,
        language: lang
    }
}

export const setWishlist = (wishlist) => {
    return {
        type: action.SET_WISHLIST,
        wishlist: wishlist
    }
}