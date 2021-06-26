
import { lightTheme, darkTheme } from '../config/Theme';
import { combineReducers } from '@reduxjs/toolkit';
import { english } from '../config/strings';
import { container } from './store';

const initialState = {
    theme: lightTheme,
    language: english,
    wishlist: []
}

export const action = {
    SWITCH_THEME: "SWITCH_THEME",
    SWITCH_LANGUAGE: "SWITCH_LANGUAGE",
    SET_WISHLIST: "SET_WISHLIST"
}


const themeReducer = (state = initialState, actionType) => {
    switch (actionType.type) {
        case action.SWITCH_THEME:
            return { ...state, theme: actionType.theme }
        case action.SWITCH_LANGUAGE:
            return { ...state, language: actionType.language }
        case action.SET_WISHLIST:
            return {
                ...state,
                wishlist: [...state.wishlist, actionType.wishlist]
            }
        default:
            return state;
    }
}

export default combineReducers({
    theme: themeReducer
});
